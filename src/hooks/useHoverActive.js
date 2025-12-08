import { useCallback, useRef, useState } from "react";

export default function useHoverActive() {
  const [hoverContentId, sethoverContentId] = useState(null);
  const timerRef = useRef(null);

  const handleMouseEnter = useCallback((contentId) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      sethoverContentId(contentId);
    }, 400);
  }, []);

  const handleMouseLeave = useCallback((contentId) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    sethoverContentId((hoverContentId) =>
      hoverContentId === contentId ? null : hoverContentId
    );
  }, []);

  return {
    hoverContentId,
    handleMouseEnter,
    handleMouseLeave,
  };
}
