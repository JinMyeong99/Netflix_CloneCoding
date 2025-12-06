import { useSelector } from "react-redux";
import { ImageUrl } from "../api/tmdb";

export default function ContentCard({
  content,
  openHover,
  openDetail,
  toggleFavorite,
  onPlayTrailer,
  hoverAlign = "center",
}) {
  const poster =
    ImageUrl(content.poster_path || content.backdrop_path, "w400") || "";
  const backdrop =
    ImageUrl(content.backdrop_path || content.poster_path, "w780") || "";
  const title = content.title || content.name || "";

  const favoriteList = useSelector((state) => state.favorite.list);
  const isFavorite = favoriteList.some(
    (favContent) => favContent.id === content.id
  );

  const genre =
    Array.isArray(content.genre) && content.genre.length > 0
      ? content.genre.map((g) => g.name)
      : Array.isArray(content.genre_names)
        ? content.genre_names
        : [];

  const mainGenre = genre.slice(0, 3).join("∙");

  const handleFavorite = () => {
    if (toggleFavorite) toggleFavorite(content);
  };

  const handlePlay = () => {
    if (onPlayTrailer && content.trailerUrl) onPlayTrailer(content);
  };

  const hoverPosition =
    hoverAlign === "left"
      ? "left-0 origin-left"
      : hoverAlign === "right"
        ? "right-0 origin-right"
        : "left-1/2 -translate-x-1/2 origin-center";

  return (
    <article className="relative group/card w-full max-w-[220px]">
      <div className="w-full aspect-2/3 overflow-hidden rounded-md bg-neutral-800">
        {poster ? (
          <img
            src={poster}
            alt={title}
            className="w-full h-full object-cover object-center"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-neutral-700 text-neutral-300">
            NO IMAGE
          </div>
        )}
      </div>

      <div
        className={`absolute top-5 w-[360px]
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
              alt={title}
              className="w-full h-full object-cover object-center"
            />
          ) : poster ? (
            <img
              src={poster}
              alt={title}
              className="w-full h-full object-cover object-center"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-neutral-300">
              NO PREVIEW
            </div>
          )}

          <div className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-black/80 via-black/40 to-transparent pointer-events-none"></div>

          <h3 className="absolute bottom-3 left-3 right-3 font-bold text-2xl line-clamp-1">
            {title}
          </h3>
        </div>

        <div className="p-3 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="flex items-center justify-center h-8 w-8 rounded-full bg-white text-black cursor-pointer"
                onClick={handlePlay}
              >
                ▶︎
              </button>

              <button
                type="button"
                className="flex items-center justify-center h-8 w-8 rounded-full border bg-neutral-800 border-neutral-500 text-xl leading-none cursor-pointer"
                onClick={handleFavorite}
              >
                {isFavorite ? "✓" : "+"}
              </button>
            </div>

            <button
              type="button"
              className="flex items-center justify-center h-8 w-8 rounded-full border bg-neutral-800 border-neutral-500 cursor-pointer"
              onClick={openDetail}
            >
              ⌵
            </button>
          </div>

          {mainGenre && <p>{mainGenre}</p>}
        </div>
      </div>
    </article>
  );
}
