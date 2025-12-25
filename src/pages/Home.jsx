import useHomeDataQuery from "../hooks/queries/useHomeDataQuery";
import Carousel from "../components/Carousel";
import ContentDetailModal from "../components/ContentDetailModal";
import useContentDetail from "../hooks/useContentDetail";
import useGenreName from "../hooks/useGenreName";
import HeroBanner from "../components/HeroBanner";
import useHeroQuery from "../hooks/queries/useHeroQuery";

export default function Home() {
  const { data: heroData } = useHeroQuery();
  const { data, isLoading, error } = useHomeDataQuery();

  const popularMovie = useGenreName(data?.popular ?? [], "movie");
  const topRatedMovie = useGenreName(data?.topRated ?? [], "movie");
  const actionAdventureMovie = useGenreName(
    data?.actionAdventure ?? [],
    "movie"
  );
  const comedyMovie = useGenreName(data?.comedy ?? [], "movie");
  const sciFiFantasyMovie = useGenreName(data?.sciFiFantasy ?? [], "movie");

  const heroWithGenre = useGenreName(heroData ? [heroData] : [], "movie")[0];
  const heroContent = heroWithGenre || popularMovie[0];

  const {
    selectedContent,
    showDetail,
    openDetail,
    closeDetail,
    toggleFavorite,
    openTrailer,
  } = useContentDetail();

  if (error) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center text-red-400">
        에러: {error.message}
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
        {isLoading && (
          <div className="text-neutral-300 mb-3">콘텐츠 로딩 중...</div>
        )}
        <Carousel
          title="지금 가장 인기 있는 영화"
          content={popularMovie}
          openDetail={openDetail}
          toggleFavorite={toggleFavorite}
          openTrailer={openTrailer}
        />
        <Carousel
          title="최고 평점 영화"
          content={topRatedMovie}
          openDetail={openDetail}
          toggleFavorite={toggleFavorite}
          openTrailer={openTrailer}
        />
        <Carousel
          title="액션 ∙ 모험 인기 영화"
          content={actionAdventureMovie}
          openDetail={openDetail}
          toggleFavorite={toggleFavorite}
          openTrailer={openTrailer}
        />
        <Carousel
          title="코미디 TOP 콘텐츠"
          content={comedyMovie}
          openDetail={openDetail}
          toggleFavorite={toggleFavorite}
          openTrailer={openTrailer}
        />
        <Carousel
          title="SF ∙ 판타지 추천"
          content={sciFiFantasyMovie}
          openDetail={openDetail}
          toggleFavorite={toggleFavorite}
          openTrailer={openTrailer}
        />
      </div>

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
