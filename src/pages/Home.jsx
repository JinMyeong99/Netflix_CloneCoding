import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHomeData } from "../RTK/home/homeThunk";
import SectionRow from "../components/SectionRow";

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

  useEffect(() => {
    dispatch(fetchHomeData());
  }, [dispatch]);

  const isInitialLoading =
    loading &&
    !popular.length &&
    !topRated.length &&
    !actionAdventure.length &&
    !comedyMovies.length &&
    !sciFiFantasy.length &&
    !comedySeries.length;

  if (isInitialLoading) {
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
        {popular.length > 0 && (
          <SectionRow title="지금 가장 인기 있는 영화" items={popular} />
        )}

        {topRated.length > 0 && (
          <SectionRow title="최고 평점 영화" items={topRated} />
        )}

        {actionAdventure.length > 0 && (
          <SectionRow title="액션 / 모험 인기 영화" items={actionAdventure} />
        )}

        {comedyMovies.length > 0 && (
          <SectionRow title="코미디 TOP 콘텐츠" items={comedyMovies} />
        )}

        {sciFiFantasy.length > 0 && (
          <SectionRow title="SF / 판타지 추천" items={sciFiFantasy} />
        )}

        {comedySeries.length > 0 && (
          <SectionRow title="코미디 시리즈" items={comedySeries} />
        )}
      </div>
    </div>
  );
}
