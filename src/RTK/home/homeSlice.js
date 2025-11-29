import { createSlice } from "@reduxjs/toolkit";
import { fetchHomeData } from "./homeThunk";

export const homeSlice = createSlice({
  name: "home",
  initialState: {
    popular: [],
    topRated: [],
    actionAdventure: [],
    comedyMovies: [],
    sciFiFantasy: [],
    comedySeries: [],
    loading: false,
    error: null,
  },
  reducers: {
    resetHome(state) {
      state.popular = [];
      state.topRated = [];
      state.actionAdventure = [];
      state.comedyMovies = [];
      state.sciFiFantasy = [];
      state.comedySeries = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHomeData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHomeData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(fetchHomeData.fulfilled, (state, action) => {
        state.loading = false;
        state.popular = action.payload.popular;
        state.topRated = action.payload.topRated;
        state.actionAdventure = action.payload.actionAdventure;
        state.comedyMovies = action.payload.comedyMovies;
        state.sciFiFantasy = action.payload.sciFiFantasy;
        state.comedySeries = action.payload.comedySeries;
      });
  },
});
