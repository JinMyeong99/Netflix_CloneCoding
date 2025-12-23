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
    const currentRange = getVisibleRange(swiper);
    if (!currentRange) return;

    setVisibleRange((visibleRange) => {
      if (
        visibleRange.start === currentRange.start &&
        visibleRange.end === currentRange.end
      )
        return visibleRange;
      else return currentRange;
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
