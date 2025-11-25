import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHomeData } from "../RTK/home/homeThunk";
import SectionRow from "../components/SectionRow";

export default function Home() {
  const dispatch = useDispatch();
  const { popular, topRated, upComing, trending, loading, error } = useSelector(
    (state) => state.home
  );

  useEffect(() => {
    dispatch(fetchHomeData());
  }, [dispatch]);

  if (
    loading &&
    !popular.length &&
    !topRated.length &&
    !upComing.length &&
    !trending.length
  ) {
    return <div>홈 데이터 로딩 중...</div>;
  }
  if (error) {
    return <div>에러: {error}</div>;
  }

  return (
    <div className="text-white">
      <div>
        <SectionRow title="인기 영화" items={popular} />
        <SectionRow title="높은 평점 영화" items={topRated} />
        <SectionRow title="개봉 예정 영화" items={upComing} />
        <SectionRow title="이번 주 트렌드" items={trending} />
      </div>
    </div>
  );
}
