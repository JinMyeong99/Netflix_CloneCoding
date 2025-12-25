import { ApiKey, BaseUrl } from "./tmdb";
import { fetchJson } from "./fetchJson";

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
    if (content.first_air_date) return "tv";
    if (content.release_date) return "movie";
    return null;
  }

  if (mode === "movie") return "movie";
  if (mode === "series") return "tv";
  return null;
}

async function fetchTrailerUrl(contentId, mediaType) {
  try {
    const url = `${BaseUrl}/${mediaType}/${contentId}?${paramsVideo}`;
    const data = await fetchJson(url, "트레일러 로딩 실패");

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

export async function getTrailerUrl(content, mode = "auto") {
  const mediaType = setMediaType(content, mode);

  if (!mediaType || !content?.id) {
    return null;
  }

  const cacheKey = `${mediaType}-${content.id}`;

  if (trailerCache.has(cacheKey)) {
    return trailerCache.get(cacheKey);
  }

  const trailerPromise = fetchTrailerUrl(content.id, mediaType);
  trailerCache.set(cacheKey, trailerPromise);

  const trailerUrl = await trailerPromise;
  trailerCache.set(cacheKey, trailerUrl);

  return trailerUrl;
}

export async function attachTrailer(contents, mode) {
  if (!Array.isArray(contents) || contents.length === 0) return [];

  return Promise.all(
    contents.map(async (content) => {
      const trailerUrl = await getTrailerUrl(content, mode);
      return { ...content, trailerUrl };
    })
  );
}
