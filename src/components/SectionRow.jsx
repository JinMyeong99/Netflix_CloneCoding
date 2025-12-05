import { useRef } from "react";
import ContentCard from "./ContentCard";
import useHoverActive from "../hooks/useHoverActive";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
  
export default function SectionRow({
  title,
  content,
  openDetail,
  toggleFavorite,
  onPlayTrailer,
}) {
  const { hoverContentId, handleMouseEnter, handleMouseLeave } =
    useHoverActive();

  const swiperRef = useRef(null);

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
        <div
          className="
            pointer-events-none
            absolute left-0 top-0 h-full w-20
            bg-neutral-900/60
            z-10
          "
        />
        <div
          className="
            pointer-events-none
            absolute right-0 top-0 h-full w-20
            bg-neutral-900/60
            z-10
          "
        />

        <button
          type="button"
          onClick={scrollLeft}
          className="
            group/button
            flex
            absolute left-0 top-1/2 -translate-y-1/2
            z-20
            h-full w-20
            items-center justify-center
            opacity-0 group-hover:opacity-100
            hover:bg-black/50
            transition-opacity duration-200
            rounded-md
            cursor-pointer
          "
        >
          <svg
            viewBox="0 0 48 48"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            className="
              w-14 h-14
              transition-transform
              duration-200
              group-hover/button:scale-125
            "
          >
            <path d="M30 10 L18 24 L30 38" />
          </svg>
        </button>

        <button
          type="button"
          onClick={scrollRight}
          className="
            group/button
            flex
            absolute right-0 top-1/2 -translate-y-1/2
            z-20
            h-full w-20
            items-center justify-center
            opacity-0 group-hover:opacity-100
            hover:bg-black/50
            transition-opacity duration-200
            rounded-md
            cursor-pointer
          "
        >
          <svg
            viewBox="0 0 48 48"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            className="
              w-14 h-14
              transition-transform
              duration-200
              group-hover/button:scale-125
            "
          >
            <path d="M18 10 L30 24 L18 38" />
          </svg>
        </button>

        <div className="px-[5.5%]">
          <Swiper
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            spaceBetween={8}
            slidesPerView={6}
            slidesPerGroup={6}
            loop={false}
            watchOverflow={true}
            className="mt-2 overflow-visible!"
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
            {content.map((content) => (
              <SwiperSlide
                key={content.id}
                onMouseEnter={() => handleMouseEnter(content.id)}
                onMouseLeave={() => handleMouseLeave(content.id)}
              >
                <div className="shrink-0 transition-transform duration-200 ease-out flex justify-center">
                  <ContentCard
                    content={content}
                    openHover={hoverContentId === content.id}
                    openDetail={() => openDetail && openDetail(content)}
                    toggleFavorite={toggleFavorite}
                    onPlayTrailer={onPlayTrailer}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
