import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiKey, BaseUrl } from "../../api/tmdb";

export const fetchMoviePage = createAsyncThunk(
  "movie/fetchMoviePage",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const { page, hasMore } = state.movie;

      if (!hasMore) {
        return rejectWithValue("더 이상 가져올 페이지가 없습니다");
      }

      let isLogin;
      let watchingMode;
      let adult;

      if (state.login && state.login.isLogin) {
        isLogin = state.login.isLogin;
      } else {
        isLogin = false;
      }

      if (state.login && state.login.watchingMode) {
        watchingMode = state.login.watchingMode;
      } else {
        watchingMode = "safe";
      }

      if (isLogin && watchingMode === "adult") {
        adult = true;
      } else {
        adult = false;
      }

      const nextPage = page + 1;

      const params = new URLSearchParams({
        api_key: ApiKey,
        language: "ko-KR",
        page: String(nextPage),
        include_adult: adult ? "true" : "false",
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
