import { useEffect, useState } from "react";

const getColumnsFromWidth = (width) => {
  if (width >= 1280) return 6;
  if (width >= 1024) return 5;
  if (width >= 640) return 4;
  return 3;
};

export default function useResponsiveColumns() {
  const [columns, setColumns] = useState(() => {
    if (typeof window === "undefined") return 3;
    return getColumnsFromWidth(window.innerWidth);
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleResize = () => {
      setColumns(getColumnsFromWidth(window.innerWidth));
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return columns;
}
