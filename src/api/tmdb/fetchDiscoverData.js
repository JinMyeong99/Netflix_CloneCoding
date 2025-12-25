import { fetchJson } from "../fetchJson";
import { ApiKey, BaseUrl } from "../tmdb";

export async function fetchDiscoverData({ type, pageParam, genreId }) {
  const params = new URLSearchParams({
    api_key: ApiKey,
    language: "ko-KR",
    include_adult: "false",
    with_origin_country: "KR|US|JP|GB",
    page: String(pageParam),
  });

  if (genreId) {
    params.set("with_genres", String(genreId));
  }

  const url = `${BaseUrl}/discover/${type}?${params.toString()}`;

  try {
    const data = await fetchJson(url, "콘텐츠 로딩 실패");
    const results = data?.results ?? [];

    const totalPages = data?.total_pages ?? 0;

    return {
      contents: results,
      totalPages,
      nextPage: pageParam + 1,
    };
  } catch (error) {
    const message =
      (error instanceof Error && error.message) || "콘텐츠 로딩 실패";
    throw new Error(message);
  }
}
