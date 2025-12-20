import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import NetflixLogoSmall from "../assets/Netflix_logo_small.png";
import SearchBar from "./Searchbar";
import NavProfile from "./NavProfile";

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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400
      ${
        isScrolled
          ? "bg-neutral-900"
          : "bg-linear-to-b from-neutral-900/90 via-neutral-900/70 to-transparent"
      }`}
    >
      <div className="mx-auto max-w-[90%] flex h-18 items-center justify-between">
        <div className="flex items-center gap-6 lg:gap-8">
          <Link to="/">
            <img
              src={NetflixLogoSmall}
              width={256}
              height={69}
              decoding="async"
              className="h-5 lg:h-6 w-auto"
              alt="Netflix logo"
            />
          </Link>

          <nav className="hidden md:flex gap-4 lg:gap-5 items-center">
            <Link
              className="text-xs lg:text-sm text-gray-100 hover:text-gray-300 transition duration-300"
              to="/"
            >
              홈
            </Link>
            <Link
              className="text-xs lg:text-sm text-gray-100 hover:text-gray-300 transition duration-300"
              to="/series"
            >
              시리즈
            </Link>
            <Link
              className="text-xs lg:text-sm text-gray-100 hover:text-gray-300 transition duration-300"
              to="/movie"
            >
              영화
            </Link>
            <Link
              className="text-xs lg:text-sm text-gray-100 hover:text-gray-300 transition duration-300"
              to="/trending"
            >
              NEW! 요즘 대세 콘텐츠
            </Link>
            <Link
              className="text-xs lg:text-sm text-gray-100 hover:text-gray-300 transition duration-300"
              to="/favorite"
            >
              내가 찜한 리스트
            </Link>
          </nav>
          <div className="relative group md:hidden">
            <button
              type="button"
              className="text-sm text-gray-100 hover:text-gray-300 transition duration-300 flex items-center py-4 pr-12"
            >
              메뉴 ▼
            </button>
            <div
              className="absolute left-0 w-44 pt-2
              opacity-0 pointer-events-none
              group-hover:opacity-100 group-hover:pointer-events-auto
              transition-opacity duration-200"
            >
              <div className="bg-neutral-900">
                <Link
                  className="block px-4 py-2 text-sm text-gray-100 hover:bg-neutral-800"
                  to="/"
                >
                  홈
                </Link>
                <Link
                  className="block px-4 py-2 text-sm text-gray-100 hover:bg-neutral-800"
                  to="/series"
                >
                  시리즈
                </Link>
                <Link
                  className="block px-4 py-2 text-sm text-gray-100 hover:bg-neutral-800"
                  to="/movie"
                >
                  영화
                </Link>
                <Link
                  className="block px-4 py-2 text-sm text-gray-100 hover:bg-neutral-800"
                  to="/trending"
                >
                  NEW! 요즘 대세 콘텐츠
                </Link>
                <Link
                  className="block px-4 py-2 text-sm text-gray-100 hover:bg-neutral-800"
                  to="/favorite"
                >
                  내가 찜한 리스트
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <SearchBar />
          <NavProfile />
        </div>
      </div>
    </header>
  );
}
