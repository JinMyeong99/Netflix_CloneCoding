import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiKey, BaseUrl } from "../../api/tmdb";

export const fetchMoviePage = createAsyncThunk(
  "movie/fetchMoviePage",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { movieState } = getState().movie;
      const { page, hasMore, loading } = movieState;

      if (!hasMore) {
        return rejectWithValue("가져올 페이지가 없습니다");
      }
      if (loading) {
        return rejectWithValue("이미 로딩 중...");
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
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
