import { useCallback, useMemo, useState } from "react";
import GenreSelector from "../components/GenreSelector";
import useGenreName from "../hooks/useGenreName";
import useContentDetail from "../hooks/useContentDetail";
import useFavorite from "../hooks/useFavorite";
import ContentDetailModal from "../components/ContentDetailModal";
import HeroBanner from "../components/HeroBanner";
import ContentGrid from "../components/ContentGrid";
import useDiscoverInfiniteQuery from "../hooks/queries/useDiscoverInfiniteQuery";
import useGenresQuery from "../hooks/queries/useGenresQuery";

export default function Movie() {
  const { data: genreData } = useGenresQuery();
  const movieGenres = genreData?.movieGenres ?? [];

  const [selectedGenreId, setSelectedGenreId] = useState("");

  const {
    data,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    error,
  } = useDiscoverInfiniteQuery({
    type: "movie",
    genreId: selectedGenreId || undefined,
  });

  const movies = useMemo(
    () => data?.pages?.flatMap((page) => page.contents) ?? [],
    [data]
  );

  const isInitialLoading = isLoading && movies.length === 0;
  const loading = isLoading || isFetchingNextPage;

  const loadMore = useCallback(() => {
    if (!hasNextPage) return;
    fetchNextPage();
  }, [fetchNextPage, hasNextPage]);

  const moviesWithGenres = useGenreName(movies, "movie");

  const { favoriteId } = useFavorite();

  const {
    selectedContent,
    showDetail,
    openDetail,
    closeDetail,
    toggleFavorite,
    openTrailer,
  } = useContentDetail();

  const heroContent = moviesWithGenres[0];
  const errorMessage = error?.message;

  if (isInitialLoading && loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        인기 영화 로딩 중...
      </div>
    );
  }

  return (
    <div>
      <HeroBanner
        content={heroContent}
        openDetail={openDetail}
        openTrailer={openTrailer}
      />
      <div className="mx-auto max-w-[90%] pb-25">
        <div className="flex items-center gap-6 pb-5">
          <h2 className="text-4xl ">인기 영화</h2>
          <GenreSelector
            genres={movieGenres}
            selectedId={selectedGenreId}
            selectedGenre={setSelectedGenreId}
          />
        </div>

        {errorMessage && (
          <div className="text-red-500 mb-2">{errorMessage}</div>
        )}

        <ContentGrid
          contents={moviesWithGenres}
          favoriteSet={favoriteId}
          openDetail={openDetail}
          toggleFavorite={toggleFavorite}
          openTrailer={openTrailer}
          loading={loading}
          hasMore={hasNextPage}
          onLoadMore={loadMore}
        />

        {loading && !isInitialLoading && (
          <div className="min-h-screen flex items-center justify-center">
            불러오는 중...
          </div>
        )}
        {!hasNextPage && movies.length > 0 && (
          <div>더 이상 영화가 없습니다.</div>
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
    </div>
  );
}
