import axios from "axios";
import { create } from "zustand";
import { ApiKey, BaseUrl } from "../api/tmdb";
import { attachTrailer } from "../api/attachTrailer";

const useMovieStore = create((set, get) => ({
  list: [],
  page: 0,
  hasMore: true,
  loading: false,
  error: null,

  fetchMoviePage: async () => {
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
        page: String(nextPage),
        include_adult: "false",
        with_origin_country: "KR|US|JP|GB",
      });

      const movieUrl = `${BaseUrl}/discover/movie?${params.toString()}`;
      const { data: movieData } = await axios.get(movieUrl);

      const dataResults = movieData.results || [];

      const results = await attachTrailer(dataResults, "movie");

      const uniqueItemsMap = new Map();
      list.forEach((item) => uniqueItemsMap.set(item.id, item));
      results.forEach((item) => uniqueItemsMap.set(item.id, item));
      const deDuplicatedList = Array.from(uniqueItemsMap.values());

      set(() => ({
        list: deDuplicatedList,
        page: nextPage,
        hasMore: nextPage < movieData.total_pages,
        loading: false,
      }));
    } catch (error) {
      const message =
        error?.response?.statusText || error?.message || "영화 데이터 로딩 실패";
      set({ error: message, loading: false });
    }
  },

  resetMovie: () => {
    set({
      list: [],
      page: 0,
      hasMore: true,
      loading: false,
      error: null,
    });
  },
}));

export default useMovieStore;
