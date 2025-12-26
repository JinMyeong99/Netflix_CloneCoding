import { useCallback, useMemo, useState } from "react";
import GenreSelector from "../components/GenreSelector";
import useContentDetail from "../hooks/useContentDetail";
import useFavorite from "../hooks/useFavorite";
import useGenreName from "../hooks/useGenreName";
import HeroBanner from "../components/HeroBanner";
import ContentGrid from "../components/ContentGrid";
import useDiscoverInfiniteQuery from "../hooks/queries/useDiscoverInfiniteQuery";
import useGenresQuery from "../hooks/queries/useGenresQuery";

export default function Series() {
  const { data: genreData } = useGenresQuery();
  const seriesGenres = genreData?.seriesGenres ?? [];

  const [selectedGenreId, setSelectedGenreId] = useState("");

  const {
    data,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    error,
  } = useDiscoverInfiniteQuery({
    type: "tv",
    genreId: selectedGenreId || undefined,
  });

  const series = useMemo(
    () => data?.pages?.flatMap((page) => page.contents) ?? [],
    [data]
  );

  const isInitialLoading = isLoading && series.length === 0;
  const loading = isLoading || isFetchingNextPage;

  const loadMore = useCallback(() => {
    if (!hasNextPage) return;
    fetchNextPage();
  }, [fetchNextPage, hasNextPage]);

  const seriesWithGenre = useGenreName(series, "series");

  const {
    openDetail,
    toggleFavorite,
    openTrailer,
  } = useContentDetail();

  const { favoriteId } = useFavorite();

  const heroContent = seriesWithGenre[0];
  const errorMessage = error?.message;

  if (isInitialLoading && loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        인기 시리즈 로딩 중...
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
        <div className="flex items-center gap-6  mb-5">
          <h2 className="text-4xl">인기 시리즈</h2>

          <GenreSelector
            genres={seriesGenres}
            selectedId={selectedGenreId}
            selectedGenre={setSelectedGenreId}
          />
        </div>

        {errorMessage && (
          <div className="text-red-500 mb-2">{errorMessage}</div>
        )}

        <ContentGrid
          contents={seriesWithGenre}
          favoriteSet={favoriteId}
          openDetail={openDetail}
          toggleFavorite={toggleFavorite}
          openTrailer={openTrailer}
          loading={loading}
          hasMore={hasNextPage}
          onLoadMore={loadMore}
        />

        {loading && !isInitialLoading && (
          <div className="min-h-screen flex items-center justify-center pb-30">
            불러오는 중...
          </div>
        )}
        {!hasNextPage && series.length > 0 && (
          <div>더 이상 시리즈가 없습니다.</div>
        )}
      </div>
    </div>
  );
}
