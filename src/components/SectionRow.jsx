import { useRef } from "react";
import ContentCard from "./Contentcard";

export default function SectionRow({ title, items }) {
  const scrollRef = useRef(null);
  if (!items || items.length === 0) return null;

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: -1355,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: 1355,
        behavior: "smooth",
      });
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
          bg-neutral-900/40
            z-10
          "
        />
        <div
          className="
            pointer-events-none
            absolute right-0 top-0 h-full w-20
            bg-neutral-900/40
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
            cursor-pointer
          "
        >
          <svg
            viewBox="0 0 48 48"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            className="w-14 h-14
            transition-transform
            duration-200
            group-hover/button:scale-125"
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
            cursor-pointer
          "
        >
          <svg
            viewBox="0 0 48 48"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            className="w-14 h-14
            transition-transform
            duration-200
            group-hover/button:scale-125"
          >
            <path d="M18 10 L30 24 L18 38" />
          </svg>
        </button>

        <div
          ref={scrollRef}
          className="
            mt-2
            flex gap-2
            overflow-x-scroll scrollbar-none scroll-smooth
            px-[5.5%]
          "
        >
          {items.map((movie) => (
            <div
              key={movie.id}
              className="
                shrink-0
                transition-transform duration-200 ease-out
              "
            >
              <ContentCard movie={movie} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
