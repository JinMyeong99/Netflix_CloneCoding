import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MovieSlice } from "../RTK/moviePopular/movieSlice";
import { fetchMoviePage } from "../RTK/moviePopular/movieThunk";

export default function Movie() {
  const dispatch = useDispatch();
  const { list, loading, hasMore, page, error } = useSelector((state) => {
    state.movie;

    useEffect(() => {
      if (page === 0 && list.length === 0) {
        dispatch(MovieSlice.actions.resetMovie());
        dispatch(fetchMoviePage());
      }
    }, [dispatch, page, list.length]);

    const loadMore = useCallback(() => {
      if (!loading && hasMore) {
        dispatch(fetchMoviePage());
      }
    }, [dispatch, loading, hasMore]);

    const loaderRef = 
  });

  return <></>;
}
