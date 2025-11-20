import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiKey, BaseUrl } from "../../api/tmdb";

export const fetchPopularMoviesPage = createAsyncThunk(
  "popularmovies/fetchPopularMoviesPage",
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
