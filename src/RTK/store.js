import { configureStore } from "@reduxjs/toolkit";
import { homeSlice } from "./home/homeSlice";
import { MovieSlice } from "./moviePopular/movieSlice";
import { tvSlice } from "./tv/tvSlice";

export const store = configureStore({
  reducer: {
    home: homeSlice.reducer,
    movie: MovieSlice.reducer,
    tv: tvSlice.reducer,
  },
});
