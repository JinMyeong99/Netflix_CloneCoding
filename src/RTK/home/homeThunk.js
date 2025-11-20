import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiKey, BaseUrl } from "../../api/tmdb";

export const fetchHomeData = createAsyncThunk(
  "movies/fetchHomeData",
  async () => {
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
  }
);

