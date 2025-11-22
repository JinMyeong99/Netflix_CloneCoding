import { useEffect, useRef } from "react";

export default function useInfiniteScroll({ loading, hasMore, onLoadMore }) {
  const loaderRef = useRef(null);

  useEffect(() => {
    if (loading) return;
    if (!hasMore) return;

    const element = loaderRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting) {
          onLoadMore();
        }
      },
      {
        root: null,
        rootMargin: "200px",
        threshold: 0,
      }
    );

    observer.observe(element);

    return (
      () => {
        if (element) observer.unobserve(element);
        observer.disconnect();
      },
      [loading, hasMore, onLoadMore]
    );
  });
  return loaderRef;
}
