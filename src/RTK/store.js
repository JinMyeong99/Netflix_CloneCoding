import { configureStore } from "@reduxjs/toolkit";
import { homeSlice } from "./home/homeSlice";
import { MovieSlice } from "./movie/movieSlice";
import { seriesSlice } from "./series/seriesSlice";
import { trendingSlice } from "./trending/trendingSlice";
import { searchSlice } from "./search/searchSlice";
import { loginSlice } from "./loginSlice";
import { genreSlice } from "./genre/genreSlice";

export const store = configureStore({
  reducer: {
    home: homeSlice.reducer,
    movie: MovieSlice.reducer,
    series: seriesSlice.reducer,
    trending: trendingSlice.reducer,
    search: searchSlice.reducer,
    login: loginSlice.reducer,
    genre: genreSlice.reducer,
  },
});
