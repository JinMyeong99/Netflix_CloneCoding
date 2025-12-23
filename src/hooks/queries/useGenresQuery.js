import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ApiKey, BaseUrl } from "../../api/tmdb";

async function fetchGenres() {
  const movieGenreUrl = `${BaseUrl}/genre/movie/list?api_key=${ApiKey}&language=ko-KR`;
  const seriesGenreUrl = `${BaseUrl}/genre/tv/list?api_key=${ApiKey}&language=ko-KR`;

  try {
    const [movieGenreRes, seriesGenreRes] = await Promise.all([
      axios.get(movieGenreUrl),
      axios.get(seriesGenreUrl),
    ]);

    return {
      movieGenres: movieGenreRes.data?.genres ?? [],
      seriesGenres: seriesGenreRes.data?.genres ?? [],
    };
  } catch (error) {
    const message =
      error?.response?.statusText ||
      error?.message ||
      "장르 로딩 오류";
    throw new Error(message);
  }
}

export default function useGenresQuery() {
  return useQuery({
    queryKey: ["genres"],
    queryFn: fetchGenres,
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 120,
  });
}
