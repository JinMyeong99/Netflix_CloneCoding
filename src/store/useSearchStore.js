import axios from "axios";
import { create } from "zustand";
import { ApiKey, BaseUrl } from "../api/tmdb";
import { attachTrailer } from "../api/attachTrailer";

const useSearchStore = create((set, get) => ({
  query: "",
  results: [],
  page: 0,
  hasMore: true,
  loading: false,
  error: null,

  setQuery: (newQuery) => set({ query: newQuery }),
  resetSearch: () =>
    set({
      query: "",
      results: [],
      page: 0,
      hasMore: true,
      loading: false,
      error: null,
    }),
  clearResults: () => set({ results: [], page: 0, hasMore: true, error: null }),

  fetchSearchPage: async () => {
    const { query, page, hasMore } = get();

    const searchValue = query.trim();
    if (!searchValue) {
      set({ error: "검색어 없음", loading: false });
      return;
    }
    if (!hasMore || get().loading) {
      return;
    }

    set({ loading: true, error: null });

    try {
      const nextPage = page + 1;

      const searchUrl = `${BaseUrl}/search/multi?api_key=${ApiKey}&language=ko-KR&include_adult=false&query=${encodeURIComponent(searchValue)}&page=${nextPage}`;

      const { data: searchData } = await axios.get(searchUrl);

      const filteredData = (searchData.results || []).filter(
        (content) =>
          content.media_type === "movie" || content.media_type === "tv"
      );

      const attachedResults = await attachTrailer(filteredData, "auto");

      set((state) => {
        // ignore stale responses when the query changed mid-flight
        if (state.query.trim() !== searchValue) return state;

        const contentKeys = new Set(
          state.results.map(
            (content) => `${content.media_type || "auto"}-${content.id}`
          )
        );

        const filteredNewResults = attachedResults.filter((content) => {
          const key = `${content.media_type || "auto"}-${content.id}`;
          if (contentKeys.has(key)) return false;
          contentKeys.add(key);
          return true;
        });

        return {
          ...state,
          results: [...state.results, ...filteredNewResults],
          page: nextPage,
          hasMore: nextPage < searchData.total_pages,
          loading: false,
        };
      });
    } catch (error) {
      const message =
        error?.response?.statusText || error?.message || "검색 결과 로딩 실패";
      set((state) => {
        if (state.query.trim() !== searchValue) return state;
        return { ...state, error: message, loading: false };
      });
    }
  },
}));

export default useSearchStore;
