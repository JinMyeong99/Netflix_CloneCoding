import { useRef, useState } from "react";

export default function useHoverActive() {
  const [hoverContentId, sethoverContentId] = useState(null);
  const timerRef = useRef(null);

  const handleMouseEnter = (contentId) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      sethoverContentId(contentId);
    }, 400);
  };

  const handleMouseLeave = (contentId) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    sethoverContentId((hoverContentId) =>
      hoverContentId === contentId ? null : hoverContentId
    );
  };

  return {
    hoverContentId,
    handleMouseEnter,
    handleMouseLeave,
  };
}
