import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiKey, BaseUrl } from "../../api/tmdb";
import { attachTrailer } from "../../api/attachTrailer";

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
        (content) =>
          content.media_type === "movie" || content.media_type === "tv"
      );

      const results = await attachTrailer(filteredData, "auto");

      return {
        page: nextPage,
        results,
        totalPages: filteredData.totoal_pages || nextPage,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
