import { useCallback, useMemo } from "react";
import useFavoriteStore from "../store/useFavoriteStore";
import { backdropSrcSet, ImageUrl, posterSrcSet } from "../api/tmdb";

export default function ContentDetailModal({
  content,
  onClose,
  toggleFavorite,
  openTrailer,
}) {
  const favoriteList = useFavoriteStore((state) => state.list);
  const contentId = content?.id;
  const isFavorite = useMemo(() => {
    if (!contentId) return false;
    return favoriteList.some((favContent) => favContent.id === contentId);
  }, [favoriteList, contentId]);

  const detail = useMemo(() => {
    if (!content) return null;

    const backdrop =
      ImageUrl(content.backdrop_path || content.poster_path, "w780") || "";
    const poster =
      ImageUrl(content.poster_path || content.backdrop_path, "w185") || "";
    const title = content.title || content.name || "";
    const overview = content.overview || "";
    const rating =
      typeof content.vote_average === "number"
        ? content.vote_average.toFixed(1)
        : null;
    const year =
      typeof content.release_date === "string" && content.release_date
        ? content.release_date.slice(0, 4)
        : typeof content.first_air_date === "string" && content.first_air_date
          ? content.first_air_date.slice(0, 4)
          : null;

    const genre =
      Array.isArray(content.genre) && content.genre.length > 0
        ? content.genre.map((genre) => genre.name)
        : Array.isArray(content.genre_names)
          ? content.genre_names
          : [];

    const trailerKey = content.trailerUrl
      ? content.trailerUrl.split("v=")[1]?.split("&")[0]
      : null;

    return {
      backdrop,
      poster,
      title,
      overview,
      rating,
      year,
      genre,
      trailerKey,
    };
  }, [content]);

  const handleFavorite = useCallback(() => {
    if (content && toggleFavorite) {
      toggleFavorite(content);
    }
  }, [content, toggleFavorite]);

  const handleOpenTrailer = useCallback(() => {
    if (!content) return;
    if (openTrailer) openTrailer(content);
  }, [content, openTrailer]);

  if (!detail) return null;
  const { backdrop, poster, title, overview, rating, year, genre, trailerKey } =
    detail;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
      onClick={onClose}
    >
      <div
        className="relative max-w-225 w-full max-h-[90vh] bg-neutral-900 rounded-xl overflow-auto scrollbar-none"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full aspect-video bg-black">
          {trailerKey ? (
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${trailerKey}?controls=1&rel=0&playsinline=1`}
              title={title}
              allow="encrypted-media; fullscreen"
              allowFullScreen
            />
          ) : backdrop ? (
            <img
              src={backdrop}
              srcSet={backdropSrcSet(
                content.backdrop_path || content.poster_path
              )}
              sizes="(min-width: 1280px) 70vw, 90vw"
              alt={title}
              className="w-full h-full object-cover object-center"
              loading="lazy"
              decoding="async"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-neutral-300">
              NO PREVIEW
            </div>
          )}

          <button
            type="button"
            onClick={onClose}
            className="absolute right-3 top-3 h-8 w-8 rounded-full bg-black/70 flex items-center justify-center text-xl cursor-pointer"
          >
            ✕
          </button>
        </div>

        <div className="p-5 flex flex-col gap-4">
          <div className="flex justify-between">
            <div className="flex flex-col gap-5">
              <h2 className="text-4xl font-bold">{title}</h2>
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  className="flex items-center justify-center h-11 px-7 rounded-sm bg-white text-black font-semibold text-xl cursor-pointer"
                  onClick={handleOpenTrailer}
                >
                  ▶ 재생
                </button>

                <button
                  type="button"
                  className="flex items-center justify-center h-11 w-11 rounded-full border border-neutral-500 text-2xl leading-none bg-neutral-800 cursor-pointer"
                  onClick={handleFavorite}
                >
                  {isFavorite ? "✓" : "+"}
                </button>
              </div>
            </div>

            <div className="justify-end space-y-1 text-sm md:text-base">
              <div>
                {year && (
                  <span className="text-neutral-400">
                    제작연도: <span className="text-white">{year}</span>
                  </span>
                )}
              </div>
              <div>
                {rating !== null && (
                  <span className="text-neutral-400">
                    평점: <span className="text-white">{rating}</span>
                  </span>
                )}
              </div>
              <div>
                {genre.length > 0 && (
                  <p className=" text-white">
                    <span className="text-neutral-400">장르: </span>
                    {genre.join(" • ")}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-5">
            <div className="flex-1 space-y-3">
              {overview && (
                <p className="leading-relaxed text-sm md:text-base">
                  {overview}
                </p>
              )}
            </div>

            {poster && (
              <div className="w-37.5 shrink-0 hidden md:block">
                <img
                  src={poster}
                  srcSet={posterSrcSet(
                    content.poster_path || content.backdrop_path
                  )}
                  sizes="(min-width: 1280px) 200px, (min-width: 768px) 180px, 150px"
                  alt={title}
                  className="w-full h-auto rounded-md object-cover "
                  loading="lazy"
                  decoding="async"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
