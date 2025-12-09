import { useRef, useState } from "react";
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
  onPlayTrailer,
}) {
  const { hoverContentId, handleMouseEnter, handleMouseLeave } =
    useHoverActive();

  const { favoriteId } = useFavorite();

  const swiperRef = useRef(null);

  const [visibleRange, setVisibleRange] = useState({ start: 0, end: 5 });

  if (!content || content.length === 0) return null;

  const scrollLeft = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  };

  const scrollRight = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  const updateVisibleRange = (swiper) => {
    if (!swiper) return;

    let slidesPerView = swiper.params.slidesPerView || 0;

    const currentBp = swiper.currentBreakpoint;
    if (
      swiper.params.breakpoints &&
      swiper.params.breakpoints[currentBp]?.slidesPerView
    ) {
      slidesPerView = swiper.params.breakpoints[currentBp].slidesPerView;
    }

    const start = swiper.activeIndex ?? 0;
    const end = start + slidesPerView - 1;

    setVisibleRange({
      start,
      end,
    });
  };

  return (
    <section className="relative py-4">
      <h2 className="text-2xl mb-3">{title}</h2>

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
            modules={[Virtual]}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
              updateVisibleRange(swiper);
            }}
            onSlideChange={(swiper) => {
              updateVisibleRange(swiper);
            }}
            spaceBetween={8}
            slidesPerView={6}
            slidesPerGroup={6}
            loop={false}
            watchOverflow={true}
            className="mt-2 overflow-visible!"
            virtual={{
              enabled: true,
              addSlidesBefore: 6,
              addSlidesAfter: 6,
            }}
            breakpoints={{
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
            }}
          >
            {content.map((item, index) => {
              const clampedEnd = Math.min(visibleRange.end, content.length - 1);

              let hoverAlign = "center";
              if (index === visibleRange.start) hoverAlign = "left";
              else if (index === clampedEnd) hoverAlign = "right";

              return (
                <SwiperSlide
                  key={item.id}
                  virtualIndex={index}
                  onMouseEnter={() => handleMouseEnter(item.id)}
                  onMouseLeave={() => handleMouseLeave(item.id)}
                >
                  <div className="shrink-0 transition-transform duration-200 ease-out flex justify-center">
                    <ContentCard
                      content={item}
                      isFavorite={favoriteId.has(item.id)}
                      openHover={hoverContentId === item.id}
                      openDetail={openDetail}
                      toggleFavorite={toggleFavorite}
                      onPlayTrailer={onPlayTrailer}
                      hoverAlign={hoverAlign}
                    />
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
