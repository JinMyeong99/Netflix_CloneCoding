import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiKey, BaseUrl } from "../../api/tmdb";

export const fetchHomeData = createAsyncThunk(
  "home/fetchHomeData",
  async (_, { rejectWithValue }) => {
    try {
      const params = new URLSearchParams({
        api_key: ApiKey,
        language: "ko-KR",
      }).toString();

      const genreMovieUrl = `${BaseUrl}/genre/movie/list?${params}`;
      const genreTvUrl = `${BaseUrl}/genre/tv/list?${params}`;

      const [genreMovieRes, genreTvRes] = await Promise.all([
        fetch(genreMovieUrl),
        fetch(genreTvUrl),
      ]);

      if (!genreMovieRes.ok || !genreTvRes.ok) {
        throw new Error("장르 데이터 로딩 실패");
      }

      const [genreMovieData, genreTvData] = await Promise.all([
        genreMovieRes.json(),
        genreTvRes.json(),
      ]);

      const genreMap = {};
      [...(genreMovieData.genres || []), ...(genreTvData.genres || [])].forEach(
        (genre) => {
          genreMap[genre.id] = genre.name;
        }
      );

      const paramsContent = new URLSearchParams({
        api_key: ApiKey,
        language: "ko-KR",
        include_adult: "false",
        with_origin_country: "KR|US|JP|GB",
      }).toString();

      const popularUrl = `${BaseUrl}/discover/movie?${paramsContent}&sort_by=popularity.desc`;
      const topRatedUrl = `${BaseUrl}/discover/movie?${paramsContent}&sort_by=vote_average.desc&vote_count.gte=1000`;
      const actionAdventureUrl = `${BaseUrl}/discover/movie?${paramsContent}&with_genres=28,12&sort_by=popularity.desc`;
      const comedyMoviesUrl = `${BaseUrl}/discover/movie?${paramsContent}&with_genres=35&sort_by=popularity.desc`;
      const sciFiFantasyUrl = `${BaseUrl}/discover/movie?${paramsContent}&with_genres=878,14&sort_by=popularity.desc`;
      const comedySeriesUrl = `${BaseUrl}/discover/tv?${paramsContent}&with_genres=35&sort_by=popularity.desc`;

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

      const attachGenreNames = (contentDatas) =>
        contentDatas.map((data) => ({
          ...data,
          genre_names:
            data.genre_ids?.map((genreId) => genreMap[genreId]) || [],
        }));

      return {
        popular: attachGenreNames(popularData.results || []),
        topRated: attachGenreNames(topRatedData.results || []),
        actionAdventure: attachGenreNames(actionAdventureData.results || []),
        comedyMovies: attachGenreNames(comedyMoviesData.results || []),
        sciFiFantasy: attachGenreNames(sciFiFantasyData.results || []),
        comedySeries: attachGenreNames(comedySeriesData.results || []),
      };
    } catch (error) {
      return rejectWithValue(error.message || "홈 데이터 로딩 실패");
    }
  }
);
