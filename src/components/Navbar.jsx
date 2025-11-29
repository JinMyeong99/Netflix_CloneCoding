import { Link } from "react-router-dom";
import Netflix_logo from "../assets/Netflix_logo.png";
import SearchBar from "./Searchbar";
import { useEffect, useState } from "react";
import Profile from "./Profile";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 
      ${isScrolled ? "bg-neutral-900" : "bg-transparent"}`}
    >
      <div className="mx-auto max-w-[90%] flex h-18 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/">
            <img src={Netflix_logo} className="h-6" alt="Netflix logo" />
          </Link>

          <nav className="flex gap-5 items-center">
            <Link
              className="text-sm text-gray-100 hover:text-gray-300 transition duration-300"
              to="/"
            >
              홈
            </Link>
            <Link
              className="text-sm text-gray-100 hover:text-gray-300 transition duration-300"
              to="/series"
            >
              시리즈
            </Link>
            <Link
              className="text-sm text-gray-100 hover:text-gray-300 transition duration-300"
              to="/movie"
            >
              영화
            </Link>
            <Link
              className="text-sm text-gray-100 hover:text-gray-300 transition duration-300"
              to="/trending"
            >
              NEW! 요즘 대세 콘텐츠
            </Link>
            <Link
              className="text-sm text-gray-100 hover:text-gray-300 transition duration-300"
              to="/favorite"
            >
              내가 찜한 리스트
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <SearchBar />
          <Profile />
        </div>
      </div>
    </header>
  );
}
