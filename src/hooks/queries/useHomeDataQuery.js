import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { attachTrailer } from "../../api/attachTrailer";
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
      popularRes,
      topRatedRes,
      actionAdventureRes,
      comedyRes,
      sciFiFantasyRes,
    ] = await Promise.all([
      axios.get(popularUrl),
      axios.get(topRatedUrl),
      axios.get(actionAdventureUrl),
      axios.get(comedyUrl),
      axios.get(sciFiFantasyUrl),
    ]);

    const [popular, topRated, actionAdventure, comedy, sciFiFantasy] =
      await Promise.all([
        attachTrailer(popularRes.data?.results ?? [], "movie"),
        attachTrailer(topRatedRes.data?.results ?? [], "movie"),
        attachTrailer(actionAdventureRes.data?.results ?? [], "movie"),
        attachTrailer(comedyRes.data?.results ?? [], "movie"),
        attachTrailer(sciFiFantasyRes.data?.results ?? [], "movie"),
      ]);

    return {
      popular,
      topRated,
      actionAdventure,
      comedy,
      sciFiFantasy,
    };
  } catch (error) {
    const message =
      error?.response?.statusText || error?.message || "홈 데이터 로딩 실패";
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
