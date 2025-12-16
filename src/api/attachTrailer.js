import axios from "axios";
import { ApiKey, BaseUrl } from "./tmdb";

const paramsVideo = new URLSearchParams({
  api_key: ApiKey,
  language: "ko-KR",
  append_to_response: "videos",
}).toString();

export async function attachTrailer(contents, mode) {
  if (!Array.isArray(contents) || contents.length === 0) return [];

  async function fetchTrailer(content, mediaType) {
    try {
      const url = `${BaseUrl}/${mediaType}/${content.id}?${paramsVideo}`;
      const { data } = await axios.get(url);

      const trailer =
        data.videos?.results?.find(
          (video) =>
            video.site === "YouTube" &&
            (video.type === "Trailer" || video.type === "Teaser")
        ) || null;

      const trailerUrl = trailer
        ? `https://www.youtube.com/watch?v=${trailer.key}`
        : null;

      return {
        ...content,
        trailerUrl,
      };
    } catch {
      return {
        ...content,
        trailerUrl: null,
      };
    }
  }

  return Promise.all(
    contents.map(async (content) => {
      let mediaType = mode;

      if (mode === "auto") {
        if (content.media_type === "movie") mediaType = "movie";
        else if (content.media_type === "tv") mediaType = "tv";
        else {
          return { ...content, trailerUrl: null };
        }
      }

      if (mediaType !== "movie" && mediaType !== "tv") {
        return { ...content, trailerUrl: null };
      }

      return fetchTrailer(content, mediaType);
    })
  );
}
