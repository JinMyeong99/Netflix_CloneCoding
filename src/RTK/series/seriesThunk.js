import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiKey, BaseUrl } from "../../api/tmdb";

export const fetchSeriesPage = createAsyncThunk(
  "series/fetchSeriesPage",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { page, hasMore, loading } = getState().series;

      if (!hasMore) {
        return rejectWithValue("더 이상 가져올 페이지가 없습니다");
      }
      if (loading) {
        return rejectWithValue("로딩 중...");
      }

      const nextPage = page + 1;

      const seriesUrl = `${BaseUrl}/tv/popular?api_key=${ApiKey}&language=ko-KR&page=${nextPage}`;
      const seriesRes = await fetch(seriesUrl);
      if (!seriesRes.ok) throw new Error("시리즈 로딩 실패");
      const seriesData = await seriesRes.json();
      return {
        page: nextPage,
        results: seriesData.results || [],
        totalPages: seriesData.total_pages || nextPage,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
