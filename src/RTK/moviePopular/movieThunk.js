import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiKey, BaseUrl } from "../../api/tmdb";

export const fetchMoviePage = createAsyncThunk(
  "popularmovies/fetchMoviePage",
  async (_, { getState, rejectWithValue }) => {
    const { movie } = getState();
    const { page, morePage } = movie;

    if (!morePage) {
      return rejectWithValue;
    }

    const nextPage = page + 1;

    const pageUrl = `${BaseUrl}/movie/popular?api_key=${ApiKey}&language=ko-KR&page=${nextPage}`;
    const res = await fetch(pageUrl);
    const moreMovie = await res.json();

    return {
      page: nextPage,
      results: moreMovie.results,
      totalPages: moreMovie.total_pages,
    };
  }
);
