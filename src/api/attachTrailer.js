import axios from "axios";
import { ApiKey, BaseUrl } from "./tmdb";

const paramsVideo = new URLSearchParams({
  api_key: ApiKey,
  language: "ko-KR",
  append_to_response: "videos",
}).toString();

const trailerCache = new Map();

function setMediaType(content, mode) {
  if (mode === "auto") {
    if (content.media_type === "movie") return "movie";
    if (content.media_type === "tv") return "tv";
    return null;
  }

  if (mode === "movie" || mode === "tv") return mode;
  return null;
}

async function fetchTrailerUrl(contentId, mediaType) {
  try {
    const url = `${BaseUrl}/${mediaType}/${contentId}?${paramsVideo}`;
    const { data } = await axios.get(url);

    const trailer =
      data.videos?.results?.find(
        (video) =>
          video.site === "YouTube" &&
          (video.type === "Trailer" || video.type === "Teaser")
      ) || null;

    return trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : null;
  } catch {
    return null;
  }
}

export async function attachTrailer(contents, mode) {
  if (!Array.isArray(contents) || contents.length === 0) return [];

  return Promise.all(
    contents.map(async (content) => {
      const mediaType = setMediaType(content, mode);

      if (!mediaType || !content?.id) {
        return { ...content, trailerUrl: null };
      }

      if (content.trailerUrl) {
        return content;
      }

      const cacheKey = `${mediaType}-${content.id}`;
      if (trailerCache.has(cacheKey)) {
        const cachedTrailer = await trailerCache.get(cacheKey);
        return { ...content, trailerUrl: cachedTrailer };
      }

      const trailerPromise = fetchTrailerUrl(content.id, mediaType);
      trailerCache.set(cacheKey, trailerPromise);
      const trailerUrl = await trailerPromise;
      trailerCache.set(cacheKey, trailerUrl);

      return { ...content, trailerUrl };
    })
  );
}
