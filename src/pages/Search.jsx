import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSearchPage } from "../RTK/search/searchThunk";
import useInfiniteScroll from "../hooks/useInfiniteScroll";
import ContentCard from "../components/ContentCard";
import useContentDetail from "../hooks/useContentDetail";
import useHoverActive from "../hooks/useHoverActive";
import useGenreName from "../hooks/useGenreName";
import useFavorite from "../hooks/useFavorite";
import ContentDetailModal from "../components/ContentDetailModal";

export default function Search() {
  const dispatch = useDispatch();
  const { query, results, loading, hasMore, error } = useSelector(
    (state) => state.search
  );

  const loadMore = useCallback(() => {
    if (!loading && hasMore && query.trim()) {
      dispatch(fetchSearchPage());
    }
  }, [dispatch, loading, hasMore, query]);

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

  const { hoverContentId, handleMouseEnter, handleMouseLeave } =
    useHoverActive();
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
      <div className="flex flex-wrap gap-x-[7.5px] gap-y-30">
        {resultsWithGenre.map((content) => (
          <div
            key={`${content.media_type}-${content.id}`}
            onMouseEnter={() => handleMouseEnter(content.id)}
            onMouseLeave={() => handleMouseLeave(content.id)}
          >
            <ContentCard
              content={content}
              isFavorite={favoriteId.has(content.id)}
              openHover={hoverContentId === content.id}
              openDetail={openDetail}
              toggleFavorite={toggleFavorite}
              onPlayTrailer={playTrailer}
            />
          </div>
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
