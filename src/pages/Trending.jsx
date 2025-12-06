import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTrendingData } from "../RTK/trending/trendingThunk";
import SectionRow from "../components/SectionRow";
import useContentDetail from "../hooks/useContentDetail";
import useGenreName from "../hooks/useGenreName";
import ContentDetailModal from "../components/ContentDetailModal";
import HeroBanner from "../components/HeroBanner";

export default function Trending() {
  const dispatch = useDispatch();
  const { today, week, rising, hot, loading, error } = useSelector(
    (state) => state.trending
  );

  useEffect(() => {
    dispatch(fetchTrendingData());
  }, [dispatch]);

  const {
    selectedContent,
    showDetail,
    openDetail,
    closeDetail,
    toggleFavorite,
    playTrailer,
  } = useContentDetail();

  const todayWithGenre = useGenreName(today, "auto");
  const weekWithGenre = useGenreName(week, "auto");
  const risingWithGenre = useGenreName(rising, "auto");
  const hotWithGenre = useGenreName(hot, "auto");

  const heroContent = weekWithGenre[0];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pb-30">
        트렌드 데이터 로딩 중...
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
    <div className="text-white min-h-screen">
      <HeroBanner
        content={heroContent}
        openDetail={openDetail}
        onPlayTrailer={playTrailer}
      />
      <div className="pb-10 px-[5%]">
        <SectionRow
          title="오늘의 트렌드 Top 콘텐츠"
          content={todayWithGenre}
          openDetail={openDetail}
          toggleFavorite={toggleFavorite}
          onPlayTrailer={playTrailer}
        />
        <SectionRow
          title="이번 주 트렌드 Top 콘텐츠"
          content={weekWithGenre}
          openDetail={openDetail}
          toggleFavorite={toggleFavorite}
          onPlayTrailer={playTrailer}
        />
        <SectionRow
          title="급상승 인기 콘텐츠"
          content={risingWithGenre}
          openDetail={openDetail}
          toggleFavorite={toggleFavorite}
          onPlayTrailer={playTrailer}
        />
        <SectionRow
          title="지금 화제가 되는 콘텐츠"
          content={hotWithGenre}
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
