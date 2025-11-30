import { createSlice } from "@reduxjs/toolkit";

export const favoriteSlice = createSlice({
  name: "favorite",
  initialState: [],
  reducers: {
    toggleFavorite(state, action) {
      const content = action.payload;
      const index = state.findIndex((favcontent) => favcontent.id === content.id);
      index !== -1 ? state.splice(index, 1) : state.push(content);
    },
  },
});
