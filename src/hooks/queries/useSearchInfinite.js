import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { ApiKey, BaseUrl } from "../../api/tmdb";

async function fetchSearchPage({ query, pageParam }) {
  const searchValue = query.trim();

  const searchUrl = `${BaseUrl}/search/multi?api_key=${ApiKey}&language=ko-KR&include_adult=false&query=${encodeURIComponent(searchValue)}&page=${pageParam}`;

  try {
    const { data } = await axios.get(searchUrl);

    const contents = (data?.results ?? []).filter(
      (content) =>
        content.media_type === "movie" || content.media_type === "tv"
    );

    return {
      contents,
      totalPages: data?.total_pages ?? 0,
      nextPage: pageParam + 1,
    };
  } catch (error) {
    const message =
      error?.response?.statusText ||
      error?.message ||
      "검색 결과 로딩 실패";
    throw new Error(message);
  }
}

export default function useSearchInfinite(query) {
  return useInfiniteQuery({
    queryKey: ["search", query],
    queryFn: ({ pageParam = 1 }) =>
      fetchSearchPage({ query, pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (!lastPage || !lastPage.totalPages) return undefined;
      return lastPage.nextPage <= lastPage.totalPages
        ? lastPage.nextPage
        : undefined;
    },
    enabled: Boolean(query?.trim()),
    staleTime: 1000 * 60 * 2,
  });
}
