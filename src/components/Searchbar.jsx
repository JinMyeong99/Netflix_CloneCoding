import { useEffect, useReducer, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const createInitialSearchState = (location) => {
  const isSearchRoute = location.pathname.startsWith("/search");
  const params = new URLSearchParams(location.search);
  const initialValue = isSearchRoute ? params.get("q") || "" : "";
  return { open: isSearchRoute, value: initialValue };
};

function searchReducer(state, action) {
  switch (action.type) {
    case "open":
      return state.open ? state : { ...state, open: true };
    case "close":
      return state.open ? { ...state, open: false } : state;
    case "reset":
      if (!state.open && !state.value) return state;
      return { open: false, value: "" };
    case "setValue":
      if (state.value === action.value) return state;
      return { ...state, value: action.value };
    case "syncFromLocation":
      if (state.open && state.value === action.value) return state;
      return { ...state, open: true, value: action.value };
    default:
      return state;
  }
}

export default function SearchBar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [state, dispatch] = useReducer(
    searchReducer,
    location,
    createInitialSearchState
  );
  const { open, value } = state;
  const originPathRef = useRef(null);
  const prevPathRef = useRef(location.pathname);

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
      dispatch({ type: "open" });
    }
  };

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  useEffect(() => {
    if (!location.pathname.startsWith("/search")) return;
    const params = new URLSearchParams(location.search);
    const q = params.get("q") || "";
    dispatch({ type: "syncFromLocation", value: q });
  }, [location.pathname, location.search]);

  useEffect(() => {
    if (location.pathname === prevPathRef.current) return;
    prevPathRef.current = location.pathname;

    if (location.pathname.startsWith("/search")) return;
    originPathRef.current = null;
    if (open || value) dispatch({ type: "reset" });
  }, [location.pathname, open, value]);

  const handleChange = (e) => {
    dispatch({ type: "setValue", value: e.target.value });
  };

  useEffect(() => {
    if (!open) return;

    function handleClickOutside(e) {
      if (!barRef.current) return;
      if (barRef.current.contains(e.target)) return;
      if (value.trim()) return;
      dispatch({ type: "close" });
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
        if (
          location.pathname.startsWith("/search") &&
          originPathRef.current
        ) {
          navigate(originPathRef.current);
          originPathRef.current = null;
        } else if (location.pathname.startsWith("/search")) {
          navigate("/");
        }
        return;
      }
      if (!location.pathname.startsWith("/search")) {
        if (!originPathRef.current) {
          originPathRef.current = location.pathname;
        }
        navigate(`/search?q=${encodeURIComponent(searchValue)}`);
      } else {
        navigate(`/search?q=${encodeURIComponent(searchValue)}`, {
          replace: true,
        });
      }
    }, 500);
    return () => clearTimeout(id);
  }, [value, open, location.pathname, location.search, navigate]);

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
