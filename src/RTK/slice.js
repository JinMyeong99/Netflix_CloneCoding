import { createSlice } from "@reduxjs/toolkit";
import { fetchMovieData } from "./thunk";

export const movieSlice = createSlice({
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
        state.popular = action.payload.popularData;
        state.topRated = action.payload.topRatedData;
        state.upcoming = action.payload.upcomingData;
        state.trending = action.payload.trendingData;
      });
  },
});
