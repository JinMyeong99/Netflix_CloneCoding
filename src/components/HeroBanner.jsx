import { memo, useCallback, useMemo } from "react";
import { backdropSrcSet, ImageUrl } from "../api/tmdb";

function HeroBanner({ content, openDetail, playTrailer }) {
  const title = useMemo(() => {
    if (!content) return "";
    return content.title || content.name || "";
  }, [content]);

  const backdropPath = content?.backdrop_path || "";

  const backdropSrc = useMemo(() => {
    return backdropPath ? ImageUrl(backdropPath, "w1280") : "";
  }, [backdropPath]);

  const handlePlay = useCallback(() => {
    if (!content) return;
    if (playTrailer) playTrailer(content);
  }, [playTrailer, content]);

  const handleMoreInfo = useCallback(() => {
    if (!content) return;
    if (openDetail) openDetail(content);
  }, [openDetail, content]);

  if (!content) return null;

  return (
    <section className="relative w-full max-h-[85vh] overflow-hidden">
      {backdropSrc ? (
        <img
          src={backdropSrc}
          srcSet={backdropSrcSet(backdropPath)}
          sizes="100vw"
          alt={title}
          width={1280}
          height={720}
          className="block w-full max-h-screen aspect-video object-cover object-center"
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
      ) : null}

      <div className="absolute inset-0 bg-linear-to-t from-neutral-900 via-neutral-900/10 to-neutral-900/20" />

      <div className="absolute left-[5%] bottom-[10%] max-w-xl space-y-4 md:space-y-6 xl:space-y-10">
        <h1 className="text-4xl font-extrabold drop-shadow-lg lg:text-5xl xl:text-6xl">
          {title}
        </h1>

        <div className="flex items-center gap-3">
          <button
            onClick={handlePlay}
            className="flex items-center justify-center h-9 px-4 rounded-md bg-white text-black text-sm font-semibold cursor-pointer md:h-10 md:px-5 md:text-base lg:h-12 lg:px-6 lg:text-xl xl:h-14 xl:px-9 xl:text-2xl hover:bg-neutral-300"
          >
            ▶ 재생
          </button>

          <button
            onClick={handleMoreInfo}
            className="flex items-center justify-center h-9 px-4 rounded-md bg-neutral-500/80 text-white text-sm font-semibold cursor-pointer md:h-10 md:px-5 md:text-base xl:h-14 xl:px-8 xl:text-2xl hover:bg-neutral-600/60"
          >
            ⓘ 상세 정보
          </button>
        </div>
      </div>
    </section>
  );
}

export default memo(HeroBanner);
