import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { seriesSlice } from "../RTK/series/seriesSlice";
import { fetchSeriesPage } from "../RTK/series/seriesThunk";
import useInfiniteScroll from "../hooks/useInfiniteScroll";
import MovieCard from "../components/MovieCard";

export default function Series() {
  const dispatch = useDispatch();
  const { list, loading, hasMore, page, error } = useSelector(
    (state) => state.series
  );

  const { seriesGenres } = useSelector((state) => state.genre);
  const [selectedGenreId, setSelectedGenreId] = useState("");

  useEffect(() => {
    if (page === 0 && list.length === 0) {
      dispatch(seriesSlice.actions.resetSeries());
      dispatch(fetchSeriesPage());
    }
  }, [dispatch, page, list.length]);

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      dispatch(fetchSeriesPage());
    }
  }, [dispatch, loading, hasMore]);

  const loaderRef = useInfiniteScroll({
    loading,
    hasMore,
    onLoadMore: loadMore,
  });

  const filteredSeries = useMemo(() => {
    if (!selectedGenreId) return list;
    const genreId = Number(selectedGenreId);

    return list.filter((series) => series.genre_ids.includes(genreId));
  }, [list, selectedGenreId]);

  return (
    <div className="mx-auto max-w-[90%] pb-25">
      <h2 className="text-4xl font-bold my-4">인기 시리즈</h2>
      <div>
        <select
          value={selectedGenreId}
          onChange={(e) => setSelectedGenreId(e.target.value)}
        >
          <option value="">장르 전체</option>
          {seriesGenres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
      </div>
      {error && <div>{error}</div>}
      <div className="flex flex-wrap justify-between gap-y-30">
        {filteredSeries.map((series) => (
          <MovieCard key={series.id} movie={series} />
        ))}
      </div>
      {loading && <div>불러오는 중...</div>}
      {hasMore && <div ref={loaderRef} style={{ height: 1 }} />}
      {!hasMore && list.length > 0 && <div>더 이상 시리즈가 없습니다.</div>}
    </div>
  );
}
