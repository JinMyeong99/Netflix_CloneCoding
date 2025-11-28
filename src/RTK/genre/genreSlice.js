import { createSlice } from "@reduxjs/toolkit";
import { fetchGenre } from "./genreThunk";

export const genreSlice = createSlice({
  name: "genre",
  initialState: {
    movieGenres: [],
    seriesGenres: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGenre.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchGenre.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "장르 로딩 실패";
      })
      .addCase(fetchGenre.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.movieGenres = action.payload.movieGenres;
        state.seriesGenres = action.payload.seriesGenres;
      });
  },
});
