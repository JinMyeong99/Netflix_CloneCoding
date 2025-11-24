import { createSlice } from "@reduxjs/toolkit";
import { fetchTrendingPage } from "./trendingThunk";

export const trendingSlice = createSlice({
  name: "trending",
  initialState: {
    list: [],
    page: 0,
    hasMore: true,
    loading: false,
    error: null,
  },
  reducers: {
    resetTrending(state) {
      state.list = [];
      state.page = 0;
      state.hasMore = true;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrendingPage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTrendingPage.rejected, (state, action) => {
        state.loading = false;
        if (action.payload === "더 이상 페이지가 없습니다.") return;

        state.error = action.payload || action.error.message;
      })
      .addCase(fetchTrendingPage.fulfilled, (state, action) => {
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
