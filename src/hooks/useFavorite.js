import { useMemo } from "react";
import { useSelector } from "react-redux";

export default function useFavorite() {
  const favoriteList = useSelector((state) => state.favorite.list);

  const favoriteId = useMemo(() => {
    return new Set(favoriteList.map((content) => content.id));
  }, [favoriteList]);

  return { favoriteList, favoriteId };
}
