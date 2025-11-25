import { useDispatch, useSelector } from "react-redux";

export default function Search() {
  const dispatch = useDispatch();
  const { query, results, loading, hasMore, errer } = useSelector(
    (state) => state.search
  );

  
}
