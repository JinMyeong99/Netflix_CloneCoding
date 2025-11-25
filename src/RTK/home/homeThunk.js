import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiKey, BaseUrl } from "../../api/tmdb";

export const fetchHomeData = createAsyncThunk(
  "home/fetchHomeData",
  async (_, { rejectWithValue }) => {
    try {
      const popularUrl = `${BaseUrl}/movie/popular?api_key=${ApiKey}&language=ko-KR&page=1`;
      const topRatedUrl = `${BaseUrl}/movie/top_rated?api_key=${ApiKey}&language=ko-KR&page=1`;
      const upcomingUrl = `${BaseUrl}/movie/upcoming?api_key=${ApiKey}&language=ko-KR&page=1`;
      const trendingUrl = `${BaseUrl}/trending/movie/week?api_key=${ApiKey}&language=ko-KR`;

      const [popularRes, topRatedRes, upcomingRes, trendingRes] =
        await Promise.all([
          fetch(popularUrl),
          fetch(topRatedUrl),
          fetch(upcomingUrl),
          fetch(trendingUrl),
        ]);

      if (
        !popularRes.ok ||
        !topRatedRes.ok ||
        !upcomingRes.ok ||
        !trendingRes.ok
      ) {
        throw new Error("홈 데이터 로딩 실패");
      }

      const [popularData, topRatedData, upcomingData, trendingData] =
        await Promise.all([
          popularRes.json(),
          topRatedRes.json(),
          upcomingRes.json(),
          trendingRes.json(),
        ]);

      return {
        popular: popularData.results,
        topRated: topRatedData.results,
        upcoming: upcomingData.results,
        trending: trendingData.results,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
