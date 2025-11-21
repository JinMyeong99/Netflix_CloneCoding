import { createSlice } from "@reduxjs/toolkit";
import { fetchSeries } from "./seriesThunk";

export const seriesSlice = createSlice({
  name: "series",
  initialState: {
    popular: [],
    loading: true,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSeries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSeries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchSeries.fulfilled, (state, action) => {
        state.loading = false;
        state.popular = action.payload;
      });
  },
});
