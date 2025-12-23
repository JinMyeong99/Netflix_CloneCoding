import { useMemo } from "react";
import useGenresQuery from "./queries/useGenresQuery";

export default function useGenreName(contents, mode = "auto") {
  const { data } = useGenresQuery();

  return useMemo(() => {
    const movieGenres = data?.movieGenres ?? [];
    const seriesGenres = data?.seriesGenres ?? [];

    if (!Array.isArray(contents) || contents.length === 0) return contents;

    const movieMap = new Map();
    (movieGenres || []).forEach((genre) => {
      movieMap.set(genre.id, genre.name);
    });

    const seriesMap = new Map();
    (seriesGenres || []).forEach((genre) => {
      seriesMap.set(genre.id, genre.name);
    });

    const mixedMap = new Map();
    (movieGenres || []).forEach((genre) => {
      mixedMap.set(genre.id, genre.name);
    });
    (seriesGenres || []).forEach((genre) => {
      if (!mixedMap.has(genre.id)) mixedMap.set(genre.id, genre.name);
    });

    const getMapForContent = (content) => {
      if (mode === "movie") return movieMap;
      if (mode === "series") return seriesMap;
      if (mode === "mixed") return mixedMap;

      if (content.media_type === "movie") return movieMap;
      if (content.media_type === "tv") return seriesMap;
      return mixedMap;
    };

    return contents.map((content) => {
      if (
        Array.isArray(content.genre_names) &&
        content.genre_names.length > 0
      ) {
        return content;
      }

      if (Array.isArray(content.genre) && content.genre.length > 0) {
        const names = content.genre.map((genre) => genre.name);
        return { ...content, genre_names: names };
      }

      if (!Array.isArray(content.genre_ids) || content.genre_ids.length === 0) {
        return { ...content, genre_names: [] };
      }

      const mapToUse = getMapForContent(content);
      const names = content.genre_ids.map((id) => mapToUse.get(id));
      return { ...content, genre_names: names };
    });
  }, [contents, data, mode]);
}
