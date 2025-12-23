import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { attachTrailer } from "../../api/attachTrailer";
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
    const [todayRes, weekRes, risingRes, hotRes] = await Promise.all([
      axios.get(todayUrl),
      axios.get(weekUrl),
      axios.get(risingUrl),
      axios.get(hotUrl),
    ]);

    const todayResults = todayRes.data?.results ?? [];
    const weekResults = weekRes.data?.results ?? [];
    const risingResults = risingRes.data?.results ?? [];
    const hotResults = hotRes.data?.results ?? [];

    const [today, week, rising, hot] = await Promise.all([
      attachTrailer(todayResults, "auto"),
      attachTrailer(weekResults, "auto"),
      attachTrailer(risingResults, "auto"),
      attachTrailer(hotResults, "auto"),
    ]);

    return { today, week, rising, hot };
  } catch (error) {
    const message =
      error?.response?.statusText ||
      error?.message ||
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
