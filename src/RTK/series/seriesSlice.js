import { createSlice } from "@reduxjs/toolkit";
import { fetchSeriesPage } from "./seriesThunk";

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
      .addCase(fetchSeriesPage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSeriesPage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchSeriesPage.fulfilled, (state, action) => {
        state.loading = false;
        state.popular = action.payload;
      });
  },
});
