import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHomeData } from "../RTK/home/homeThunk";
import SectionRow from "../components/SectionRow";
import ContentDetailModal from "../components/ContentDetailModal";
import useContentDetail from "../hooks/useContentDetail";
import useGenreName from "../hooks/useGenreName";

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

  const { error: genreError } = useSelector((state) => state.genre);

  useEffect(() => {
    dispatch(fetchHomeData());
  }, [dispatch]);

  const popularWithGenre = useGenreName(popular, "mixed");
  const topRatedWithGenre = useGenreName(topRated, "mixed");
  const actionAdventureWithGenre = useGenreName(actionAdventure, "mixed");
  const comedyMoviesWithGenre = useGenreName(comedyMovies, "mixed");
  const sciFiFantasyWithGenre = useGenreName(sciFiFantasy, "mixed");
  const comedySeriesWithGenre = useGenreName(comedySeries, "mixed");

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
          content={popularWithGenre}
          openDetail={openDetail}
          toggleFavorite={toggleFavorite}
          onPlayTrailer={playTrailer}
        />
        <SectionRow
          title="최고 평점 영화"
          content={topRatedWithGenre}
          openDetail={openDetail}
          toggleFavorite={toggleFavorite}
          onPlayTrailer={playTrailer}
        />
        <SectionRow
          title="액션 ∙ 모험 인기 영화"
          content={actionAdventureWithGenre}
          openDetail={openDetail}
          toggleFavorite={toggleFavorite}
          onPlayTrailer={playTrailer}
        />
        <SectionRow
          title="코미디 TOP 콘텐츠"
          content={comedyMoviesWithGenre}
          openDetail={openDetail}
          toggleFavorite={toggleFavorite}
          onPlayTrailer={playTrailer}
        />
        <SectionRow
          title="SF ∙ 판타지 추천"
          content={sciFiFantasyWithGenre}
          openDetail={openDetail}
          toggleFavorite={toggleFavorite}
          onPlayTrailer={playTrailer}
        />
        <SectionRow
          title="코미디 시리즈"
          content={comedySeriesWithGenre}
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
