import { createSlice } from "@reduxjs/toolkit";
import { fetchTrendPage } from "./trendThunk";

export const trendSlice = createSlice({
  name: "trend",
  initialState: {
    list: [],
    page: 0,
    hasMore: true,
    loading: false,
    error: null,
  },
  reducers: {
    resetTrend(state) {
      state.list = [];
      state.page = 0;
      state.hasMore = true;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrendPage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTrendPage.rejected, (state, action) => {
        state.loading = false;
        if (action.payload === "더 이상 페이지가 없습니다.") return;

        state.error = action.payload || action.error.message;
      })
      .addCase(fetchTrendPage.fulfilled, (state, action) => {
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
