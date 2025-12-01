import { ImageUrl } from "../api/tmdb";

export default function ContentDetailModal({
  content,
  onClose,
  toggleFavorite,
}) {
  if (!content) return null;

  const backdrop =
    ImageUrl(content.backdrop_path || content.poster_path, "w1280") || "";
  const poster =
    ImageUrl(content.poster_path || content.backdrop_path, "w500") || "";
  const title = content.title || content.name || "";
  const overview = content.overview || "";
  const maturityRating =
    content.maturityRating || content.certification || null;
  const rating = Number(content.vote_average).toFixed(1) || null;

  const genre =
    Array.isArray(content.genre) && content.genre.length > 0
      ? content.genre.map((g) => g.name)
      : Array.isArray(content.genre_names)
        ? content.genre_names
        : [];

  const handleFavorite = () => {
    if (toggleFavorite) {
      toggleFavorite(content);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
      onClick={onClose}
    >
      <div
        className="relative max-w-[900px] w-full max-h-[90vh] bg-neutral-900 rounded-xl overflow-auto scrollbar-none"
        onClick={(e) => e.stopPropagation()}
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

          <button
            type="button"
            onClick={onClose}
            className="absolute right-3 top-3 h-8 w-8 rounded-full bg-black/70 flex items-center justify-center text-xl cursor-pointer"
          >
            ✕
          </button>
        </div>

        <div className="p-5 flex flex-col gap-4">
          <div className="flex flex-col gap-3">
            <h2 className="text-2xl font-bold">{title}</h2>
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="flex items-center justify-center h-9 px-4 rounded-sm bg-white text-black font-semibold cursor-pointer"
              >
                ▶ 재생
              </button>

              <button
                type="button"
                className="flex items-center justify-center h-9 w-9 rounded-full border border-neutral-500 text-2xl leading-none bg-neutral-800 cursor-pointer"
                onClick={handleFavorite}
              >
                +
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3 text-sm">
            {rating !== null && <span className="">평점: {rating}</span>}
            {maturityRating && (
              <span className="border border-neutral-400 px-1.5 py-0.5 rounded-sm">
                {maturityRating}
              </span>
            )}
          </div>

          <div className="flex flex-col md:flex-row gap-5">
            <div className="flex-1 space-y-3">
              {overview && (
                <p className="leading-relaxed text-neutral-200">{overview}</p>
              )}

              {genre.length > 0 && (
                <p className=" text-neutral-300">
                  <span className="text-neutral-400">장르: </span>
                  {genre.join(" • ")}
                </p>
              )}
            </div>

            {poster && (
              <div className="w-[150px] shrink-0 hidden md:block">
                <img
                  src={poster}
                  alt={title}
                  className="w-full h-auto rounded-md object-cover"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
