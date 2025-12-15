import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSearchPage } from "../RTK/search/searchThunk";
import useInfiniteScroll from "../hooks/useInfiniteScroll";
import useContentDetail from "../hooks/useContentDetail";
import useGenreName from "../hooks/useGenreName";
import useFavorite from "../hooks/useFavorite";
import ContentDetailModal from "../components/ContentDetailModal";
import useSingleFetch from "../hooks/useSingleFetch";
import ContentGrid from "../components/ContentGrid";

export default function Search() {
  const dispatch = useDispatch();
  const { query, results, loading, hasMore, error } = useSelector(
    (state) => state.search
  );

  const runOnce = useSingleFetch(loading);

  const loadMore = useCallback(() => {
    if (!hasMore) return;
    if (!query.trim()) return;
    runOnce(() => dispatch(fetchSearchPage(query)));
  }, [dispatch, hasMore, query, runOnce]);

  const loaderRef = useInfiniteScroll({
    loading,
    hasMore,
    onLoadMore: loadMore,
  });

  const resultsWithGenre = useGenreName(results, "auto");

  const {
    selectedContent,
    showDetail,
    openDetail,
    closeDetail,
    toggleFavorite,
    playTrailer,
  } = useContentDetail();

  const { favoriteId } = useFavorite();

  return (
    <div className="mx-auto max-w-[90%] pb-25 pt-16">
      <h2 className="text-2xl font-bold my-5">
        검색 결과: {query && <span>"{query}"</span>}
      </h2>
      {error && <div>{error}</div>}
      {!loading && results.length === 0 && query.trim() && !error && (
        <div>검색 결과가 없습니다.</div>
      )}
      <ContentGrid
        items={resultsWithGenre}
        favoriteSet={favoriteId}
        openDetail={openDetail}
        toggleFavorite={toggleFavorite}
        onPlayTrailer={playTrailer}
        keyExtractor={(item) => `${item.media_type}-${item.id}`}
      />
      {loading && (
        <div className="min-h-screen flex items-center justify-center pb-30">
          검색 중...
        </div>
      )}
      {hasMore && results.length > 0 && (
        <div ref={loaderRef} style={{ height: 1 }} />
      )}

      {showDetail && selectedContent && (
        <ContentDetailModal
          content={selectedContent}
          onClose={closeDetail}
          toggleFavorite={toggleFavorite}
          onPlayTrailer={playTrailer}
        />
      )}
    </div>
  );
}
