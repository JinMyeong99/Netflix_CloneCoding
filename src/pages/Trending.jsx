import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { trendingSlice } from "../RTK/trending/trendingSlice";
import { fetchTrendingPage } from "../RTK/trending/trendingThunk";

import MovieCard from "../components/MovieCard";

export default function Trending() {
  const dispatch = useDispatch();
  const { list, page, error } = useSelector((state) => state.trending);

  useEffect(() => {
    if (page === 0 && list.length === 0) {
      dispatch(trendingSlice.actions.resetTrending());
      dispatch(fetchTrendingPage());
    }
  }, [dispatch, page, list.length]);

  return (
    <div className="mx-auto max-w-[90%] pb-15">
      <h2 className="text-2xl my-4">이번 주 트렌드</h2>
      {error && <div>{error}</div>}

      <div className="flex flex-wrap justify-between gap-y-20">
        {list.map((item) => (
          <MovieCard key={`${item.media_type}-${item.id}`} movie={item} />
        ))}
      </div>
    </div>
  );
}
