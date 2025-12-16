import { create } from "zustand";
import { ApiKey, BaseUrl } from "../api/tmdb";
import { attachTrailer } from "../api/attachTrailer";

const useSeriesStore = create((set, get) => ({
  list: [],
  page: 0,
  hasMore: true,
  loading: false,
  error: null,

  fetchSeriesPage: async () => {
    const { page, hasMore, list } = get();

    if (!hasMore || get().loading) {
      return;
    }

    set({ loading: true, error: null });

    try {
      const nextPage = page + 1;
      const params = new URLSearchParams({
        api_key: ApiKey,
        language: "ko-KR",
        include_adult: "false",
        page: String(nextPage),
        with_origin_country: "KR|US|JP|GB",
      }).toString();

      const seriesUrl = `${BaseUrl}/discover/tv?${params}`;
      const res = await fetch(seriesUrl);
      if (!res.ok) {
        throw new Error("시리즈 로딩 실패");
      }
      const seriesData = await res.json();
      const dataResults = seriesData.results || [];
      const results = await attachTrailer(dataResults, "tv");

      const uniqueItemsMap = new Map();
      list.forEach((item) => uniqueItemsMap.set(item.id, item));
      results.forEach((item) => uniqueItemsMap.set(item.id, item));

      const deDuplicatedList = Array.from(uniqueItemsMap.values());

      set(() => ({
        list: deDuplicatedList,
        page: nextPage,
        hasMore: nextPage < seriesData.total_pages,
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  resetSeries: () => {
    set({
      list: [],
      page: 0,
      hasMore: true,
      loading: false,
      error: null,
    });
  },
}));

export default useSeriesStore;
