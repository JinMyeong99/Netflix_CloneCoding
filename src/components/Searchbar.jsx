import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { searchSlice } from "../RTK/search/searchSlice";
import { fetchSearchPage } from "../RTK/search/searchThunk";
import { SearchIcon } from "./SearchIcon";

export default function SearchBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const [value, setValue] = useState("");

  const barRef = useRef(null);

  const handleButtonClick = () => {
    setOpen((prev) => !prev);
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
        return;
      }
      if (!location.pathname.startsWith("/search")) {
        navigate("/search");
      }
      dispatch(searchSlice.actions.resetSearch());
      dispatch(searchSlice.actions.setQuery(searchValue));
      dispatch(fetchSearchPage());
    }, 300);
    return () => clearTimeout(id);
  }, [value, open, location.pathname, navigate, dispatch]);

  return (
    <div ref={barRef}>
      <SearchIcon onClick={handleButtonClick} />
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
