import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { searchSlice } from "../RTK/search/searchSlice";

export default function Search() {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const urlQuery = searchParams.get("q") || "";
  const { query, results, loading, hasMore, page, error } = useSelector(
    (state) => state.search
  );

  useEffect(() => {
    const searchValue = urlQuery.trim();

    if (!searchValue) {
      dispatch(searchSlice.actions.resetSearch());
      return;
    }
  });
  return <></>;
}
