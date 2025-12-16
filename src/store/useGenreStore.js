import axios from "axios";
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
        axios.get(movieGenreUrl),
        axios.get(seriesGenreUrl),
      ]);

      const movieGenreData = movieGenreRes.data;
      const seriesGenreData = seriesGenreRes.data;

      set({
        status: "succeeded",
        movieGenres: movieGenreData.genres || [],
        seriesGenres: seriesGenreData.genres || [],
      });
    } catch (error) {
      set({
        status: "failed",
        error:
          error?.response?.statusText || error?.message || "장르 로딩 오류",
      });
    }
  },
}));

export default useGenreStore;
