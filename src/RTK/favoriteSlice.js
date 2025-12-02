import { createSlice } from "@reduxjs/toolkit";

export const favoriteSlice = createSlice({
  name: "favorite",
  initialState: {
    list: [],
  },
  reducers: {
    toggleFavorite: (state, action) => {
      const content = action.payload;
      const index = state.list.findIndex(
        (favcontent) => favcontent.id === content.id
      );
      if (index >= 0) {
        state.list.splice(index, 1);
      } else {
        state.list.push(content);
      }
    },
    clearFavorite: (state) => {
      state.list = [];
    },
  },
});
