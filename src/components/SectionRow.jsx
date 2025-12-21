import { useCallback, useMemo, useRef, useState } from "react";
import ContentCard from "./ContentCard";
import useHoverActive from "../hooks/useHoverActive";
import useFavorite from "../hooks/useFavorite";
import { Swiper, SwiperSlide } from "swiper/react";
import { Virtual } from "swiper/modules";
import "swiper/css";
import SlideButton from "./SlideButton";

export default function SectionRow({
  title,
  content,
  openDetail,
  toggleFavorite,
  playTrailer,
}) {
  const { hoverContentId, handleMouseEnter, handleMouseLeave } =
    useHoverActive();

  const { favoriteId } = useFavorite();

  const swiperRef = useRef(null);

  const [visibleRange, setVisibleRange] = useState({ start: 0, end: 5 });
  const items = useMemo(
    () => (Array.isArray(content) ? content : []),
    [content]
  );
  const itemCount = items.length;
  const swiperModules = useMemo(() => [Virtual], []);

  const scrollLeft = useCallback(() => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  }, []);

  const scrollRight = useCallback(() => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  }, []);

  const breakpoints = useMemo(
    () => ({
      0: {
        slidesPerView: 3,
        slidesPerGroup: 3,
      },
      640: {
        slidesPerView: 4,
        slidesPerGroup: 4,
      },
      1024: {
        slidesPerView: 5,
        slidesPerGroup: 5,
      },
      1280: {
        slidesPerView: 6,
        slidesPerGroup: 6,
      },
    }),
    []
  );

  const virtualConfig = useMemo(
    () => ({
      enabled: true,
      addSlidesBefore: 6,
      addSlidesAfter: 6,
    }),
    []
  );

  const clampedVisibleEnd = useMemo(
    () => (itemCount === 0 ? 0 : Math.min(visibleRange.end, itemCount - 1)),
    [itemCount, visibleRange.end]
  );

  const slides = useMemo(() => {
    if (itemCount === 0) return [];

    return items.map((item, index) => {
      const id = item?.id ?? index;

      return {
        id,
        item,
        virtualIndex: index,
        isFavorite: favoriteId.has(id),
        onEnter: () => handleMouseEnter(id),
        onLeave: () => handleMouseLeave(id),
      };
    });
  }, [favoriteId, handleMouseEnter, handleMouseLeave, itemCount, items]);

  const getHoverAlign = useCallback(
    (index) => {
      if (index === visibleRange.start) return "left";
      if (index === clampedVisibleEnd) return "right";
      return "center";
    },
    [clampedVisibleEnd, visibleRange.start]
  );

  const updateVisibleRange = useCallback((swiper) => {
    if (!swiper) return;

    const visibleIndexes = swiper.visibleSlidesIndexes;

    if (!visibleIndexes || visibleIndexes.length === 0) return;

    const start = visibleIndexes[0];
    const end = visibleIndexes[visibleIndexes.length - 1];

    setVisibleRange((prev) => {
      if (prev.start === start && prev.end === end) return prev;
      return { start, end };
    });
  }, []);

  const handleSwiperInit = useCallback(
    (swiper) => {
      swiperRef.current = swiper;
      updateVisibleRange(swiper);
    },
    [updateVisibleRange]
  );

  const handleSlideChange = useCallback(
    (swiper) => {
      updateVisibleRange(swiper);
    },
    [updateVisibleRange]
  );

  if (itemCount === 0) return null;

  return (
    <section className="relative py-6">
      <h2 className="text-2xl mb-3 md:text-3xl">{title}</h2>

      <div
        className="
          relative
          left-1/2 -translate-x-1/2
          w-screen
          mt-2
          group
        "
      >
        <SlideButton direction="left" onClick={scrollLeft} />
        <SlideButton direction="right" onClick={scrollRight} />

        <div className="px-[5.5%]">
          <Swiper
            modules={swiperModules}
            onSwiper={handleSwiperInit}
            onSlideChange={handleSlideChange}
            spaceBetween={10}
            slidesPerView={6}
            slidesPerGroup={6}
            loop={false}
            watchOverflow={true}
            className="mt-2 overflow-visible!"
            virtual={virtualConfig}
            breakpoints={breakpoints}
            onResize={updateVisibleRange}
            onBreakpoint={updateVisibleRange}
          >
            {slides.map(
              ({ id, item, virtualIndex, isFavorite, onEnter, onLeave }) => {
                const hoverAlign = getHoverAlign(virtualIndex);
                return (
                  <SwiperSlide
                    key={id}
                    virtualIndex={virtualIndex}
                    onMouseEnter={onEnter}
                    onMouseLeave={onLeave}
                  >
                    <div className="shrink-0 transition-transform duration-200 ease-out flex justify-center">
                      <ContentCard
                        content={item}
                        isFavorite={isFavorite}
                        openHover={hoverContentId === id}
                        openDetail={openDetail}
                        toggleFavorite={toggleFavorite}
                        playTrailer={playTrailer}
                        hoverAlign={hoverAlign}
                      />
                    </div>
                  </SwiperSlide>
                );
              }
            )}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
