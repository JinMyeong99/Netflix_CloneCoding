import { useQuery } from "@tanstack/react-query";
import { fetchJson } from "../../api/fetchJson";
import { ApiKey, BaseUrl } from "../../api/tmdb";

async function fetchHomeData() {
  const paramsMovie = new URLSearchParams({
    api_key: ApiKey,
    language: "ko-KR",
    include_adult: "false",
    with_origin_country: "KR|US|JP|GB",
  }).toString();

  const popularUrl = `${BaseUrl}/discover/movie?${paramsMovie}&sort_by=popularity.desc`;
  const topRatedUrl = `${BaseUrl}/discover/movie?${paramsMovie}&sort_by=vote_average.desc&vote_count.gte=1000`;
  const actionAdventureUrl = `${BaseUrl}/discover/movie?${paramsMovie}&with_genres=28,12&sort_by=popularity.desc`;
  const comedyUrl = `${BaseUrl}/discover/movie?${paramsMovie}&with_genres=35&sort_by=popularity.desc`;
  const sciFiFantasyUrl = `${BaseUrl}/discover/movie?${paramsMovie}&with_genres=878,14&sort_by=popularity.desc`;

  try {
    const [
      popularData,
      topRatedData,
      actionAdventureData,
      comedyData,
      sciFiFantasyData,
    ] = await Promise.all([
      fetchJson(popularUrl, "홈 데이터 로딩 실패"),
      fetchJson(topRatedUrl, "홈 데이터 로딩 실패"),
      fetchJson(actionAdventureUrl, "홈 데이터 로딩 실패"),
      fetchJson(comedyUrl, "홈 데이터 로딩 실패"),
      fetchJson(sciFiFantasyUrl, "홈 데이터 로딩 실패"),
    ]);

    return {
      popular: popularData?.results ?? [],
      topRated: topRatedData?.results ?? [],
      actionAdventure: actionAdventureData?.results ?? [],
      comedy: comedyData?.results ?? [],
      sciFiFantasy: sciFiFantasyData?.results ?? [],
    };
  } catch (error) {
    const message =
      (error instanceof Error && error.message) || "홈 데이터 로딩 실패";
    throw new Error(message);
  }
}

export default function useHomeDataQuery() {
  return useQuery({
    queryKey: ["home"],
    queryFn: fetchHomeData,
    staleTime: 1000 * 60 * 5,
  });
}
