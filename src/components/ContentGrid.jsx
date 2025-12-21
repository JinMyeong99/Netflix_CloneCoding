import { useMemo } from "react";
import ContentCard from "./ContentCard";
import useHoverActive from "../hooks/useHoverActive";
import useGridHoverAlign from "../hooks/useGridHoverAlign";
import useInfiniteScroll from "../hooks/useInfiniteScroll";

export default function ContentGrid({
  items,
  favoriteSet,
  openDetail,
  toggleFavorite,
  openTrailer,
  keyExtractor,
  loading,
  hasMore,
  onLoadMore,
}) {
  const itemCount = Array.isArray(items) ? items.length : 0;
  const { hoverContentId, handleMouseEnter, handleMouseLeave } =
    useHoverActive();
  const getHoverAlign = useGridHoverAlign(itemCount);

  const cardSlots = useMemo(() => {
    if (!items || items.length === 0) return [];

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
  }, [
    items,
    favoriteSet,
    getHoverAlign,
    handleMouseEnter,
    handleMouseLeave,
    keyExtractor,
  ]);

  const loaderRef = useInfiniteScroll({
    loading,
    hasMore,
    onLoadMore,
  });

  if (itemCount === 0) return null;

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
              openTrailer={openTrailer}
              hoverAlign={hoverAlign}
            />
          </div>
        )
      )}
      {hasMore ? (
        <div ref={loaderRef} style={{ height: 1, width: "100%" }} />
      ) : null}
    </div>
  );
}
