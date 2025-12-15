import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useSearchStore from "../store/useSearchStore";

export default function SearchBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { resetSearch, setQuery, fetchSearchPage } = useSearchStore();

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const originPathRef = useRef(null);

  const barRef = useRef(null);
  const inputRef = useRef(null);

  const handleButtonClick = () => {
    if (!open) {
      if (!location.pathname.startsWith("/search")) {
        originPathRef.current = location.pathname;
      }
      if (
        location.pathname.startsWith("/search") &&
        originPathRef.current === null
      ) {
        originPathRef.current = "/";
      }
      setOpen(true);
    }
  };

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

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
        resetSearch();

        if (
          location.pathname.startsWith("/search") &&
          originPathRef.current
        ) {
          navigate(originPathRef.current);
          originPathRef.current = null;
        }
        return;
      }
      if (!location.pathname.startsWith("/search")) {
        if (!originPathRef.current) {
          originPathRef.current = location.pathname;
        }
        navigate("/search");
      }
      resetSearch();
      setQuery(searchValue);
      fetchSearchPage();
    }, 500);
    return () => clearTimeout(id);
  }, [value, open, location.pathname, navigate, resetSearch, setQuery, fetchSearchPage]);

  return (
    <div ref={barRef} className="flex items-center">
      <div
        className={`
          relative flex items-center h-9 overflow-hidden
          transition-width duration-300 ease-out
          ${open ? "w-50 lg:w-56" : "w-8"}
        `}
      >
        <button
          onClick={handleButtonClick}
          className="absolute left-1 flex items-center justify-center w-6 h-6 cursor-pointer"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
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
            ref={inputRef}
            type="text"
            value={value}
            onChange={handleChange}
            placeholder="제목"
            className="
              w-full
              py-1.5 pl-9 pr-2
              text-sm
              placeholder-gray-400
              outline-none
              border
            border-white
            bg-neutral-900  
            "
          />
        )}
      </div>
    </div>
  );
}
