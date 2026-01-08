import { memo, useEffect, useMemo, useRef, useState } from "react";
import ContentCard from "./ContentCard";
import useGridHoverAlign from "../hooks/useGridHoverAlign";
import useInfiniteScroll from "../hooks/useInfiniteScroll";

function VirtualCard({
  content,
  hoverAlign,
  openDetail,
  toggleFavorite,
  openTrailer,
}) {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { root: null, rootMargin: "400px 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6 flex justify-center px-1"
    >
      {isVisible ? (
        <ContentCard
          content={content}
          openDetail={openDetail}
          toggleFavorite={toggleFavorite}
          openTrailer={openTrailer}
          hoverAlign={hoverAlign}
        />
      ) : (
        <div className="w-full max-w-65">
          <div className="w-full aspect-2/3 rounded-md bg-neutral-800 animate-pulse" />
        </div>
      )}
    </div>
  );
}

const MemoVirtualCard = memo(VirtualCard);

function ContentGrid({
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
        <MemoVirtualCard
          key={contentKey}
          content={content}
          hoverAlign={hoverAlign}
          openDetail={openDetail}
          toggleFavorite={toggleFavorite}
          openTrailer={openTrailer}
        />
      ))}
      {hasMore ? (
        <div ref={loaderRef} style={{ height: 1, width: "100%" }} />
      ) : null}
    </div>
  );
}

export default memo(ContentGrid);
