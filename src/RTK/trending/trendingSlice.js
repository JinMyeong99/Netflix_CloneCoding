import { createSlice } from "@reduxjs/toolkit";
import { fetchTrendingData } from "./trendingThunk";

export const trendingSlice = createSlice({
  name: "trending",
  initialState: {
    today: [],
    week: [],
    rising: [],
    hot: [],
    nowPlaying: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrendingData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTrendingData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(fetchTrendingData.fulfilled, (state, action) => {
        state.loading = false;
        state.today = action.payload.today;
        state.week = action.payload.week;
        state.rising = action.payload.rising;
        state.hot = action.payload.hot;
        state.nowPlaying = action.payload.nowPlaying;
      });
  },
});
