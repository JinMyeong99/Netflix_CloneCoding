import { createSlice } from "@reduxjs/toolkit";
import { fetchMoviePage } from "./movieThunk";

export const MovieSlice = createSlice({
  name: "movie",
  initialState: {
    list: [],
    page: 0,
    hasMore: true,
    loading: false,
    error: null,
  },
  reducers: {
    resetMovie(state) {
      state.list = [];
      state.page = 0;
      state.hasMore = true;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMoviePage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMoviePage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(fetchMoviePage.fulfilled, (state, action) => {
        state.loading = false;
        const { page, results, totalPages } = action.payload;

        const movieId = new Set(state.list.map((movie) => movie.id));
        const filtedMovie = results.filter((movie) => !movieId.has(movie.id));

        state.list = [...state.list, ...filtedMovie];

        state.page = page;
        if (page >= totalPages || results.length === 0) {
          state.hasMore = false;
        }
      });
  },
});
