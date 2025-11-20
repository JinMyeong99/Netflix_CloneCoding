import { configureStore } from "@reduxjs/toolkit";
import { homeSlice } from "./home/homeSlice";
import { popularMoviesSlice } from "./moviePopular/popularSlice";
import { tvSlice } from "./tv/tvSlice";

export const store = configureStore({
  reducer: {
    home: homeSlice.reducer,
    popularMovies: popularMoviesSlice.reducer,
    tv: tvSlice.reducer,
  },
});
