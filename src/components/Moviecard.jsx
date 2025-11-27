import { ImageUrl } from "../api/tmdb";

export default function MovieCard({ movie }) {
  // const title = movie.title || movie.name;
  const poster = ImageUrl(movie.poster_path || movie.backdrop_path, "w400");
  // const year =
  //   movie.release_date?.slice(0, 4) || movie.first_air_date?.slice(0, 4) || "";

  return (
    <article>
      <div>
        {poster ? (
          <img src={poster} className="w-[218px] h-[327px]" />
        ) : (
          <div>NO IMAGE</div>
        )}
      </div>
      {/* <div>
        <div>{title}</div>
        {year && <div>{year}</div>}
      </div> */}
    </article>
  );
}
