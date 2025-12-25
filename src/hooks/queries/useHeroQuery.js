import { useQuery } from "@tanstack/react-query";
import { fetchJson } from "../../api/fetchJson";
import { ApiKey, BaseUrl } from "../../api/tmdb";

async function fetchHeroContent() {
  const params = new URLSearchParams({
    api_key: ApiKey,
    language: "ko-KR",
    include_adult: "false",
    with_origin_country: "KR|US|JP|GB",
    sort_by: "popularity.desc",
    page: "1",
  }).toString();

  const url = `${BaseUrl}/discover/movie?${params}`;
  const data = await fetchJson(url, "히어로 콘텐츠 로딩 실패");
  const [first] = data?.results ?? [];
  return first || null;
}

export default function useHeroQuery() {
  return useQuery({
    queryKey: ["hero"],
    queryFn: fetchHeroContent,
    staleTime: 1000 * 60 * 5,
  });
}
