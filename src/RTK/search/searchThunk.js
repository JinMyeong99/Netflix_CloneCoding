import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiKey, BaseUrl } from "../../api/tmdb";

export const fetchSearchPage = createAsyncThunk(
  "search/fetchSearchPage",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { query, page, hasMore } = getState().search;

      const searchValue = query.trim();
      if (!searchValue) {
        return rejectWithValue("검색어 없음");
      }
      if (!hasMore) {
        return rejectWithValue("더 이상 검색 결과가 존재하지 않습니다.");
      }

      const nextPage = page + 1;

      const searchUrl = `${BaseUrl}/search/multi?api_key=${ApiKey}&language=ko-KR&include_adult=false&query=${encodeURIComponent(searchValue)}&page=${nextPage}`;

      const res = await fetch(searchUrl);
      if (!res.ok) throw new Error("검색 결과 로딩 실패");

      const searchData = await res.json();

      const filteredData = (searchData.results || []).filter(
        (item) => item.media_type === "movie" || item.media_type === "tv"
      );

      return {
        page: nextPage,
        results: filteredData,
        totalPages: filteredData.totoal_pages || nextPage,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
