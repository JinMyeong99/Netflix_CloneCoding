import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { searchSlice } from "../RTK/search/searchSlice";
import { fetchSearchPage } from "../RTK/search/searchThunk";

export default function SearchBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [originPath, setOriginPath] = useState(null);

  const barRef = useRef(null);

  const handleButtonClick = () => {
    setOpen((prev) => {
      const nextOpen = !prev;

      if (nextOpen && !location.pathname.startsWith("/search")) {
        setOriginPath(location.pathname);
      }
      return nextOpen;
    });
  };
  const handleChange = (e) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    if (!open) return;

    function handleClickOutside(e) {
      if (!barRef.current) return;
      if (barRef.current.contains(e.target)) return;
      if (value.trim()) return;
      setOpen(false);
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, value]);

  useEffect(() => {
    if (!open) return;

    const searchValue = value.trim();
    const id = setTimeout(() => {
      if (!searchValue) {
        dispatch(searchSlice.actions.resetSearch());

        if (location.pathname.startsWith("/search") && originPath) {
          navigate(originPath);
        }
        return;
      }
      if (!location.pathname.startsWith("/search")) {
        if (!originPath) {
          setOriginPath(location.pathname);
        }
        navigate("/search");
      }
      dispatch(searchSlice.actions.resetSearch());
      dispatch(searchSlice.actions.setQuery(searchValue));
      dispatch(fetchSearchPage());
    }, 400);
    return () => clearTimeout(id);
  }, [value, open, location.pathname, originPath, navigate, dispatch]);

  return (
    <div ref={barRef} className="relative flex items-center gap-2">
      <button
        onClick={handleButtonClick}
        className="
      p-2
      rounded-full
      transition
      duration-200
      hover:bg-white/20
      cursor-pointer
      flex items-center justify-center
    "
      >
        <svg
          className="w-5 h-5 text-white"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-4.35-4.35M11 18a7 7 0 100-14 7 7 0 000 14z"
          />
        </svg>
      </button>
      {open && (
        <input
          type="text"
          value={value}
          onChange={handleChange}
          placeholder="제목"
        />
      )}
    </div>
  );
}
