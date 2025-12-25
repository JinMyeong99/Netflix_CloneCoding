import { useEffect, useMemo, useRef, useState } from "react";

export default function GenreSelector({ genres, selectedId, selectedGenre }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

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
    if (!selectedId) return "전체";
    const idNum = Number(selectedId);
    const genre = genres.find((genre) => genre.id === idNum);
    return genre?.name || "전체";
  }, [selectedId, genres]);

  const handleSelectGenre = (id) => {
    const value = id === "" ? "" : String(id);
    selectedGenre(value);
    setDropdownOpen(false);
  };

  return (
    <div ref={dropdownRef} className="relative">
      <button
        type="button"
        onClick={() => setDropdownOpen((prev) => !prev)}
        className="
          bg-black/70
          border border-gray-500
          hover:border-white hover:bg-neutral-800
          rounded
          px-4 py-1.5
          text-lg font-medium
          flex justify-center items-center gap-2
          cursor-pointer
          transition duration-100
        "
      >
        <span>{selectedGenreName}</span>
        <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M5.5 7.5L10 12L14.5 7.5H5.5Z" />
        </svg>
      </button>

      <ul
        className={`
          absolute left-0 mt-2 w-32 bg-black/90 
          border border-gray-700 rounded text-sm z-20 
          transition-all duration-300
          overflow-y-auto overflow-x-hidden
          ${dropdownOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 pointer-events-none"}
          scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-transparent
        `}
      >
        <li
          className="px-4 py-2 hover:bg-white/10 cursor-pointer text-base"
          onClick={() => handleSelectGenre("")}
        >
          전체
        </li>
        {genres.map((genre) => (
          <li
            key={genre.id}
            className="px-4 py-2 hover:bg-white/10 cursor-pointer text-base"
            onClick={() => handleSelectGenre(genre.id)}
          >
            {genre.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
