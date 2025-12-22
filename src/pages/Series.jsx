import { useCallback, useEffect, useMemo, useState } from "react";
import useSeriesStore from "../store/useSeriesStore";
import useGenreStore from "../store/useGenreStore";
import GenreSelector from "../components/GenreSelector";
import useContentDetail from "../hooks/useContentDetail";
import useFavorite from "../hooks/useFavorite";
import ContentDetailModal from "../components/ContentDetailModal";
import useGenreName from "../hooks/useGenreName";
import HeroBanner from "../components/HeroBanner";
import useSingleFetch from "../hooks/useSingleFetch";
import ContentGrid from "../components/ContentGrid";

export default function Series() {
  const { list, loading, hasMore, page, error, resetSeries, fetchSeriesPage } =
    useSeriesStore();
  const { seriesGenres } = useGenreStore();

  const runOnce = useSingleFetch(loading);

  const isInitialLoading = page === 0 && list.length === 0;

  useEffect(() => {
    resetSeries();
    fetchSeriesPage();

    return () => {
      resetSeries();
    };
  }, [fetchSeriesPage, resetSeries]);

  const loadMore = useCallback(() => {
    if (!hasMore) return;
    runOnce(() => fetchSeriesPage());
  }, [fetchSeriesPage, hasMore, runOnce]);

  const [selectedGenreId, setSelectedGenreId] = useState("");

  const filteredSeries = useMemo(() => {
    if (!selectedGenreId) return list;
    const genreId = Number(selectedGenreId);
    return list.filter(
      (series) =>
        Array.isArray(series.genre_ids) && series.genre_ids.includes(genreId)
    );
  }, [list, selectedGenreId]);

  const seriesWithGenre = useGenreName(filteredSeries, "series");

  const {
    selectedContent,
    showDetail,
    openDetail,
    closeDetail,
    toggleFavorite,
    openTrailer,
  } = useContentDetail();

  const { favoriteId } = useFavorite();

  const heroContent = seriesWithGenre[0];

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

        {error && <div className="text-red-500 mb-2">{error}</div>}

        <ContentGrid
          contents={seriesWithGenre}
          favoriteSet={favoriteId}
          openDetail={openDetail}
          toggleFavorite={toggleFavorite}
          openTrailer={openTrailer}
          loading={loading}
          hasMore={hasMore}
          onLoadMore={loadMore}
        />

        {loading && !isInitialLoading && (
          <div className="min-h-screen flex items-center justify-center pb-30">
            불러오는 중...
          </div>
        )}
        {!hasMore && list.length > 0 && <div>더 이상 시리즈가 없습니다.</div>}

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
