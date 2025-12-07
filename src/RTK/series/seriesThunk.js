import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiKey, BaseUrl } from "../../api/tmdb";
import { attachTrailer } from "../../api/attachTrailer";

export const fetchSeriesPage = createAsyncThunk(
  "series/fetchSeriesPage",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { page, hasMore } = getState().series;

      if (!hasMore) {
        return rejectWithValue("더 이상 가져올 페이지가 없습니다");
      }

      const nextPage = page + 1;

      const params = new URLSearchParams({
        api_key: ApiKey,
        language: "ko-KR",
        include_adult: "false",
        page: String(nextPage),
        with_origin_country: "KR|US|JP|GB",
      }).toString();

      const seriesUrl = `${BaseUrl}/discover/tv?${params}`;

      const res = await fetch(seriesUrl);
      if (!res.ok) throw new Error("시리즈 로딩 실패");

      const data = await res.json();
      const dataResults = data.results || [];
      const results = await attachTrailer(dataResults, "tv");

      return {
        page: nextPage,
        results,
        totalPages: data.total_pages || nextPage,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
