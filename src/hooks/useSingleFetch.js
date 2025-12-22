import { useCallback, useRef } from "react";

export default function useSingleFetch() {
  const lockedRef = useRef(false);

  return useCallback(async (fetchData) => {
    if (lockedRef.current) return;
    lockedRef.current = true;

    try {
      await fetchData();
    } finally {
      lockedRef.current = false;
    }
  }, []);
}
