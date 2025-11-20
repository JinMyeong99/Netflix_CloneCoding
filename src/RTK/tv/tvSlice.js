import { createSlice } from "@reduxjs/toolkit";
import { fetchPopularTv } from "./tvThunk";

export const tvSlice = createSlice({
  name: "tv",
  initialState: {
    popular: [],
    loading: true,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPopularTv.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPopularTv.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchPopularTv.fulfilled, (state, action) => {
        state.loading = false;
        state.popular = action.payload;
      });
  },
});
