import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiKey, BaseUrl } from "../../api/tmdb";

export const fetchSeries = createAsyncThunk(
  "series/fetchSeries",
  async () => {
    const seriesUrl = `${BaseUrl}/tv/popular?api_key=${ApiKey}&language=ko-KR&page=1`;

    const seriesRes = await fetch(seriesUrl);
    const seriesData = await seriesRes.json();
    return seriesData.results;
  }
);
