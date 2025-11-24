import { configureStore } from "@reduxjs/toolkit";
import { homeSlice } from "./home/homeSlice";
import { MovieSlice } from "./movie/movieSlice";
import { seriesSlice } from "./series/seriesSlice";
import { trendingSlice } from "./trending/trendingSlice";

export const store = configureStore({
  reducer: {
    home: homeSlice.reducer,
    movie: MovieSlice.reducer,
    series: seriesSlice.reducer,
    trending: trendingSlice.reducer,
  },
});
