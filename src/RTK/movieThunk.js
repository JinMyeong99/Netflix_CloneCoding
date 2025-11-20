import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiKey, BaseUrl } from "../api/tmdb";

export const fetchMovieData = createAsyncThunk(
  "movies/fetchMovieData",
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

export const fetchPopularMoviesPage = createAsyncThunk(
  "movies/fetchPopularMoviesPage",
  async (_, { getState, rejectWithValue }) => {
    const { movies } = getState();
    const { page, morePage } = movies;

    if (!morePage) {
      return rejectWithValue;
    }

    const nextPage = page + 1;

    const pageUrl = `${BaseUrl}/movie/popular?api_key=${ApiKey}&language=ko-KR&page=${nextPage}`;
    const res = await fetch(pageUrl);
    const moreMovies = await res.json();

    return {
      page: nextPage,
      results: moreMovies.results,
      totalPages: moreMovies.total_pages,
    };
  }
);
