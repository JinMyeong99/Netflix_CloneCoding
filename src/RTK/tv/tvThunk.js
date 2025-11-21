import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiKey, BaseUrl } from "../../api/tmdb";

export const fetchSeries = createAsyncThunk(
  "tv/fetchPopularTv",
  async () => {
    const tvUrl = `${BaseUrl}/tv/popular?api_key=${ApiKey}&language=ko-KR&page=1`;

    const tvRes = await fetch(tvUrl);
    const tvData = await tvRes.json();
    return tvData.results;
  }
);
