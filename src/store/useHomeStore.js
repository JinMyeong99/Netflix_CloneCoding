import axios from "axios";
import { create } from "zustand";
import { ApiKey, BaseUrl } from "../api/tmdb";
import { attachTrailer } from "../api/attachTrailer";

const useHomeStore = create((set) => ({
  popular: [],
  topRated: [],
  actionAdventure: [],
  comedyMovies: [],
  sciFiFantasy: [],
  loading: false,
  error: null,

  fetchHomeData: async () => {
    set({ loading: true, error: null });
    try {
      const paramsMovie = new URLSearchParams({
        api_key: ApiKey,
        language: "ko-KR",
        include_adult: "false",
        with_origin_country: "KR|US|JP|GB",
      }).toString();

      const popularUrl = `${BaseUrl}/discover/movie?${paramsMovie}&sort_by=popularity.desc`;
      const topRatedUrl = `${BaseUrl}/discover/movie?${paramsMovie}&sort_by=vote_average.desc&vote_count.gte=1000`;
      const actionAdventureUrl = `${BaseUrl}/discover/movie?${paramsMovie}&with_genres=28,12&sort_by=popularity.desc`;
      const comedyMoviesUrl = `${BaseUrl}/discover/movie?${paramsMovie}&with_genres=35&sort_by=popularity.desc`;
      const sciFiFantasyUrl = `${BaseUrl}/discover/movie?${paramsMovie}&with_genres=878,14&sort_by=popularity.desc`;

      const [
        popularRes,
        topRatedRes,
        actionAdventureRes,
        comedyMoviesRes,
        sciFiFantasyRes,
      ] = await Promise.all([
        axios.get(popularUrl),
        axios.get(topRatedUrl),
        axios.get(actionAdventureUrl),
        axios.get(comedyMoviesUrl),
        axios.get(sciFiFantasyUrl),
      ]);

      const popularData = popularRes.data;
      const topRatedData = topRatedRes.data;
      const actionAdventureData = actionAdventureRes.data;
      const comedyMoviesData = comedyMoviesRes.data;
      const sciFiFantasyData = sciFiFantasyRes.data;

      const [popular, topRated, actionAdventure, comedyMovies, sciFiFantasy] =
        await Promise.all([
          attachTrailer(popularData.results, "movie"),
          attachTrailer(topRatedData.results, "movie"),
          attachTrailer(actionAdventureData.results, "movie"),
          attachTrailer(comedyMoviesData.results, "movie"),
          attachTrailer(sciFiFantasyData.results, "movie"),
        ]);

      set({
        popular,
        topRated,
        actionAdventure,
        comedyMovies,
        sciFiFantasy,
        loading: false,
      });
    } catch (error) {
      set({
        error:
          error?.response?.statusText ||
          error?.message ||
          "홈 데이터 로딩 실패",
        loading: false,
      });
    }
  },
}));

export default useHomeStore;
