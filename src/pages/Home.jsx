import { useEffect } from "react";
import useHomeStore from "../store/useHomeStore";
import SectionRow from "../components/SectionRow";
import ContentDetailModal from "../components/ContentDetailModal";
import useContentDetail from "../hooks/useContentDetail";
import useGenreName from "../hooks/useGenreName";
import HeroBanner from "../components/HeroBanner";

export default function Home() {
  const {
    popular,
    topRated,
    actionAdventure,
    comedyMovies,
    sciFiFantasy,
    loading,
    error,
    fetchHomeData,
  } = useHomeStore();

  useEffect(() => {
    fetchHomeData();
  }, [fetchHomeData]);

  const popularWithGenre = useGenreName(popular, "movie");
  const topRatedWithGenre = useGenreName(topRated, "movie");
  const actionAdventureWithGenre = useGenreName(actionAdventure, "movie");
  const comedyMoviesWithGenre = useGenreName(comedyMovies, "movie");
  const sciFiFantasyWithGenre = useGenreName(sciFiFantasy, "movie");

  const heroContent = popularWithGenre[0];

  const {
    selectedContent,
    showDetail,
    openDetail,
    closeDetail,
    toggleFavorite,
    openTrailer,
  } = useContentDetail();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        홈 데이터 로딩 중...
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center text-red-400">
        에러: {error}
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
      <div className="pb-10 px-[5%]">
        <SectionRow
          title="지금 가장 인기 있는 영화"
          content={popularWithGenre}
          openDetail={openDetail}
          toggleFavorite={toggleFavorite}
          openTrailer={openTrailer}
        />
        <SectionRow
          title="최고 평점 영화"
          content={topRatedWithGenre}
          openDetail={openDetail}
          toggleFavorite={toggleFavorite}
          openTrailer={openTrailer}
        />
        <SectionRow
          title="액션 ∙ 모험 인기 영화"
          content={actionAdventureWithGenre}
          openDetail={openDetail}
          toggleFavorite={toggleFavorite}
          openTrailer={openTrailer}
        />
        <SectionRow
          title="코미디 TOP 콘텐츠"
          content={comedyMoviesWithGenre}
          openDetail={openDetail}
          toggleFavorite={toggleFavorite}
          openTrailer={openTrailer}
        />
        <SectionRow
          title="SF ∙ 판타지 추천"
          content={sciFiFantasyWithGenre}
          openDetail={openDetail}
          toggleFavorite={toggleFavorite}
          openTrailer={openTrailer}
        />
      </div>

      {showDetail && selectedContent && (
        <ContentDetailModal
          content={selectedContent}
          onClose={closeDetail}
          toggleFavorite={toggleFavorite}
          openTrailer={openTrailer}
        />
      )}
    </div>
  );
}
