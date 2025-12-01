import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHomeData } from "../RTK/home/homeThunk";
import SectionRow from "../components/SectionRow";
import ContentDetailModal from "../components/ContentDetailModal";

export default function Home() {
  const dispatch = useDispatch();

  const [selectedContent, setSelectedContent] = useState(null);
  const [showDetail, setShowDetail] = useState(false);

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

  useEffect(() => {
    dispatch(fetchHomeData());
  }, [dispatch]);

  const openDetail = (content) => {
    setSelectedContent(content);
    setShowDetail(true);
  };
  const closeDetail = () => {
    setShowDetail(false);
    setSelectedContent(null);
  };

  useEffect(() => {
    if (showDetail) {
      const homeScroll = document.body.style.overflow;
      document.body.style.overflow = "hidden";

      return () => {
        document.body.style.overflow = homeScroll;
      };
    }
  }, [showDetail]);

  const toggleFavorite = (content) => {
    console.log("찜 토글:", content.id, content.title || content.name);
  };

  if (loading) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center text-white">
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
    <div className="text-white min-h-screen">
      <div className="pt-16 pb-10 space-y-8 px-[5%]">
        <SectionRow
          title="지금 가장 인기 있는 영화"
          content={popular}
          openDetail={openDetail}
          toggleFavorite={toggleFavorite}
        />
        <SectionRow
          title="최고 평점 영화"
          content={topRated}
          openDetail={openDetail}
          toggleFavorite={toggleFavorite}
        />
        <SectionRow
          title="액션 ∙ 모험 인기 영화"
          content={actionAdventure}
          openDetail={openDetail}
          toggleFavorite={toggleFavorite}
        />
        <SectionRow
          title="코미디 TOP 콘텐츠"
          content={comedyMovies}
          openDetail={openDetail}
          toggleFavorite={toggleFavorite}
        />
        <SectionRow
          title="SF ∙ 판타지 추천"
          content={sciFiFantasy}
          openDetail={openDetail}
          toggleFavorite={toggleFavorite}
        />
        <SectionRow
          title="코미디 시리즈"
          content={comedySeries}
          openDetail={openDetail}
          toggleFavorite={toggleFavorite}
        />
      </div>
      {showDetail && selectedContent && (
        <ContentDetailModal
          content={selectedContent}
          onClose={closeDetail}
          toggleFavorite={toggleFavorite}
        />
      )}
    </div>
  );
}
