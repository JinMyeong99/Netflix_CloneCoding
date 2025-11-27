import { useCallback, useEffect } from "react";
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

  return (
    <div className=" mx-auto max-w-[90%]">
      <h2 className="text-4xl font-bold my-4">인기 영화 목록</h2>
      {error && <div>{error}</div>}
      <div className="flex flex-wrap justify-between gap-y-30">
        {list.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      {loading && <div>불러오는 중...</div>}
      {hasMore && <div ref={loaderRef} style={{ height: 1 }} />}
      {!hasMore && list.length > 0 && <div>더 이상 영화가 없습니다.</div>}
    </div>
  );
}
