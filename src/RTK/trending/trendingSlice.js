import { createSlice } from "@reduxjs/toolkit";
import { fetchTrendingData } from "./trendingThunk";

export const trendingSlice = createSlice({
  name: "trending",
  initialState: {
    today: [],
    week: [],
    rising: [],
    hot: [],
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
        const { today, week, rising, hot } = action.payload;
        state.today = today;
        state.week = week;
        state.rising = rising;
        state.hot = hot;
      });
  },
});
