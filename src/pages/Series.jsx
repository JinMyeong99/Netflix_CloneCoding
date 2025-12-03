import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { seriesSlice } from "../RTK/series/seriesSlice";
import { fetchSeriesPage } from "../RTK/series/seriesThunk";
import useInfiniteScroll from "../hooks/useInfiniteScroll";
import GenreSelector from "../components/GenreSelector";
import ContentCard from "../components/ContentCard";
import useContentDetail from "../hooks/useContentDetail";
import useHoverActive from "../hooks/useHoverActive";
import ContentDetailModal from "../components/ContentDetailModal";
import useGenreName from "../hooks/useGenreName";
import HeroBanner from "../components/HeroBanner";

export default function Series() {
  const dispatch = useDispatch();
  const { list, loading, hasMore, page, error } = useSelector(
    (state) => state.series
  );

  useEffect(() => {
    if (page === 0 && list.length === 0) {
      dispatch(seriesSlice.actions.resetSeries());
      dispatch(fetchSeriesPage());
    }
  }, [dispatch, page, list.length]);

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      dispatch(fetchSeriesPage());
    }
  }, [dispatch, loading, hasMore]);

  const loaderRef = useInfiniteScroll({
    loading,
    hasMore,
    onLoadMore: loadMore,
  });

  const { seriesGenres } = useSelector((state) => state.genre);

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
    playTrailer,
  } = useContentDetail();

  const { hoverContentId, handleMouseEnter, handleMouseLeave } =
    useHoverActive();

  const heroContent = seriesWithGenre[0];

  return (
    <div>
      <HeroBanner
        content={heroContent}
        openDetail={openDetail}
        onPlayTrailer={playTrailer}
      />
      <div className="mx-auto max-w-[90%] pb-[100px]">
        <div className="flex items-center gap-6  mb-5">
          <h2 className="text-4xl">인기 시리즈</h2>

          <GenreSelector
            genres={seriesGenres}
            selectedId={selectedGenreId}
            onChange={setSelectedGenreId}
          />
        </div>

        {error && <div className="text-red-500 mb-2">{error}</div>}

        <div className="flex flex-wrap justify-between gap-y-20">
          {seriesWithGenre.map((series) => (
            <div
              key={series.id}
              onMouseEnter={() => handleMouseEnter(series.id)}
              onMouseLeave={() => handleMouseLeave(series.id)}
            >
              <ContentCard
                content={series}
                openHover={hoverContentId === series.id}
                openDetail={() => openDetail(series)}
                toggleFavorite={toggleFavorite}
                onPlayTrailer={playTrailer}
              />
            </div>
          ))}
        </div>

        {loading && (
          <div className="min-h-screen flex items-center justify-center pb-30">
            불러오는 중...
          </div>
        )}
        {hasMore && <div ref={loaderRef} style={{ height: 1 }} />}
        {!hasMore && list.length > 0 && <div>더 이상 시리즈가 없습니다.</div>}

        {showDetail && selectedContent && (
          <ContentDetailModal
            content={selectedContent}
            onClose={closeDetail}
            toggleFavorite={toggleFavorite}
            onPlayTrailer={playTrailer}
          />
        )}
      </div>
    </div>
  );
}
