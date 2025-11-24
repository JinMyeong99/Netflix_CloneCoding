import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiKey, BaseUrl } from "../../api/tmdb";

export const fetchTrendPage = createAsyncThunk(
  "trend/fetchTrendPage",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { page, hasMore } = getState().trend;

      if (!hasMore) {
        return rejectWithValue("더 이상 페이지가 없습니다.");
      }

      const nextPage = page + 1;

      const trendUrl = `${BaseUrl}/trending/all/week?api_key=${ApiKey}&language=ko-KR&page=${nextPage}`;
      const 
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
