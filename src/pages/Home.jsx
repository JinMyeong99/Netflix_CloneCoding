import { useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHomeData } from "../RTK/home/homeThunk";
import SectionRow from "../components/SectionRow";
import ContentDetailModal from "../components/ContentDetailModal";
import useContentDetail from "../hooks/useContentDetail";

export default function Home() {
  const dispatch = useDispatch();

  const {
    popular,
    topRated,
    actionAdventure,
    comedyMovies,
    sciFiFantasy,
    comedySeries,
    loading,
    error,
  } = useSelector((state) => state.home);

  const {
    selectedContent,
    showDetail,
    openDetail,
    closeDetail,
    toggleFavorite,
    playTrailer,
  } = useContentDetail();

  const {
    movieGenres,
    seriesGenres,
    error: genreError,
  } = useSelector((state) => state.genre);

  useEffect(() => {
    dispatch(fetchHomeData());
  }, [dispatch]);

  const genreList = useMemo(() => {
    const list = {};
    movieGenres.forEach((genre) => {
      list[genre.id] = genre.name;
    });
    seriesGenres.forEach((genre) => {
      if (!list[genre.id]) {
        list[genre.id] = genre.name;
      }
    });
    return list;
  }, [movieGenres, seriesGenres]);

  const addGenreName = useCallback(
    (contents) =>
      (contents || []).map((content) => ({
        ...content,
        genre_names:
          content.genre_ids?.map((id) => genreList[id]).filter(Boolean) || [],
      })),
    [genreList]
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pb-30">
        홈 데이터 로딩 중...
      </div>
    );
  }

  if (error || genreError) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center text-red-400">
        에러: {error || genreError}
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="pt-16 pb-10 px-[5%]">
        <SectionRow
          title="지금 가장 인기 있는 영화"
          content={addGenreName(popular)}
          openDetail={openDetail}
          toggleFavorite={toggleFavorite}
          onPlayTrailer={playTrailer}
        />
        <SectionRow
          title="최고 평점 영화"
          content={addGenreName(topRated)}
          openDetail={openDetail}
          toggleFavorite={toggleFavorite}
          onPlayTrailer={playTrailer}
        />
        <SectionRow
          title="액션 ∙ 모험 인기 영화"
          content={addGenreName(actionAdventure)}
          openDetail={openDetail}
          toggleFavorite={toggleFavorite}
          onPlayTrailer={playTrailer}
        />
        <SectionRow
          title="코미디 TOP 콘텐츠"
          content={addGenreName(comedyMovies)}
          openDetail={openDetail}
          toggleFavorite={toggleFavorite}
          onPlayTrailer={playTrailer}
        />
        <SectionRow
          title="SF ∙ 판타지 추천"
          content={addGenreName(sciFiFantasy)}
          openDetail={openDetail}
          toggleFavorite={toggleFavorite}
          onPlayTrailer={playTrailer}
        />
        <SectionRow
          title="코미디 시리즈"
          content={addGenreName(comedySeries)}
          openDetail={openDetail}
          toggleFavorite={toggleFavorite}
          onPlayTrailer={playTrailer}
        />
      </div>

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
