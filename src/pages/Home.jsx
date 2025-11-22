import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHomeData } from "../RTK/home/homeThunk";
import MovieCard from "../components/Moviecard";

export default function Home() {
  const dispatch = useDispatch();
  const { popular, loading, error } = useSelector((state) => state.home);

  useEffect(() => {
    dispatch(fetchHomeData());
  }, [dispatch]);

  if (loading && popular.length === 0) {
    return <div>홈 데이터 로딩 중...</div>;
  }
  if (error) {
    return <div>에러: {error}</div>;
  }

  return (
    <div className="text-white">
      <h2>인기 영화</h2>
      <div className="flex flex-wrap gap-2">
        {popular.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}
