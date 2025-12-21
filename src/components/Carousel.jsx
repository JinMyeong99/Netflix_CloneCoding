import { useCallback, useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Virtual } from "swiper/modules";
import "swiper/css";

import ContentCard from "./ContentCard";
import SlideButton from "./SlideButton";
import useHoverActive from "../hooks/useHoverActive";
import useFavorite from "../hooks/useFavorite";
import useSwiperRange from "../hooks/useSwiperRange";

const SWIPER_MODULES = [Virtual];

const BREAKPOINTS = {
  0: { slidesPerView: 3, slidesPerGroup: 3 },
  640: { slidesPerView: 4, slidesPerGroup: 4 },
  1024: { slidesPerView: 5, slidesPerGroup: 5 },
  1280: { slidesPerView: 6, slidesPerGroup: 6 },
};

const SWIPER_VIRTUAL = {
  enabled: true,
  addSlidesBefore: 6,
  addSlidesAfter: 6,
};

export default function Carousel({
  title,
  content,
  openDetail,
  openTrailer,
  toggleFavorite,
}) {
  const { hoverContentId, handleMouseEnter, handleMouseLeave } =
    useHoverActive();
  const { favoriteId } = useFavorite();
  const { swiperRef, visibleRange, updateVisibleRange, handleSwiperInit } =
    useSwiperRange({ start: 0, end: 5 });

  const contents = useMemo(() => {
    if (!Array.isArray(content)) return [];
    return content.filter((c) => c?.id != null);
  }, [content]);

  const contentCount = contents.length;

  const visibleEndIndex =
    contentCount === 0 ? 0 : Math.min(visibleRange.end, contentCount - 1);

  const getHoverAlign = useCallback(
    (index) => {
      if (index === visibleRange.start) return "left";
      if (index === visibleEndIndex) return "right";
      return "center";
    },
    [visibleEndIndex, visibleRange.start]
  );

  const scrollLeft = () => {
    swiperRef.current?.slidePrev();
  };

  const scrollRight = () => {
    swiperRef.current?.slideNext();
  };

  if (contentCount === 0) return null;

  return (
    <section className="relative py-6">
      <h2 className="text-2xl mb-3 md:text-3xl">{title}</h2>

      <div className="relative left-1/2 -translate-x-1/2 w-screen mt-2 group">
        <SlideButton direction="left" onClick={scrollLeft} />
        <SlideButton direction="right" onClick={scrollRight} />

        <div className="px-[5.5%]">
          <Swiper
            modules={SWIPER_MODULES}
            virtual={SWIPER_VIRTUAL}
            breakpoints={BREAKPOINTS}
            spaceBetween={10}
            slidesPerView={6}
            slidesPerGroup={6}
            loop={false}
            watchOverflow
            className="mt-2 overflow-visible!"
            onSwiper={handleSwiperInit}
            onSlideChange={updateVisibleRange}
            onResize={updateVisibleRange}
            onBreakpoint={updateVisibleRange}
          >
            {contents.map((content, index) => {
              const contentId = content.id;
              return (
                <SwiperSlide
                  key={contentId}
                  virtualIndex={index}
                  onMouseEnter={() => handleMouseEnter(contentId)}
                  onMouseLeave={() => handleMouseLeave(contentId)}
                >
                  <ContentCard
                    content={content}
                    isFavorite={favoriteId.has(contentId)}
                    openHover={hoverContentId === contentId}
                    openDetail={openDetail}
                    openTrailer={openTrailer}
                    toggleFavorite={toggleFavorite}
                    hoverAlign={getHoverAlign(index)}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
