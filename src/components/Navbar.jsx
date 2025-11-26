import { Link } from "react-router-dom";
import Netflix_logo from "../assets/Netflix_logo.png";
import SearchBar from "./Searchbar";
import { useEffect, useState } from "react";

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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-black" : "bg-transparent"}`}
    >
      <div className="flex h-16 items-center justify-between px-[4%]">
        <div className="flex items-center gap-8">
          <Link to="/">
            <img className="h-6" src={Netflix_logo} />
          </Link>
          <nav className="flex gap-5">
            <Link className="hover:text-gray-300" to="/">
              홈
            </Link>
            <Link className="hover:text-gray-300" to="/series">
              시리즈
            </Link>
            <Link className="hover:text-gray-300" to="/movie">
              영화
            </Link>
            <Link className="hover:text-gray-300" to="/trending">
              트렌드
            </Link>
            <Link className="hover:text-gray-300" to="/favorite">
              내가 찜한 리스트
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <SearchBar />
          <div>로그인</div>
        </div>
      </div>
    </header>
  );
}
