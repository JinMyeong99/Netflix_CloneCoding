import { createSlice } from "@reduxjs/toolkit";
import { fetchMovieData } from "./thunk";

const movieSlice = createSlice({
  name: "movies",
  initialState: {
    popular: [],
    topRated: [],
    upcoming: [],
    trending: [],
    loading: true,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovieData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovieData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchMovieData.fulfilled, (state, action) => {
        state.loading = false;
        state.popular = action.payload.popular;
        state.topRated = action.payload.topRated;
        state.upcoming = action.payload.upcoming;
        state.trending = action.payload.trending;
      });
  },
});

export default movieSlice.reducer;
