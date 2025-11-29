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

      const params = new URLSearchParams({
        api_key: ApiKey,
        language: "ko-KR",
        page: String(nextPage),
        include_adult: "false",
        with_origin_country: "KR|US|JP|GB",
      });

      const movieUrl = `${BaseUrl}/discover/movie?${params.toString()}`;

      const res = await fetch(movieUrl);
      if (!res.ok) {
        throw new Error("영화 데이터 로딩 실패");
      }
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
