import { createSlice } from "@reduxjs/toolkit";

const favoriteSlice = createSlice({
  name: "favorites",
  initialState: [],
  reducers: {
    toggleFavorite(state, action) {
      const item = action.payload;
      const index = state.findIndex((find) => find.id === item.id);
      index !== -1 ? state.splice(index, 1) : state.push(item);
    },
  },
});

export const { toggleFavorite } = favoriteSlice.actions;
export default favoriteSlice.reducer;
