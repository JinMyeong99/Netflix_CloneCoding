import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiKey, BaseUrl } from "../../api/tmdb";

export const fetchTrendingPage = createAsyncThunk(
  "trending/fetchTrendingPage",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { page, hasMore } = getState().trending;

      if (!hasMore) {
        return rejectWithValue("더 이상 페이지가 없습니다.");
      }

      const nextPage = page + 1;

      const trendUrl = `${BaseUrl}/trending/all/week?api_key=${ApiKey}&language=ko-KR&page=${nextPage}`;
      const res = await fetch(trendUrl);
      if (!res.ok) throw new Error("트렌드 로딩 실패");
      const trendData = await res.json();

      const filteredData = (trendData.results || []).filter(
        (data) => data.media_type === "movie" || data.media_type === "tv"
      );

      return {
        page: nextPage,
        results: filteredData,
        totalPages: trendData.total_Pages || nextPage,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
