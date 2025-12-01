import { ImageUrl } from "../api/tmdb";

export default function ContentCard({
  content,
  isActive,
  openDetail,
  toggleFavorite,
}) {
  const poster =
    ImageUrl(content.poster_path || content.backdrop_path, "w400") || "";
  const backdrop =
    ImageUrl(content.backdrop_path || content.poster_path, "w780") || "";
  const title = content.title || content.name || "";
  const maturityRating =
    content.maturityRating || content.certification || null;

  const genre =
    Array.isArray(content.genre) && content.genre.length > 0
      ? content.genre.map((g) => g.name)
      : Array.isArray(content.genre_names)
        ? content.genre_names
        : [];

  const mainGenre = genre.slice(0, 3).join("∙");

  const handleFavorite = () => {
    if (toggleFavorite) {
      toggleFavorite(content);
    }
  };

  return (
    <article className="relative group/card w-[218px]">
      <div className="overflow-hidden rounded-md bg-neutral-800">
        {poster ? (
          <img
            src={poster}
            alt={title}
            className="w-[218px] h-[327px] object-cover"
          />
        ) : (
          <div className="w-[218px] h-[327px] flex items-center justify-center bg-neutral-700 text-neutral-300">
            NO IMAGE
          </div>
        )}
      </div>
      {/* hover */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[360px]
        rounded-xl overflow-hidden bg-neutral-900 shadow-xl shadow-black/70
        transition-all duration-200 origin-center
        ${isActive ? "opacity-100 scale-100 z-30 pointer-events-auto" : "opacity-0 scale-0 z-0 pointer-events-none"}`}
      >
        <div className="relative w-full aspect-video bg-black">
          {backdrop ? (
            <img
              src={backdrop}
              alt={title}
              className="w-full h-full object-cover"
            />
          ) : poster ? (
            <img
              src={poster}
              alt={title}
              className="w-full h-full object-cover"
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
                className="flex items-center justify-center
              h-8 w-8 rounded-full bg-white text-black"
                onClick={openDetail}
              >
                ▶︎
              </button>
              <button
                type="button"
                className="flex items-center justify-center
              h-8 w-8 rounded-full border bg-neutral-800 border-neutral-500
              text-xl leading-none"
                onClick={handleFavorite}
              >
                +
              </button>
            </div>
            <div>
              <button
                type="button"
                className="flex items-center justify-center
              h-8 w-8 rounded-full border bg-neutral-800 border-neutral-500"
                onClick={openDetail}
              >
                ⌵
              </button>
            </div>
          </div>
          {maturityRating && <span className="">{maturityRating}</span>}
          {mainGenre && <p className="">{mainGenre}</p>}
        </div>
      </div>
    </article>
  );
}
