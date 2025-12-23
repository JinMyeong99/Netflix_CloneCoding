import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import useContentDetail from "../hooks/useContentDetail";
import useGenreName from "../hooks/useGenreName";
import useFavorite from "../hooks/useFavorite";
import ContentDetailModal from "../components/ContentDetailModal";
import ContentGrid from "../components/ContentGrid";
import useSearchInfinite from "../hooks/queries/useSearchInfinite";

export default function Search() {
  const [searchParams] = useSearchParams();
  const query = (searchParams.get("q") || "").trim();

  const {
    data,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    error,
  } = useSearchInfinite(query);

  const results = useMemo(() => {
    if (!data?.pages) return [];
    const seenKeys = new Set();

    return data.pages
      .flatMap((page) => page.contents)
      .filter((content) => {
        const key = `${content.media_type || "auto"}-${content.id}`;
        if (seenKeys.has(key)) return false;
        seenKeys.add(key);
        return true;
      });
  }, [data]);

  const loading = isLoading || isFetchingNextPage;

  const loadMore = useCallback(() => {
    if (!hasNextPage) return;
    fetchNextPage();
  }, [fetchNextPage, hasNextPage]);

  const resultsWithGenre = useGenreName(results, "auto");

  const {
    selectedContent,
    showDetail,
    openDetail,
    closeDetail,
    toggleFavorite,
    openTrailer,
  } = useContentDetail();

  const { favoriteId } = useFavorite();

  return (
    <div className="mx-auto max-w-[90%] pb-25 pt-16">
      <h2 className="text-2xl md:text-3xl font-bold my-5">
        검색 결과: {query && <span>"{query}"</span>}
      </h2>
      {error && <div>{error.message}</div>}
      {!loading && results.length === 0 && query && !error && (
        <div>검색 결과가 없습니다.</div>
      )}
      <ContentGrid
        contents={resultsWithGenre}
        favoriteSet={favoriteId}
        openDetail={openDetail}
        toggleFavorite={toggleFavorite}
        openTrailer={openTrailer}
        loading={loading}
        hasMore={hasNextPage}
        onLoadMore={loadMore}
        keyExtractor={(content) => `${content.media_type}-${content.id}`}
      />
      {loading && (
        <div className="min-h-screen flex items-center justify-center pb-60">
          검색 중...
        </div>
      )}

      {showDetail && selectedContent && (
        <ContentDetailModal
          content={selectedContent}
          closeDetail={closeDetail}
          toggleFavorite={toggleFavorite}
          openTrailer={openTrailer}
        />
      )}
    </div>
  );
}
