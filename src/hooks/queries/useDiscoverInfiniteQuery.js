import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchDiscoverData } from "../../api/tmdb/fetchDiscoverData";

export default function useDiscoverInfiniteQuery({ type, genreId }) {
  return useInfiniteQuery({
    queryKey: ["discover", type, genreId || "all"],
    queryFn: ({ pageParam = 1 }) =>
      fetchDiscoverData({ type, pageParam, genreId }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (!lastPage || !lastPage.totalPages) return undefined;
      return lastPage.nextPage <= lastPage.totalPages
        ? lastPage.nextPage
        : undefined;
    },
    staleTime: 1000 * 60 * 3,
  });
}
