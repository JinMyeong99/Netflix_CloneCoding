// src/pages/Trending.jsx
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTrendingData } from "../RTK/trending/trendingThunk";
import SectionRow from "../components/SectionRow";

export default function Trending() {
  const dispatch = useDispatch();
  const { today, week, rising, hot, loading, error } = useSelector(
    (state) => state.trending
  );

  useEffect(() => {
    dispatch(fetchTrendingData());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center text-white">
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
      <div className="pt-16 pb-10 space-y-8 px-[5%]">
        <SectionRow title="오늘의 트렌드 Top 콘텐츠" content={today} />
        <SectionRow title="이번 주 트렌드 Top 콘텐츠" content={week} />
        <SectionRow title="급상승 인기 콘텐츠" content={rising} />
        <SectionRow title="지금 화제가 되는 콘텐츠" content={hot} />
      </div>
    </div>
  );
}
