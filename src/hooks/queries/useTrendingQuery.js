import { useQuery } from "@tanstack/react-query";
import { fetchJson } from "../../api/fetchJson";
import { ApiKey, BaseUrl } from "../../api/tmdb";

async function fetchTrendingData() {
  const common = new URLSearchParams({
    api_key: ApiKey,
    language: "ko-KR",
    include_adult: "false",
  }).toString();

  const discoverCommon = new URLSearchParams({
    api_key: ApiKey,
    language: "ko-KR",
    include_adult: "false",
    with_origin_country: "KR|US|JP|GB",
  }).toString();

  const todayUrl = `${BaseUrl}/trending/movie/day?${common}`;
  const weekUrl = `${BaseUrl}/trending/movie/week?${common}`;
  const risingUrl = `${BaseUrl}/discover/movie?${discoverCommon}&sort_by=popularity.desc&vote_count.gte=200`;
  const hotUrl = `${BaseUrl}/trending/all/day?${common}`;

  try {
    const [todayData, weekData, risingData, hotData] = await Promise.all([
      fetchJson(todayUrl, "트렌드 데이터 로딩 실패"),
      fetchJson(weekUrl, "트렌드 데이터 로딩 실패"),
      fetchJson(risingUrl, "트렌드 데이터 로딩 실패"),
      fetchJson(hotUrl, "트렌드 데이터 로딩 실패"),
    ]);

    const todayResults = todayData?.results ?? [];
    const weekResults = weekData?.results ?? [];
    const risingResults = risingData?.results ?? [];
    const hotResults = hotData?.results ?? [];

    return {
      today: todayResults,
      week: weekResults,
      rising: risingResults,
      hot: hotResults,
    };
  } catch (error) {
    const message =
      (error instanceof Error && error.message) ||
      "트렌드 데이터 로딩 실패";
    throw new Error(message);
  }
}

export default function useTrendingQuery() {
  return useQuery({
    queryKey: ["trending"],
    queryFn: fetchTrendingData,
    staleTime: 1000 * 60 * 5,
  });
}
