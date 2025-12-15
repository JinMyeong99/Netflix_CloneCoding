import { ApiKey, BaseUrl } from "../api/tmdb";
import { attachTrailer } from "../api/attachTrailer";
import { create } from "zustand";

const useTrendingStore = create((set) => ({
  today: [],
  week: [],
  rising: [],
  hot: [],
  loading: false,
  error: null,

  fetchTrendingData: async () => {
    set({ loading: true, error: null });
    try {
      const common = new URLSearchParams({
        api_key: ApiKey,
        language: "ko-KR",
        include_adult: "false",
      }).toString();

      const discoverCommon = new URLSearchParams({
        api_key: ApiKey,
        language: "ko-KR",
        include_adult: "false",
        with_origin_country: "KR|US|JP|GB",
      }).toString();

      const todayUrl = `${BaseUrl}/trending/movie/day?${common}`;
      const weekUrl = `${BaseUrl}/trending/movie/week?${common}`;
      const risingUrl = `${BaseUrl}/discover/movie?${discoverCommon}&sort_by=popularity.desc&vote_count.gte=200`;
      const hotUrl = `${BaseUrl}/trending/all/day?${common}`;

      const [todayRes, weekRes, risingRes, hotRes] = await Promise.all([
        fetch(todayUrl),
        fetch(weekUrl),
        fetch(risingUrl),
        fetch(hotUrl),
      ]);

      if (!todayRes.ok || !weekRes.ok || !risingRes.ok || !hotRes.ok) {
        throw new Error("트렌드 데이터 로딩 실패");
      }

      const [todayData, weekData, risingData, hotData] = await Promise.all([
        todayRes.json(),
        weekRes.json(),
        risingRes.json(),
        hotRes.json(),
      ]);

      const todayResults = todayData.results || [];
      const weekResults = weekData.results || [];
      const risingResults = risingData.results || [];
      const hotResults = hotData.results || [];

      const today = await attachTrailer(todayResults, "auto");
      const week = await attachTrailer(weekResults, "auto");
      const rising = await attachTrailer(risingResults, "auto");
      const hot = await attachTrailer(hotResults, "auto");

      set({
        today,
        week,
        rising,
        hot,
        loading: false,
      });
    } catch (error) {
      set({
        error: error.message || "트렌드 데이터 로딩 실패",
        loading: false,
      });
    }
  },
}));

export default useTrendingStore;
