import { memo } from "react";
import { backdropSrcSet, ImageUrl, posterSrcSet } from "../api/tmdb";

function ContentCard({
  content,
  isFavorite = false,
  openHover,
  openDetail,
  toggleFavorite,
  onPlayTrailer,
  hoverAlign = "center",
}) {
  const posterPath = content.poster_path;
  const poster = ImageUrl(posterPath, "w342") || "";

  const backdropPath = content.backdrop_path;
  const backdrop = ImageUrl(backdropPath, "w780") || "";
  const title = content.title || content.name || "";

  const genres =
    Array.isArray(content.genre) && content.genre.length > 0
      ? content.genre.map((genre) => genre.name)
      : Array.isArray(content.genre_names)
        ? content.genre_names
        : [];

  const mainGenre = genres.slice(0, 3).join("∙");

  const handleFavorite = () => {
    if (toggleFavorite) toggleFavorite(content);
  };

  const handlePlay = () => {
    if (onPlayTrailer && content.trailerUrl) onPlayTrailer(content);
  };

  const handleOpenDetail = () => {
    if (openDetail) openDetail(content);
  };

  const hoverPosition =
    hoverAlign === "left"
      ? "left-0 origin-left"
      : hoverAlign === "right"
        ? "right-0 origin-right"
        : "left-1/2 -translate-x-1/2 origin-center";

  return (
    <article className="relative group/card w-full max-w-[260px]">
      <div className="w-full aspect-2/3 overflow-hidden rounded-md bg-neutral-800">
        {poster ? (
          <img
            src={poster}
            srcSet={posterSrcSet(posterPath)}
            sizes="(min-width: 1280px) 260px, (min-width: 768px) 200px, 33vw"
            alt={title}
            width={342}
            height={513}
            className="w-full h-full object-cover object-center"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-neutral-700 text-neutral-300">
            NO IMAGE
          </div>
        )}
      </div>

      <div
        className={`absolute bottom-3 w-[480px]
        rounded-xl overflow-hidden bg-neutral-900 shadow-xl shadow-black/70
        transition-all duration-200 
        ${hoverPosition}
        ${
          openHover
            ? "opacity-100 scale-100 z-30 pointer-events-auto"
            : "opacity-0 scale-0 z-0 pointer-events-none"
        }`}
      >
        <div className="relative w-full aspect-video bg-black">
          {backdrop ? (
            <img
              src={backdrop}
              srcSet={backdropSrcSet(backdropPath)}
              sizes="(min-width: 1280px) 480px, 80vw"
              alt={title}
              width={780}
              height={439}
              className="w-full h-full object-cover object-center"
              loading="lazy"
              decoding="async"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-neutral-300">
              NO PREVIEW
            </div>
          )}

          <div className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-black/80 via-black/40 to-transparent pointer-events-none"></div>

          <h3 className="absolute bottom-4 left-4 right-4 font-bold text-3xl line-clamp-1">
            {title}
          </h3>
        </div>

        <div className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="flex items-center justify-center h-10 w-10 rounded-full bg-white text-black cursor-pointer"
                onClick={handlePlay}
              >
                ▶︎
              </button>

              <button
                type="button"
                className="flex items-center justify-center h-10 w-10 rounded-full border bg-neutral-800 border-neutral-500 text-xl leading-none cursor-pointer"
                onClick={handleFavorite}
              >
                {isFavorite ? "✓" : "+"}
              </button>
            </div>

            <button
              type="button"
              className="flex items-center justify-center h-10 w-10 rounded-full border bg-neutral-800 border-neutral-500 cursor-pointer"
              onClick={handleOpenDetail}
            >
              ⌵
            </button>
          </div>

          {mainGenre && <p className="text-lg">{mainGenre}</p>}
        </div>
      </div>
    </article>
  );
}

export default memo(ContentCard);
