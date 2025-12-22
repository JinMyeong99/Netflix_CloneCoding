import { useCallback, useEffect, useMemo, useState } from "react";
import useMovieStore from "../store/useMovieStore";
import useGenreStore from "../store/useGenreStore";
import GenreSelector from "../components/GenreSelector";
import useGenreName from "../hooks/useGenreName";
import useContentDetail from "../hooks/useContentDetail";
import useFavorite from "../hooks/useFavorite";
import ContentDetailModal from "../components/ContentDetailModal";
import HeroBanner from "../components/HeroBanner";
import useSingleFetch from "../hooks/useSingleFetch";
import ContentGrid from "../components/ContentGrid";

export default function Movie() {
  const { list, loading, hasMore, page, error, resetMovie, fetchMoviePage } =
    useMovieStore();
  const { movieGenres } = useGenreStore();

  const runOnce = useSingleFetch(loading);

  const isInitialLoading = page === 0 && list.length === 0;

  useEffect(() => {
    resetMovie();
    fetchMoviePage();

    return () => {
      resetMovie();
    };
  }, [fetchMoviePage, resetMovie]);

  const loadMore = useCallback(() => {
    if (!hasMore) return;
    runOnce(() => fetchMoviePage());
  }, [fetchMoviePage, hasMore, runOnce]);

  const [selectedGenreId, setSelectedGenreId] = useState("");

  const filteredMovies = useMemo(() => {
    if (!selectedGenreId) return list;
    const genreId = Number(selectedGenreId);

    return list.filter(
      (movie) =>
        Array.isArray(movie.genre_ids) && movie.genre_ids.includes(genreId)
    );
  }, [list, selectedGenreId]);

  const moviesWithGenres = useGenreName(filteredMovies, "movie");

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

        {error && <div className="text-red-500 mb-2">{error}</div>}

        <ContentGrid
          contents={moviesWithGenres}
          favoriteSet={favoriteId}
          openDetail={openDetail}
          toggleFavorite={toggleFavorite}
          openTrailer={openTrailer}
          loading={loading}
          hasMore={hasMore}
          onLoadMore={loadMore}
        />

        {loading && !isInitialLoading && (
          <div className="min-h-screen flex items-center justify-center">
            불러오는 중...
          </div>
        )}
        {!hasMore && list.length > 0 && <div>더 이상 영화가 없습니다.</div>}

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
