import { createSlice } from "@reduxjs/toolkit";

export const favoriteSlice = createSlice({
  name: "favorite",
  initialState: [],
  reducers: {
    toggleFavorite(state, action) {
      const movie = action.payload;
      const index = state.findIndex((favMovie) => favMovie.id === movie.id);
      index !== -1 ? state.splice(index, 1) : state.push(movie);
    },
  },
});
