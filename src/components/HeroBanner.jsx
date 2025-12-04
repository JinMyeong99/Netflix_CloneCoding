import { ImageUrl } from "../api/tmdb";

export default function HeroBanner({ content, openDetail, onPlayTrailer }) {
  if (!content) return null;

  const backdrop =
    ImageUrl(content.backdrop_path || content.poster_path, "w1280") || "";

  const title = content.title || content.name || "";

  const handlePlay = () => {
    if (onPlayTrailer && content.trailerUrl) {
      onPlayTrailer(content);
    } else if (openDetail) {
      openDetail(content);
    }
  };

  const handleMoreInfo = () => {
    if (openDetail) openDetail(content);
  };

  return (
    <section className="relative w-full h-[85vh] overflow-hidden">
      {backdrop ? (
        <img
          src={backdrop}
          alt={title}
          className="w-full h-screen object-cover object-center"
        />
      ) : (
        ""
      )}

      <div className="absolute inset-0 bg-linear-to-t from-neutral-900 via-neutral-900/10 to-neutral-900/20" />

      <div className="absolute left-[5%] bottom-[10%] max-w-xl space-y-4">
        <h1 className="text-6xl font-extrabold drop-shadow-lg">{title}</h1>

        <div className="flex items-center gap-3">
          <button
            onClick={handlePlay}
            className="flex items-center justify-center h-11 px-6 rounded-md bg-white text-black text-lg font-semibold cursor-pointer"
          >
            ▶ 재생
          </button>

          <button
            onClick={handleMoreInfo}
            className="flex items-center justify-center h-11 px-6 rounded-md bg-neutral-700/80 text-white text-lg font-semibold cursor-pointer"
          >
            ⓘ 상세 정보
          </button>
        </div>
      </div>
    </section>
  );
}
