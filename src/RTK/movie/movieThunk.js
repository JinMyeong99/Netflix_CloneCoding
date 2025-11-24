import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiKey, BaseUrl } from "../../api/tmdb";

export const fetchMoviePage = createAsyncThunk(
  "movie/fetchMoviePage",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { page, hasMore } = getState().movie;

      if (!hasMore) {
        return rejectWithValue("더 이상 가져올 페이지가 없습니다");
      }

      const nextPage = page + 1;

      const movieUrl = `${BaseUrl}/movie/popular?api_key=${ApiKey}&language=ko-KR&page=${nextPage}`;
      const res = await fetch(movieUrl);
      const movieData = await res.json();

      return {
        page: nextPage,
        results: movieData.results || [],
        totalPages: movieData.total_pages || nextPage,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
