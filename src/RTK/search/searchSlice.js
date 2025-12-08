import { createSlice } from "@reduxjs/toolkit";
import { fetchSearchPage } from "./searchThunk";

export const searchSlice = createSlice({
  name: "search",
  initialState: {
    query: "",
    results: [],
    page: 0,
    hasMore: true,
    loading: false,
    error: null,
  },
  reducers: {
    setQuery(state, action) {
      state.query = action.payload;
    },
    resetSearch(state) {
      state.query = "";
      state.results = [];
      state.page = 0;
      state.hasMore = true;
      state.loading = false;
      state.error = null;
    },
    clearResults(state) {
      state.results = [];
      state.page = 0;
      state.hasMore = true;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchPage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSearchPage.rejected, (state, action) => {
        state.loading = false;
        if (
          action.payload === "더 이상 검색 결과가 존재하지 않습니다." ||
          action.payload === "검색어 없음"
        ) {
          return;
        }
        state.error = action.payload || action.error.message;
      })
      .addCase(fetchSearchPage.fulfilled, (state, action) => {
        state.loading = false;
        const { page, results = [], totalPages } = action.payload;

        const contentKeys = new Set(
          state.results.map(
            (content) => `${content.media_type || "auto"}-${content.id}`
          )
        );
        const filteredResults = results.filter((content) => {
          const key = `${content.media_type || "auto"}-${content.id}`;
          if (contentKeys.has(key)) return false;
          contentKeys.add(key);
          return true;
        });

        state.page = page;
        state.results.push(...filteredResults);

        if (page >= totalPages || results.length === 0) {
          state.hasMore = false;
        }
      });
  },
});
