import { useCallback, useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Virtual } from "swiper/modules";
import "swiper/css";

import ContentCard from "./ContentCard";
import SlideButton from "./SlideButton";
import useSwiperRange from "../hooks/useSwiperRange";

const VIRTUAL_MODULES = [Virtual];

const BREAKPOINTS = {
  0: { slidesPerView: 3, slidesPerGroup: 3 },
  640: { slidesPerView: 4, slidesPerGroup: 4 },
  1024: { slidesPerView: 5, slidesPerGroup: 5 },
  1280: { slidesPerView: 6, slidesPerGroup: 6 },
};

const SWIPER_VIRTUAL = {
  enabled: true,
  addSlidesBefore: 2,
  addSlidesAfter: 2,
};

export default function Carousel({
  title,
  content,
  openDetail,
  openTrailer,
  toggleFavorite,
}) {
  const { swiperRef, visibleRange, updateVisibleRange, handleSwiperInit } =
    useSwiperRange({ start: 0, end: 5 });

  const validContents = useMemo(() => {
    if (!Array.isArray(content)) return [];
    return content.filter((c) => c?.id != null);
  }, [content]);

  const contentCount = validContents.length;

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

      <div
        className="relative left-1/2 -translate-x-1/2 w-screen mt-2 group"
        style={{ "--carousel-edge": "clamp(1rem, 5vw, 20rem)" }}
      >
        <SlideButton direction="left" onClick={scrollLeft} />
        <SlideButton direction="right" onClick={scrollRight} />

        <div className="px-[5.5%]">
          <Swiper
            modules={VIRTUAL_MODULES}
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
            {validContents.map((content, index) => {
              const contentId = content.id;
              return (
                <SwiperSlide key={contentId} virtualIndex={index}>
                  <ContentCard
                    content={content}
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
