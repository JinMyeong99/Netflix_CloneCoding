import { createSlice } from "@reduxjs/toolkit";

const StorageKey = "favoriteList";

function loadInitialFavorite() {
  try {
    const favString = localStorage.getItem(StorageKey);
    if (!favString) return [];
    const favParsed = JSON.parse(favString);
    return Array.isArray(favParsed) ? favParsed : [];
  } catch {
    return [];
  }
}

function saveFavorite(favContent) {
  try {
    localStorage.setItem(StorageKey, JSON.stringify(favContent));
  } catch {
    return;
  }
}

export const favoriteSlice = createSlice({
  name: "favorite",
  initialState: {
    list: loadInitialFavorite(),
  },
  reducers: {
    toggleFavorite: (state, action) => {
      const content = action.payload;
      const index = state.list.findIndex(
        (favContent) => favContent.id === content.id
      );

      if (index >= 0) {
        state.list.splice(index, 1);
      } else {
        state.list.push(content);
      }
      saveFavorite(state.list);
    },
  },
});
