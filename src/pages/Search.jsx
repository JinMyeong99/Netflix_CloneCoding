import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSearchPage } from "../RTK/search/searchThunk";
import useInfiniteScroll from "../hooks/useInfiniteScroll";
import ContentCard from "../components/ContentCard";

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
    <div className="mx-auto max-w-[90%] pb-25">
      <h2 className="text-2xl font-bold my-4">
        검색 결과: {query && <span>"{query}"</span>}
      </h2>
      {error && <div>{error}</div>}
      {!loading && results.length === 0 && query.trim() && !error && (
        <div>검색 결과가 없습니다.</div>
      )}
      <div className="flex flex-wrap gap-x-[7.5px] gap-y-30">
        {results.map((content) => (
          <ContentCard
            key={`${content.media_type}-${content.id}`}
            content={content}
          />
        ))}
      </div>
      {loading && (
        <div className="min-h-screen flex items-center justify-center pb-30">
          검색 중...
        </div>
      )}
      {hasMore && results.length > 0 && (
        <div ref={loaderRef} style={{ height: 1 }} />
      )}
    </div>
  );
}
