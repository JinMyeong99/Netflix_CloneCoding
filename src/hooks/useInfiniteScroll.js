import { useEffect, useRef } from "react";

export default function useInfiniteScroll({
  loading,
  hasMore,
  onLoadMore,
  root = null,
}) {
  const loaderRef = useRef(null);

  useEffect(() => {
    if (loading) return;
    if (!hasMore) return;
    if (!onLoadMore) return;

    const loaderElement = loaderRef.current;
    if (!loaderElement) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const loaderEntry = entries[0];
        if (loaderEntry.isIntersecting) onLoadMore();
      },
      {
        root: root && "current" in root ? root.current : root,
        rootMargin: "200px",
        threshold: 0,
      }
    );

    observer.observe(loaderElement);

    return () => {
      if (loaderElement) observer.unobserve(loaderElement);
      observer.disconnect();
    };
  }, [loading, hasMore, onLoadMore, root]);
  return loaderRef;
}
