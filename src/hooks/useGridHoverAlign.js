import { useCallback } from "react";
import useResponsiveColumns from "./useResponsiveColumns";

export default function useGridHoverAlign(totalCount) {
  const columns = useResponsiveColumns();

  return useCallback(
    (index) => {
      const total = Number.isFinite(totalCount) ? totalCount : 0;
      const colCount = Math.max(columns || 1, 1);
      if (total === 0) return "center";

      const lastRowCount = total % colCount || colCount;
      const rowStart = Math.floor(index / colCount) * colCount;
      const positionInRow = index - rowStart;
      const isLastRow = index >= total - lastRowCount;

      if (positionInRow === 0) return "left";

      const isRowEnd =
        (!isLastRow && positionInRow === colCount - 1) ||
        (isLastRow && positionInRow === lastRowCount - 1);
      if (isRowEnd) return "right";

      return "center";
    },
    [columns, totalCount]
  );
}
