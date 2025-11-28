import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MovieSlice } from "../RTK/movie/movieSlice";
import { fetchMoviePage } from "../RTK/movie/movieThunk";
import useInfiniteScroll from "../hooks/useInfiniteScroll";
import MovieCard from "../components/MovieCard";

export default function Movie() {
  const dispatch = useDispatch();
  const { list, loading, hasMore, page, error } = useSelector(
    (state) => state.movie
  );

  const { movieGenres } = useSelector((state) => state.genre);
  const [selectedGenreId, setSelectedGenreId] = useState("");

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

  const filteredMovies = useMemo(() => {
    if (!selectedGenreId) return list;
    const genreId = Number(selectedGenreId);

    return list.filter((movie) => movie.genre_ids.includes(genreId));
  }, [list, selectedGenreId]);

  return (
    <div className=" mx-auto max-w-[90%] pb-25">
      <h2 className="text-4xl font-bold my-4">인기 영화 목록</h2>
      <div>
        <select
          value={selectedGenreId}
          onChange={(e) => setSelectedGenreId(e.target.value)}
        >
          <option value="">장르 전체</option>
          {movieGenres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
      </div>
      {error && <div>{error}</div>}
      <div className="flex flex-wrap justify-between gap-y-30">
        {filteredMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      {loading && <div>불러오는 중...</div>}
      {hasMore && <div ref={loaderRef} style={{ height: 1 }} />}
      {!hasMore && list.length > 0 && <div>더 이상 영화가 없습니다.</div>}
    </div>
  );
}
