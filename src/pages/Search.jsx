import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSearchPage } from "../RTK/search/searchThunk";
import useInfiniteScroll from "../hooks/useInfiniteScroll";
import MovieCard from "../components/Moviecard";

export default function Search() {
  const dispatch = useDispatch();
  const { query, results, loading, hasMore, error } = useSelector(
    (state) => state.search
  );

  const loadMore = useCallback(() => {
    if (!loading && hasMore && query.trim()) {
      dispatch(fetchSearchPage);
    }
  }, [dispatch, loading, hasMore, query]);

  const loaderRef = useInfiniteScroll({
    loading,
    hasMore,
    onLoadMore: loadMore,
  });

  return (
    <div className="text-white">
      <h2>검색 결과: {query && <span>"{query}"</span>}</h2>
      {error && <div>{error}</div>}
      {!loading && results.length === 0 && query.trim() && !error && (
        <div>검색 결과가 없습니다.</div>
      )}
      <div className="flex flex-wrap justify-between">
        {results.map((item) => (
          <MovieCard key={`${item.media_type}-${item.id}`} movie={item} />
        ))}
      </div>
      {loading && <div>검색 중...</div>}
      {hasMore && results.length > 0 && (
        <div ref={loaderRef} style={{ height: 1 }} />
      )}
    </div>
  );
}
