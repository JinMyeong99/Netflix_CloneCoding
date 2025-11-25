import MovieCard from "./Moviecard";

export default function SectionRow({ title, items }) {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <section>
      <h2>{title}</h2>
      <div className="flex gap-2 overflow-x-auto py-2 ">
        {items.map((movie) => (
          <div key={movie.id}>
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>
    </section>
  );
}
