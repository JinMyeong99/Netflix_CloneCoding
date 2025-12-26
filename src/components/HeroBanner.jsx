import { memo, useCallback, useEffect, useMemo } from "react";
import { backdropSrcSet, ImageUrl } from "../api/tmdb";

function HeroBanner({ content, openDetail, openTrailer }) {
  const hasContent = Boolean(content);
  const title = useMemo(() => {
    if (!content) return "";
    return content.title || content.name || "";
  }, [content]);

  const backdropPath = content?.backdrop_path || "";

  const backdropSrc = useMemo(() => {
    return backdropPath ? ImageUrl(backdropPath, "w1280") : "";
  }, [backdropPath]);
  const heroSizes = "(max-width: 1024px) 100vw, 1280px";

  const handleOpenTrailer = useCallback(() => {
    if (!content) return;
    if (openTrailer) openTrailer(content);
  }, [openTrailer, content]);

  const handleOpenDetail = useCallback(() => {
    if (!content) return;
    if (openDetail) openDetail(content);
  }, [openDetail, content]);

  useEffect(() => {
    if (!backdropSrc) return;

    const preloadLink = document.querySelector(
      'link[rel="preload"][data-hero-preload="true"]'
    );
    if (preloadLink && preloadLink.href === backdropSrc) return;
    if (preloadLink) preloadLink.remove();

    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = backdropSrc;
    link.setAttribute("data-hero-preload", "true");

    const srcSet = backdropSrcSet(backdropPath);
    if (srcSet) {
      link.setAttribute("imagesrcset", srcSet);
      link.setAttribute("imagesizes", heroSizes);
    }

    document.head.appendChild(link);

    return () => {
      link.remove();
    };
  }, [backdropSrc, backdropPath, heroSizes]);

  return (
    <section className="relative w-full aspect-video min-h-80 max-h-[85vh] overflow-hidden bg-neutral-900">
      {backdropSrc ? (
        <img
          src={backdropSrc}
          srcSet={backdropSrcSet(backdropPath)}
          sizes={heroSizes}
          alt={title}
          width={1280}
          height={720}
          className="block w-full h-full object-cover object-center"
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
      ) : (
        <div className="absolute inset-0 bg-linear-to-r from-neutral-900 via-neutral-800 to-neutral-900 animate-pulse" />
      )}

      <div className="absolute inset-0 bg-linear-to-t from-neutral-900 via-neutral-900/10 to-neutral-900/20" />

      <div className="absolute left-[5%] bottom-[10%] max-w-xl space-y-4 md:space-y-6 xl:space-y-10">
        <h1 className="text-4xl font-extrabold drop-shadow-lg lg:text-5xl xl:text-6xl">
          {hasContent ? (
            title
          ) : (
            <span className="inline-block h-10 w-56 rounded bg-white/20 animate-pulse" />
          )}
        </h1>

        <div className="flex items-center gap-3">
          {hasContent ? (
            <>
              <button
                onClick={handleOpenTrailer}
                className="flex items-center justify-center h-9 px-4 rounded-md bg-white text-black text-sm font-semibold cursor-pointer md:h-10 md:px-5 md:text-base lg:h-12 lg:px-6 lg:text-xl xl:h-14 xl:px-9 xl:text-2xl hover:bg-neutral-300"
              >
                ▶ 재생
              </button>

              <button
                onClick={handleOpenDetail}
                className="flex items-center justify-center h-9 px-4 rounded-md bg-neutral-500/80 text-white text-sm font-semibold cursor-pointer md:h-10 md:px-5 md:text-base lg:h-12 lg:px-6 lg:text-xl xl:h-14 xl:px-8 xl:text-2xl hover:bg-neutral-600/60"
              >
                ⓘ 상세 정보
              </button>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <span className="block h-9 w-20 rounded bg-white/30 animate-pulse md:h-10 lg:h-12" />
              <span className="block h-9 w-28 rounded bg-white/20 animate-pulse md:h-10 lg:h-12" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default memo(HeroBanner);
