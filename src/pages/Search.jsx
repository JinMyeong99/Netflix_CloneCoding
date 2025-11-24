import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { searchSlice } from "../RTK/search/searchSlice";
import { fetchSearchPage } from "../RTK/search/searchThunk";
import useInfiniteScroll from "../hooks/useInfiniteScroll";
import MovieCard from "../components/Moviecard";

export default function Search() {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const urlQuery = searchParams.get("q") || "";
  const { query, results, loading, hasMore, error } = useSelector(
    (state) => state.search
  );

  useEffect(() => {
    const searchValue = urlQuery.trim();

    if (!searchValue) {
      dispatch(searchSlice.actions.resetSearch());
      return;
    }
    if (searchValue !== query) {
      dispatch(searchSlice.actions.resetSearch());
      dispatch(searchSlice.actions.setQuery(searchValue));
      dispatch(fetchSearchPage());
    }
  }, [dispatch, urlQuery, query]);

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      dispatch(fetchSearchPage());
    }
  }, [dispatch, loading, hasMore]);

  const loaderRef = useInfiniteScroll({
    loading,
    hasMore,
    onLoadMore: loadMore,
  });
  return (
    <div>
      <h2>검색결과</h2>
      {error && <div>{error}</div>}
      {!loading && results.length === 0 && urlQuery.trim() && !error && (
        <div>검색 결과가 없습니다.</div>
      )}

      <div>
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
