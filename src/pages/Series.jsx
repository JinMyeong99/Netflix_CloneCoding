import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { seriesSlice } from "../RTK/series/seriesSlice";
import { fetchSeriesPage } from "../RTK/series/seriesThunk";
import useInfiniteScroll from "../hooks/useInfiniteScroll";
import MovieCard from "../components/MovieCard";

export default function Series() {
  const dispatch = useDispatch();
  const { list, loading, hasMore, page, error } = useSelector(
    (state) => state.series
  );

  const { seriesGenres } = useSelector((state) => state.genre);

  const [selectedGenreId, setSelectedGenreId] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    if (page === 0 && list.length === 0) {
      dispatch(seriesSlice.actions.resetSeries());
      dispatch(fetchSeriesPage());
    }
  }, [dispatch, page, list.length]);

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      dispatch(fetchSeriesPage());
    }
  }, [dispatch, loading, hasMore]);

  const loaderRef = useInfiniteScroll({
    loading,
    hasMore,
    onLoadMore: loadMore,
  });

  useEffect(() => {
    function handleClickOutside(e) {
      if (!dropdownRef.current) return;
      if (!dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedGenreName = useMemo(() => {
    if (!selectedGenreId) return "장르";
    const idNum = Number(selectedGenreId);
    const g = seriesGenres.find((genre) => genre.id === idNum);
    return g?.name || "장르";
  }, [selectedGenreId, seriesGenres]);

  const filteredSeries = useMemo(() => {
    if (!selectedGenreId) return list;
    const genreId = Number(selectedGenreId);
    return list.filter(
      (series) =>
        Array.isArray(series.genre_ids) && series.genre_ids.includes(genreId)
    );
  }, [list, selectedGenreId]);

  const handleSelectGenre = (id) => {
    setSelectedGenreId(id === "" ? "" : String(id));
    setDropdownOpen(false);
  };

  return (
    <div className="mx-auto max-w-[90%] pb-[100px]">
      <div className="flex items-center gap-6 my-5">
        <h2 className="text-4xl">인기 시리즈</h2>

        <div ref={dropdownRef} className="relative">
          <button
            type="button"
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="
              bg-black/70 text-white
              border border-gray-500
              hover:border-white hover:bg-neutral-800
              rounded
              px-4 py-1.5
              text-sm font-medium
              flex items-center gap-2
              cursor-pointer
              transition
            "
          >
            <span>{selectedGenreName}</span>
            <svg
              className="w-3.5 h-3.5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M5.5 7.5L10 12L14.5 7.5H5.5Z" />
            </svg>
          </button>

          {dropdownOpen && (
            <ul
              className="
                absolute left-0 mt-2 w-40
                bg-black/90
                border border-gray-700
                rounded
                text-sm text-white
                shadow-lg
                z-20
              "
            >
              <li
                className="px-4 py-2 hover:bg-white/10 cursor-pointer"
                onClick={() => handleSelectGenre("")}
              >
                장르 전체
              </li>
              {seriesGenres.map((genre) => (
                <li
                  key={genre.id}
                  className="px-4 py-2 hover:bg-white/10 cursor-pointer"
                  onClick={() => handleSelectGenre(genre.id)}
                >
                  {genre.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {error && <div className="text-red-500 mb-2">{error}</div>}

      <div className="flex flex-wrap justify-between gap-y-20">
        {filteredSeries.map((series) => (
          <MovieCard key={series.id} movie={series} />
        ))}
      </div>

      {loading && <div>불러오는 중...</div>}
      {hasMore && <div ref={loaderRef} style={{ height: 1 }} />}
      {!hasMore && list.length > 0 && <div>더 이상 시리즈가 없습니다.</div>}
    </div>
  );
}
