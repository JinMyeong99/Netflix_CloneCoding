import { createSlice } from "@reduxjs/toolkit";
import { fetchHomeData } from "./thunk";

export const homeSlice = createSlice({
  name: "home",
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
      .addCase(fetchHomeData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHomeData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchHomeData.fulfilled, (state, action) => {
        state.loading = false;
        state.popular = action.payload.popular;
        state.topRated = action.payload.topRated;
        state.upcoming = action.payload.upcoming;
        state.trending = action.payload.trending;
      });
  },
});
