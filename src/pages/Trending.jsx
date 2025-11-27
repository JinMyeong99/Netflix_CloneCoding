import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { trendingSlice } from "../RTK/trending/trendingSlice";
import { fetchTrendingPage } from "../RTK/trending/trendingThunk";
import useInfiniteScroll from "../hooks/useInfiniteScroll";
import MovieCard from "../components/MovieCard";

export default function Trending() {
  const dispatch = useDispatch();
  const { list, loading, hasMore, page, error } = useSelector(
    (state) => state.trending
  );

  useEffect(() => {
    if (page === 0 && list.length === 0) {
      dispatch(trendingSlice.actions.resetTrending());
      dispatch(fetchTrendingPage());
    }
  }, [dispatch, page, list.length]);

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      dispatch(fetchTrendingPage());
    }
  }, [dispatch, loading, hasMore]);

  const loaderRef = useInfiniteScroll({
    loading,
    hasMore,
    onLoadMore: loadMore,
  });
  return (
    <div className="mx-auto max-w-[90%]">
      <h2 className="text-4xl font-bold my-4">이번 주 트렌드 목록</h2>
      {error && <div>{error}</div>}

      <div className="flex flex-wrap justify-between gap-y-30">
        {list.map((item) => (
          <MovieCard key={`${item.media_type}-${item.id}`} movie={item} />
        ))}
      </div>
      {loading && <div>불러오는 중...</div>}
      {hasMore && <div ref={loaderRef} style={{ height: 1 }} />}
      {!hasMore && list.length > 0 && <div>더 이상 트렌드가 없습니다.</div>}
    </div>
  );
}
