import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiKey, BaseUrl } from "../api/tmdb";

export const fetchMovieData = createAsyncThunk(
  "movies/fetchMovieData",
  async () => {
    const popularUrl = `${BaseUrl}/movie/popular?api_key=${ApiKey}&language=ko-KR&page=1`;
    const topRatedUrl = `${BaseUrl}/movie/top_rated?api_key=${ApiKey}&language=ko-KR&page=1`;
    const upcomingUrl = `${BaseUrl}/movie/upcoming?api_key=${ApiKey}&language=ko-KR&page=1`;
    const trendingUrl = `${BaseUrl}/movie/trending?api_key=${ApiKey}&language=ko-KR`;

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
      popularData: popularData.results,
      topRatedData: topRatedData.results,
      upcomingData: upcomingData.results,
      trendingData: trendingData.results,
    };
  }
);
