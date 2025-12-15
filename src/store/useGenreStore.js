import { create } from "zustand";
import { ApiKey, BaseUrl } from "../api/tmdb";

const useGenreStore = create((set) => ({
  movieGenres: [],
  seriesGenres: [],
  status: "idle",
  error: null,

  fetchGenre: async () => {
    set({ status: "loading", error: null });
    try {
      const movieGenreUrl = `${BaseUrl}/genre/movie/list?api_key=${ApiKey}&language=ko-KR`;
      const seriesGenreUrl = `${BaseUrl}/genre/tv/list?api_key=${ApiKey}&language=ko-KR`;

      const [movieGenreRes, seriesGenreRes] = await Promise.all([
        fetch(movieGenreUrl),
        fetch(seriesGenreUrl),
      ]);
      if (!movieGenreRes.ok) throw new Error("영화 장르 로딩 실패");
      if (!seriesGenreRes.ok) throw new Error("시리즈 장르 로딩 실패");

      const movieGenreData = await movieGenreRes.json();
      const seriesGenreData = await seriesGenreRes.json();

      set({
        status: "succeeded",
        movieGenres: movieGenreData.genres || [],
        seriesGenres: seriesGenreData.genres || [],
      });
    } catch (error) {
      set({ status: "failed", error: error.message || "장르 로딩 오류" });
    }
  },
}));

export default useGenreStore;
