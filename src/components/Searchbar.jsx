import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function SearchBar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  useEffect(() => {
    if (location.pathname.startsWith("/search")) {
      const q = new URLSearchParams(location.search).get("q") || "";
      setValue(q);
      if (q) setOpen(true);
    } else {
      setOpen(false);
      setValue("");
    }
  }, [location.pathname, location.search]);

  const handleChange = (e) => {
    const text = e.target.value;
    setValue(text);
    const searchValue = text.trim();

    if (!searchValue) {
      navigate("/search");
      return;
    }
    navigate(`/search?q=${encodeURIComponent(searchValue)}`);
  };

  return (
    <div>
      <button onClick={() => setOpen((prev) => !prev)}>🔍</button>
      {open && (<input type="text" value={value} onChange={handleChange} placeholder="제목"/>)}
    </div>
  );
}
