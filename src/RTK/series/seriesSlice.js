import { createSlice } from "@reduxjs/toolkit";
import { fetchSeriesPage } from "./seriesThunk";

export const seriesSlice = createSlice({
  name: "series",
  initialState: {
    list: [],
    page: 0,
    hasMore: true,
    loading: false,
    error: null,
  },
  reducers: {
    resetSeries(state) {
      state.list = [];
      state.page = 0;
      state.hasMore = true;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSeriesPage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSeriesPage.rejected, (state, action) => {
        state.loading = false;
        const { page, results, totalPages } = action.payload;

        state.page = page;
        state.list.push(...results);

        if (page >= totalPages || results.length === 0) {
          state.hasMore = false;
        }
      })
      .addCase(fetchSeriesPage.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload === "더 이상 가져올 페이지가 없습니다") return;
        state.error = action.payload || action.error.message;
      });
  },
});
