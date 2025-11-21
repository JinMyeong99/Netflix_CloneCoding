import { configureStore } from "@reduxjs/toolkit";
import { homeSlice } from "./home/homeSlice";
import { MovieSlice } from "./moviePopular/movieSlice";
import { seriesSlice } from "./series/seriesSlice";

export const store = configureStore({
  reducer: {
    home: homeSlice.reducer,
    movie: MovieSlice.reducer,
    series: seriesSlice.reducer,
  },
});
