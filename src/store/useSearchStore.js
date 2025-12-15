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
    const { query, page, hasMore, results } = get();

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

      const res = await fetch(searchUrl);
      if (!res.ok) throw new Error("검색 결과 로딩 실패");

      const searchData = await res.json();

      const filteredData = (searchData.results || []).filter(
        (content) =>
          content.media_type === "movie" || content.media_type === "tv"
      );

      const attachedResults = await attachTrailer(filteredData, "auto");

      const contentKeys = new Set(
        results.map(
          (content) => `${content.media_type || "auto"}-${content.id}`
        )
      );
      const filteredNewResults = attachedResults.filter((content) => {
        const key = `${content.media_type || "auto"}-${content.id}`;
        if (contentKeys.has(key)) return false;
        contentKeys.add(key);
        return true;
      });

      set((state) => ({
        results: [...state.results, ...filteredNewResults],
        page: nextPage,
        hasMore: nextPage < searchData.total_pages,
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));

export default useSearchStore;
