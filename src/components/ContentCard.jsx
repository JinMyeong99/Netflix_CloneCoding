import { memo, useCallback, useMemo } from "react";
import { backdropSrcSet, ImageUrl, posterSrcSet } from "../api/tmdb";

function ContentCard({
  content,
  isFavorite = false,
  openHover,
  openDetail,
  toggleFavorite,
  playTrailer,
  hoverAlign = "center",
}) {
  const {
    poster_path,
    backdrop_path,
    title: contentTitle,
    name,
    genre,
    genre_names,
  } = content;

  const poster = useMemo(
    () => ImageUrl(poster_path, "w185") || "",
    [poster_path]
  );
  const backdrop = useMemo(
    () => ImageUrl(backdrop_path, "w780") || "",
    [backdrop_path]
  );
  const title = contentTitle || name || "";

  const mainGenre = useMemo(() => {
    const genres =
      Array.isArray(genre) && genre.length > 0
        ? genre.map((g) => g.name)
        : Array.isArray(genre_names)
          ? genre_names
          : [];
    return genres.slice(0, 3).join("∙");
  }, [genre, genre_names]);

  const handleFavorite = useCallback(() => {
    if (toggleFavorite) toggleFavorite(content);
  }, [toggleFavorite, content]);

  const handlePlay = useCallback(() => {
    if (playTrailer) playTrailer(content);
  }, [playTrailer, content]);

  const handleOpenDetail = useCallback(() => {
    if (openDetail) openDetail(content);
  }, [openDetail, content]);

  const hoverPosition = useMemo(() => {
    switch (hoverAlign) {
      case "left":
        return "left-0 origin-left";
      case "right":
        return "right-0 origin-right";
      default:
        return "left-1/2 -translate-x-1/2 origin-center";
    }
  }, [hoverAlign]);

  const hoverCardStyle = useMemo(
    () => ({
      width: "min(420px, calc(100vw - 32px))",
      minWidth: "220px",
    }),
    []
  );

  return (
    <article className="relative group/card w-full max-w-65">
      <div className="w-full aspect-2/3 overflow-hidden rounded-md bg-neutral-800">
        {poster ? (
          <img
            src={poster}
            srcSet={posterSrcSet(poster_path)}
            sizes="(min-width: 1280px) 220px, (min-width: 768px) 180px, 33vw"
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
        className={`absolute bottom-3
        rounded-xl overflow-hidden bg-neutral-900 shadow-xl shadow-black/70
        transition-all duration-200 
        ${hoverPosition}
        ${
          openHover
            ? "opacity-100 scale-100 z-30 pointer-events-auto"
            : "opacity-0 scale-0 z-0 pointer-events-none"
        }`}
        style={hoverCardStyle}
      >
        <div className="relative w-full aspect-video bg-black">
          {backdrop ? (
            <img
              src={backdrop}
              srcSet={backdropSrcSet(backdrop_path)}
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
                className="flex items-center justify-center h-11 w-11 rounded-full bg-white text-black cursor-pointer"
                onClick={handlePlay}
              >
                ▶︎
              </button>

              <button
                type="button"
                className="flex items-center justify-center h-11 w-11 rounded-full border bg-neutral-800 border-neutral-500 text-xl leading-none cursor-pointer"
                onClick={handleFavorite}
              >
                {isFavorite ? "✓" : "+"}
              </button>
            </div>

            <button
              type="button"
              className="flex items-center justify-center h-11 w-11 rounded-full border bg-neutral-800 border-neutral-500 cursor-pointer"
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
