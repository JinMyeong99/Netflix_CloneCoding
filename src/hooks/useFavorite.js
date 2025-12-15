import { useMemo } from "react";
import useFavoriteStore from "../store/useFavoriteStore";

export default function useFavorite() {
  const favoriteList = useFavoriteStore((state) => state.list);

  const favoriteId = useMemo(() => {
    return new Set(favoriteList.map((content) => content.id));
  }, [favoriteList]);

  return { favoriteList, favoriteId };
}
