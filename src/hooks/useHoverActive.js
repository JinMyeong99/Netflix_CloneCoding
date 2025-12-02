import { useRef, useState } from "react";

export default function useHoverActive() {
  const [activeId, setActiveId] = useState(null);
  const timerRef = useRef(null);

  const handleMouseEnter = (id) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      setActiveId(id);
    }, 400);
  };

  const handleMouseLeave = (id) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setActiveId((prev) => (prev === id ? null : prev));
  };

  return {
    activeId,
    handleMouseEnter,
    handleMouseLeave,
  };
}
