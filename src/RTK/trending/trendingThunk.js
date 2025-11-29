import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiKey, BaseUrl } from "../../api/tmdb";

export const fetchTrendingData = createAsyncThunk(
  "trending/fetchTrendingData",
  async (_, { rejectWithValue }) => {
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

      return {
        today: todayData.results || [],
        week: weekData.results || [],
        rising: risingData.results || [],
        hot: hotData.results || [],
      };
    } catch (error) {
      return rejectWithValue(error.message || "트렌드 데이터 로딩 실패");
    }
  }
);
