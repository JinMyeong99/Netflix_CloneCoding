import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MovieSlice } from "../RTK/movie/movieSlice";
import { fetchMoviePage } from "../RTK/movie/movieThunk";
import useInfiniteScroll from "../hooks/useInfiniteScroll";
import GenreSelector from "../components/GenreSelector";
import ContentCard from "../components/ContentCard";

export default function Movie() {
  const dispatch = useDispatch();

  const { list, loading, hasMore, page, error } = useSelector(
    (state) => state.movie
  );

  useEffect(() => {
    if (page === 0 && list.length === 0) {
      dispatch(MovieSlice.actions.resetMovie());
      dispatch(fetchMoviePage());
    }
  }, [dispatch, page, list.length]);

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      dispatch(fetchMoviePage());
    }
  }, [dispatch, loading, hasMore]);

  const loaderRef = useInfiniteScroll({
    loading,
    hasMore,
    onLoadMore: loadMore,
  });

  const { movieGenres } = useSelector((state) => state.genre);

  const [selectedGenreId, setSelectedGenreId] = useState("");

  const filteredMovies = useMemo(() => {
    if (!selectedGenreId) return list;
    const genreId = Number(selectedGenreId);

    return list.filter(
      (movie) =>
        Array.isArray(movie.genre_ids) && movie.genre_ids.includes(genreId)
    );
  }, [list, selectedGenreId]);

  return (
    <div className="mx-auto max-w-[90%] pb-[100px]">
      <div className="flex items-center gap-6 my-5">
        <h2 className="text-4xl ">인기 영화</h2>

        <GenreSelector
          genres={movieGenres}
          selectedId={selectedGenreId}
          onChange={setSelectedGenreId}
        />
      </div>

      {error && <div className="text-red-500 mb-2">{error}</div>}

      <div className="flex flex-wrap justify-between gap-y-20">
        {filteredMovies.map((movie) => (
          <ContentCard key={movie.id} content={movie} />
        ))}
      </div>

      {loading && <div>불러오는 중...</div>}
      {hasMore && <div ref={loaderRef} style={{ height: 1 }} />}
      {!hasMore && list.length > 0 && <div>더 이상 영화가 없습니다.</div>}
    </div>
  );
}
