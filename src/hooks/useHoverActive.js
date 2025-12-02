import { useRef, useState } from "react";

export default function useHoverActive() {
  const [hoverContentId, sethoverContentId] = useState(null);
  const timerRef = useRef(null);

  const handleMouseEnter = (id) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      sethoverContentId(id);
    }, 400);
  };

  const handleMouseLeave = (id) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    sethoverContentId((prev) => (prev === id ? null : prev));
  };

  return {
    hoverContentId,
    handleMouseEnter,
    handleMouseLeave,
  };
}
