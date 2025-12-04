import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiKey, BaseUrl } from "../../api/tmdb";
import { attachTrailer } from "../../api/attachTrailer";

export const fetchHomeData = createAsyncThunk(
  "home/fetchHomeData",
  async (_, { rejectWithValue }) => {
    try {
      const paramsMovie = new URLSearchParams({
        api_key: ApiKey,
        language: "ko-KR",
        include_adult: "false",
        with_origin_country: "KR|US|JP|GB",
      }).toString();

      const paramsTv = new URLSearchParams({
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
      const comedySeriesUrl = `${BaseUrl}/discover/tv?${paramsTv}&with_genres=35&sort_by=popularity.desc`;

      const [
        popularRes,
        topRatedRes,
        actionAdventureRes,
        comedyMoviesRes,
        sciFiFantasyRes,
        comedySeriesRes,
      ] = await Promise.all([
        fetch(popularUrl),
        fetch(topRatedUrl),
        fetch(actionAdventureUrl),
        fetch(comedyMoviesUrl),
        fetch(sciFiFantasyUrl),
        fetch(comedySeriesUrl),
      ]);

      if (
        !popularRes.ok ||
        !topRatedRes.ok ||
        !actionAdventureRes.ok ||
        !comedyMoviesRes.ok ||
        !sciFiFantasyRes.ok ||
        !comedySeriesRes.ok
      ) {
        throw new Error("홈 데이터 로딩 실패");
      }

      const [
        popularData,
        topRatedData,
        actionAdventureData,
        comedyMoviesData,
        sciFiFantasyData,
        comedySeriesData,
      ] = await Promise.all([
        popularRes.json(),
        topRatedRes.json(),
        actionAdventureRes.json(),
        comedyMoviesRes.json(),
        sciFiFantasyRes.json(),
        comedySeriesRes.json(),
      ]);

      const [
        popular,
        topRated,
        actionAdventure,
        comedyMovies,
        sciFiFantasy,
        comedySeries,
      ] = await Promise.all([
        attachTrailer(popularData.results, "movie"),
        attachTrailer(topRatedData.results, "movie"),
        attachTrailer(actionAdventureData.results, "movie"),
        attachTrailer(comedyMoviesData.results, "movie"),
        attachTrailer(sciFiFantasyData.results, "movie"),
        attachTrailer(comedySeriesData.results, "tv"),
      ]);

      return {
        popular,
        topRated,
        actionAdventure,
        comedyMovies,
        sciFiFantasy,
        comedySeries,
      };
    } catch (error) {
      return rejectWithValue(error.message || "홈 데이터 로딩 실패");
    }
  }
);
