import { useCallback, useRef, useState } from "react";

function getVisibleRange(swiper) {
  const visible = swiper?.visibleSlidesIndexes;
  if (Array.isArray(visible) && visible.length > 0) {
    return { start: visible[0], end: visible[visible.length - 1] };
  }
  return null;
}

export default function useSwiperRange(initial = { start: 0, end: 5 }) {
  const swiperRef = useRef(null);
  const [visibleRange, setVisibleRange] = useState(initial);

  const updateVisibleRange = useCallback((swiper) => {
    const next = getVisibleRange(swiper);
    if (!next) return;

    setVisibleRange((prev) => {
      if (prev.start === next.start && prev.end === next.end) return prev;
      return next;
    });
  }, []);

  const handleSwiperInit = useCallback(
    (swiper) => {
      swiperRef.current = swiper;
      updateVisibleRange(swiper);
    },
    [updateVisibleRange]
  );

  return { swiperRef, visibleRange, updateVisibleRange, handleSwiperInit };
}
