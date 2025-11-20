import { createSlice } from "@reduxjs/toolkit";
import { fetchPopularMoviesPage } from "./popularThunk";

const popularMoviesSlice = createSlice({
  name: "popularMovies",
  initialState: {
    list: [],
    page: 0,
    hasMore: true,
    loading: false,
    error: null,
  },
  reducers: {
    resetPopularMovies(state) {
      state.list = [];
      state.page = 0;
      state.hasMore = true;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPopularMoviesPage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPopularMoviesPage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(fetchPopularMoviesPage.fulfilled, (state, action) => {
        state.loading = false;
        const { page, results, totalPages } = action.payload;
        state.page = page;
        state.list.push(...results);
        if (page >= totalPages || results.length === 0) {
          state.hasMore = false;
        }
      });
  },
});

export const { resetPopularMovies } = popularMoviesSlice.actions;
export default popularMoviesSlice.reducer;
