import { useMemo } from "react";
import ContentCard from "./ContentCard";
import useGridHoverAlign from "../hooks/useGridHoverAlign";
import useInfiniteScroll from "../hooks/useInfiniteScroll";

export default function ContentGrid({
  contents,
  openDetail,
  toggleFavorite,
  openTrailer,
  keyExtractor,
  loading,
  hasMore,
  onLoadMore,
}) {
  const contentCount = Array.isArray(contents) ? contents.length : 0;
  const getHoverAlign = useGridHoverAlign(contentCount);

  const cardSlots = useMemo(() => {
    if (!contents || contents.length === 0) return [];

    const getKey =
      keyExtractor ||
      ((content) => {
        if (content?.media_type) return `${content.media_type}-${content.id}`;
        return String(content.id);
      });

    return contents.map((content, index) => {
      const contentKey = getKey(content);
      return {
        contentKey,
        content,
        hoverAlign: getHoverAlign(index),
      };
    });
  }, [contents, getHoverAlign, keyExtractor]);

  const loaderRef = useInfiniteScroll({
    loading,
    hasMore,
    onLoadMore,
  });

  if (contentCount === 0) return null;

  return (
    <div className="flex flex-wrap gap-y-20">
      {cardSlots.map(({ contentKey, content, hoverAlign }) => (
        <div
          key={contentKey}
          className="w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6 flex justify-center px-1"
        >
          <ContentCard
            content={content}
            openDetail={openDetail}
            toggleFavorite={toggleFavorite}
            openTrailer={openTrailer}
            hoverAlign={hoverAlign}
          />
        </div>
      ))}
      {hasMore ? (
        <div ref={loaderRef} style={{ height: 1, width: "100%" }} />
      ) : null}
    </div>
  );
}
