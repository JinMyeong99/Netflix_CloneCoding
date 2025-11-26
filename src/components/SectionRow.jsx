import { useRef } from "react";
import MovieCard from "./MovieCard";

export default function SectionRow({ title, items }) {
  const scrollRef = useRef(null);
  if (!items || items.length === 0) {
    return null;
  }

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: -600,
        behavior: "smooth",
      });
    }
  };
  const scrollRigth = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: 600,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="relative group space-y-2">
      <h2>{title}</h2>
      <button
        onClick={scrollLeft}
        className="absolute left-0 top-1/2 -translate-y-31.5 h-67.5 w-10 bg-black/40 text-white hidden group-hover:flex items-center justify-center z-10 transition"
      >
        <span className="text-4xl">❮</span>
      </button>
      <button
        onClick={scrollRigth}
        className="absolute right-0 top-1/2 -translate-y-31.5 h-67.5 w-10 bg-black/40 text-white hidden group-hover:flex items-center justify-center z-10 transition"
      >
        <span className="text-4xl">❯</span>
      </button>
      <div
        ref={scrollRef}
        className="flex gap-2 overflow-x-scroll scrollbar-none scroll-smooth px-2"
      >
        {items.map((movie) => (
          <div key={movie.id} className="shrink-0 w-47">
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>
    </section>
  );
}
