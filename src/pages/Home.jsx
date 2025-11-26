import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHomeData } from "../RTK/home/homeThunk";
import SectionRow from "../components/SectionRow";

export default function Home() {
  const dispatch = useDispatch();
  const { popular, topRated, upcoming, trending, loading, error } = useSelector(
    (state) => state.home
  );

  useEffect(() => {
    dispatch(fetchHomeData());
  }, [dispatch]);

  if (
    loading &&
    !popular.length &&
    !topRated.length &&
    !upcoming.length &&
    !trending.length
  ) {
    return <div className="pt-16 text-center">홈 데이터 로딩 중...</div>;
  }
  if (error) {
    return <div className="pt-16 text-center">에러: {error}</div>;
  }

  return (
    <div className="text-white min-h-screen">
      <div className="pt-16 pb-10 space-y-8 px-[4%]">
        <SectionRow title="지금 가장 인기 있는 영화는?" items={popular} />
        <SectionRow title="높은 평점의 영화" items={topRated} />
        <SectionRow title="개봉 예정 작품" items={upcoming} />
        <SectionRow title="이번 주 트렌드는?" items={trending} />
      </div>
    </div>
  );
}
