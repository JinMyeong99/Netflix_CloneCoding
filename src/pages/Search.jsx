import { useCallback } from "react";
import { shallow } from "zustand/shallow";
import useContentDetail from "../hooks/useContentDetail";
import useGenreName from "../hooks/useGenreName";
import useFavorite from "../hooks/useFavorite";
import ContentDetailModal from "../components/ContentDetailModal";
import useSingleFetch from "../hooks/useSingleFetch";
import ContentGrid from "../components/ContentGrid";
import useSearchStore from "../store/useSearchStore";

export default function Search() {
  const state = useSearchStore((state) => state, shallow);
  const { query, results, loading, hasMore, error, fetchSearchPage } = state;

  const runOnce = useSingleFetch(loading);

  const loadMore = useCallback(() => {
    if (!hasMore) return;
    if (!query.trim()) return;
    runOnce(() => fetchSearchPage());
  }, [hasMore, query, runOnce, fetchSearchPage]);

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
      <h2 className="text-2xl md:text-3xl font-bold my-5">
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
        playTrailer={playTrailer}
        loading={loading}
        hasMore={hasMore}
        onLoadMore={loadMore} // Restored loadMore
        keyExtractor={(item) => `${item.media_type}-${item.id}`}
      />
      {loading && (
        <div className="min-h-screen flex items-center justify-center pb-30">
          검색 중...
        </div>
      )}

      {showDetail && selectedContent && (
        <ContentDetailModal
          content={selectedContent}
          onClose={closeDetail}
          toggleFavorite={toggleFavorite}
          playTrailer={playTrailer}
        />
      )}
    </div>
  );
}
