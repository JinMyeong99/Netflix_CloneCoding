import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiKey, BaseUrl } from "../../api/tmdb";

export const fetchGenre = createAsyncThunk(
  "genre/fetchGenre",
  async (_, { rejectWithValue }) => {
    try {
      const movieGenreUrl = `${BaseUrl}/genre/movie/list?api_key=${ApiKey}&language=ko-KR`;
      const seriesGenreUrl = `${BaseUrl}/genre/tv/list?api_key=${ApiKey}&language=ko-KR`;

      const [movieGenreRes, seriesGenreRes] = await Promise.all([
        fetch(movieGenreUrl),
        fetch(seriesGenreUrl),
      ]);
      if (!movieGenreRes.ok) throw new Error("영화 장르 로딩 실패");
      if (!seriesGenreRes.ok) throw new Error("시리즈 장르 로딩 실패");

      const movieGenreData = await movieGenreRes.json();
      const seriesGenreData = await seriesGenreRes.json();

      return {
        movieGenres: movieGenreData.genres || [],
        seriesGenres: seriesGenreData.genres || [],
      };
    } catch (error) {
      return rejectWithValue(error.message || "장르 로딩 오류");
    }
  }
);
