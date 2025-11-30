import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { seriesSlice } from "../RTK/series/seriesSlice";
import { fetchSeriesPage } from "../RTK/series/seriesThunk";
import useInfiniteScroll from "../hooks/useInfiniteScroll";
import MovieCard from "../components/MovieCard";
import GenreSelector from "../components/GenreSelector";

export default function Series() {
  const dispatch = useDispatch();
  const { list, loading, hasMore, page, error } = useSelector(
    (state) => state.series
  );

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

  const { seriesGenres } = useSelector((state) => state.genre);

  const [selectedGenreId, setSelectedGenreId] = useState("");

  const filteredSeries = useMemo(() => {
    if (!selectedGenreId) return list;
    const genreId = Number(selectedGenreId);
    return list.filter(
      (series) =>
        Array.isArray(series.genre_ids) && series.genre_ids.includes(genreId)
    );
  }, [list, selectedGenreId]);

  return (
    <div className="mx-auto max-w-[90%] pb-[100px]">
      <div className="flex items-center gap-6 my-5">
        <h2 className="text-4xl">인기 시리즈</h2>

        <GenreSelector
          genres={seriesGenres}
          selectedId={selectedGenreId}
          onChange={setSelectedGenreId}
        />
      </div>

      {error && <div className="text-red-500 mb-2">{error}</div>}

      <div className="flex flex-wrap justify-between gap-y-20">
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
