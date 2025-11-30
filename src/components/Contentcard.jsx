import { ImageUrl } from "../api/tmdb";

export default function ContentCard({ content }) {
  const poster = ImageUrl(content.poster_path || content.backdrop_path, "w400");

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
