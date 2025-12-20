import { create } from "zustand";

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

const useFavoriteStore = create((set) => ({
  list: loadInitialFavorite(),
  toggleFavorite: (content) =>
    set((state) => {
      const index = state.list.findIndex(
        (favContent) => favContent.id === content.id
      );
      const favList = [...state.list];
      if (index >= 0) {
        favList.splice(index, 1);
      } else {
        favList.push(content);
      }
      saveFavorite(favList);
      return { list: favList };
    }),
}));

export default useFavoriteStore;
