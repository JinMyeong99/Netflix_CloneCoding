import useTrendingQuery from "../hooks/queries/useTrendingQuery";
import Carousel from "../components/Carousel";
import useContentDetail from "../hooks/useContentDetail";
import useGenreName from "../hooks/useGenreName";
import HeroBanner from "../components/HeroBanner";

export default function Trending() {
  const { data, isLoading, error } = useTrendingQuery();

  const { openDetail, toggleFavorite, openTrailer } = useContentDetail();

  const todayWithGenre = useGenreName(data?.today ?? [], "auto");
  const weekWithGenre = useGenreName(data?.week ?? [], "auto");
  const risingWithGenre = useGenreName(data?.rising ?? [], "auto");
  const hotWithGenre = useGenreName(data?.hot ?? [], "auto");

  const heroContent = weekWithGenre[0];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        트렌드 데이터 로딩 중...
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center text-red-400">
        에러: {error.message}
      </div>
    );
  }

  return (
    <div className="text-white min-h-screen">
      <HeroBanner
        content={heroContent}
        openDetail={openDetail}
        openTrailer={openTrailer}
      />
      <div className="pb-10 px-[5%]">
        <Carousel
          title="오늘의 트렌드 Top 콘텐츠"
          content={todayWithGenre}
          openDetail={openDetail}
          toggleFavorite={toggleFavorite}
          openTrailer={openTrailer}
        />
        <Carousel
          title="이번 주 트렌드 Top 콘텐츠"
          content={weekWithGenre}
          openDetail={openDetail}
          toggleFavorite={toggleFavorite}
          openTrailer={openTrailer}
        />
        <Carousel
          title="급상승 인기 콘텐츠"
          content={risingWithGenre}
          openDetail={openDetail}
          toggleFavorite={toggleFavorite}
          openTrailer={openTrailer}
        />
        <Carousel
          title="지금 화제가 되는 콘텐츠"
          content={hotWithGenre}
          openDetail={openDetail}
          toggleFavorite={toggleFavorite}
          openTrailer={openTrailer}
        />
      </div>
    </div>
  );
}
