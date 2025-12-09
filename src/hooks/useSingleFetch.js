import { useCallback, useEffect, useRef } from "react";

export default function useSingleFetch(isLoading) {
  const isFetchingRef = useRef(false);

  useEffect(() => {
    if (!isLoading) {
      isFetchingRef.current = false;
    }
  }, [isLoading]);

  return useCallback((fetchData) => {
    if (isFetchingRef.current) return;
    isFetchingRef.current = true;
    fetchData();
  }, []);
}
