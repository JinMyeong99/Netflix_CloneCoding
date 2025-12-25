import { fetchJson } from "../fetchJson";
import { ApiKey, BaseUrl } from "../tmdb";

export async function fetchSearchData({ query, pageParam }) {
  const searchValue = query.trim();

  const searchUrl = `${BaseUrl}/search/multi?api_key=${ApiKey}&language=ko-KR&include_adult=false&query=${encodeURIComponent(searchValue)}&page=${pageParam}`;

  try {
    const data = await fetchJson(searchUrl, "검색 결과 로딩 실패");

    const contents = (data?.results ?? []).filter(
      (content) => content.media_type === "movie" || content.media_type === "tv"
    );

    return {
      contents,
      totalPages: data?.total_pages ?? 0,
      nextPage: pageParam + 1,
    };
  } catch (error) {
    const message =
      (error instanceof Error && error.message) || "검색 결과 로딩 실패";
    throw new Error(message);
  }
}
