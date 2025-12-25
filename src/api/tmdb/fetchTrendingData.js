import { fetchJson } from "../fetchJson";
import { ApiKey, BaseUrl } from "../tmdb";

export async function fetchTrendingData() {
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

    return {
      today: todayData?.results ?? [],
      week: weekData?.results ?? [],
      rising: risingData?.results ?? [],
      hot: hotData?.results ?? [],
    };
  } catch (error) {
    const message =
      (error instanceof Error && error.message) ||
      "트렌드 데이터 로딩 실패";
    throw new Error(message);
  }
}
