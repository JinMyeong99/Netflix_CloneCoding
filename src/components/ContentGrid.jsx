import { useMemo } from "react";
import ContentCard from "./ContentCard";
import useHoverActive from "../hooks/useHoverActive";
import useGridHoverAlign from "../hooks/useGridHoverAlign";

export default function ContentGrid({
  items,
  favoriteSet,
  openDetail,
  toggleFavorite,
  onPlayTrailer,
  keyExtractor,
}) {
  const { hoverContentId, handleMouseEnter, handleMouseLeave } =
    useHoverActive();
  const getHoverAlign = useGridHoverAlign(items.length);

  const cardSlots = useMemo(() => {
    const extractKey =
      keyExtractor ||
      ((item, index) => {
        if (item && (item.id || item.id === 0)) return item.id;
        return index;
      });

    return items.map((item, index) => {
      const id = extractKey(item, index);
      return {
        id,
        item,
        hoverAlign: getHoverAlign(index),
        isFavorite: favoriteSet ? favoriteSet.has(id) : false,
        onEnter: () => handleMouseEnter(id),
        onLeave: () => handleMouseLeave(id),
      };
    });
  }, [items, favoriteSet, getHoverAlign, handleMouseEnter, handleMouseLeave, keyExtractor]);

  if (!items || items.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-y-20">
      {cardSlots.map(
        ({ id, item, hoverAlign, isFavorite, onEnter, onLeave }) => (
          <div
            key={id}
            className="w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6 flex justify-center px-1"
            onMouseEnter={onEnter}
            onMouseLeave={onLeave}
          >
            <ContentCard
              content={item}
              isFavorite={isFavorite}
              openHover={hoverContentId === id}
              openDetail={openDetail}
              toggleFavorite={toggleFavorite}
              onPlayTrailer={onPlayTrailer}
              hoverAlign={hoverAlign}
            />
          </div>
        )
      )}
    </div>
  );
}
