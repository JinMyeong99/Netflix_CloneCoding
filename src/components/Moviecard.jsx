import { ImageUrl } from "../api/tmdb";

export default function MovieCard({ movie }) {
  const poster = ImageUrl(movie.poster_path || movie.backdrop_path, "w400");

  return (
    <article>
      <div>
        {poster ? (
          <img src={poster} className="w-[218px] h-[327px]" />
        ) : (
          <div>NO IMAGE</div>
        )}
      </div>
    </article>
  );
}
