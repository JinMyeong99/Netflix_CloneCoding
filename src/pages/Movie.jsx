import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MovieSlice } from "../RTK/movie/movieSlice";
import { fetchMoviePage } from "../RTK/movie/movieThunk";
import useInfiniteScroll from "../hooks/useInfiniteScroll";
import MovieCard from "../components/MovieCard";

export default function Movie() {
  const dispatch = useDispatch();

  const { list, loading, hasMore, page, error } = useSelector(
    (state) => state.movie
  );
  const { movieGenres } = useSelector((state) => state.genre);

  const [selectedGenreId, setSelectedGenreId] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);

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
    const genre = movieGenres.find((genre) => genre.id === idNum);
    return genre?.name || "장르";
  }, [selectedGenreId, movieGenres]);

  const filteredMovies = useMemo(() => {
    if (!selectedGenreId) return list;
    const genreId = Number(selectedGenreId);

    return list.filter((movie) => movie.genre_ids.includes(genreId));
  }, [list, selectedGenreId]);

  const handleSelectGenre = (id) => {
    setSelectedGenreId(id === "" ? "" : String(id));
    setDropdownOpen(false);
  };

  return (
    <div className="mx-auto max-w-[90%] pb-[100px]">
      <div className="flex items-center gap-6 my-5">
        <h2 className="text-4xl ">인기 영화</h2>
        <div className="relative">
          <button
            type="button"
            ref={dropdownRef}
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="
              bg-black/70
              border border-gray-500
              hover:border-white hover:bg-neutral-800
              rounded
              px-4 py-1.5
              text-sm font-medium
              flex items-center gap-2
              cursor-pointer
              transition duration-100
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
          <ul
            className={`absolute left-0 mt-2 w-30 bg-black/90 
            border border-gray-700 rounded text-sm z-20 
            transition-all duration-300
            overflow-y-auto overflow-x-hidden
            ${dropdownOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}
            scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-transparent
            `}
          >
            <li
              className="px-4 py-2 hover:bg-white/10 cursor-pointer"
              onClick={() => handleSelectGenre("")}
            >
              전체
            </li>
            {movieGenres.map((genre) => (
              <li
                key={genre.id}
                className="px-4 py-2 hover:bg-white/10 cursor-pointer"
                onClick={() => handleSelectGenre(genre.id)}
              >
                {genre.name}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {error && <div className="text-red-500 mb-2">{error}</div>}

      <div className="flex flex-wrap justify-between gap-y-20">
        {filteredMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      {loading && <div>불러오는 중...</div>}
      {hasMore && <div ref={loaderRef} style={{ height: 1 }} />}
      {!hasMore && list.length > 0 && <div>더 이상 영화가 없습니다.</div>}
    </div>
  );
}
