// src/components/Navbar.jsx
import { Link } from "react-router-dom";
import Netflix_logo from "../assets/Netflix_logo.png";
import SearchBar from "./Searchbar";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginSlice } from "../RTK/loginSlice";

export default function Navbar() {
  const dispatch = useDispatch();
  const email = useSelector((state) => state.login.email);
  const handleLogout = () => {
    dispatch(loginSlice.actions.logout());
  };

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

        <div className="flex items-center gap-5">
          <SearchBar />

          {!email ? (
            <Link
              to="/login"
              className="px-3 py-1.5 text-sm bg-red-600 hover:bg-red-700 rounded"
            >
              로그인
            </Link>
          ) : (
            <div className="relative group">
              <div
                className="
                  w-8 h-8 rounded-sm
                  bg-blue-500 flex items-center justify-center
                  cursor-pointer
                "
              >
                {email?.name ? email.name[0].toUpperCase() : "U"}
              </div>

              <div
                className="
                  absolute right-0 mt-2 w-32
                  bg-black text-white
                  py-2 rounded
                  opacity-0 invisible
                  group-hover:opacity-100 group-hover:visible
                  transition-all duration-200
                "
              >
                <Link
                  className="block px-4 py-2 hover:bg-neutral-800"
                  to="/profile"
                >
                  프로필 관리
                </Link>
                <Link
                  className="block px-4 py-2 hover:bg-neutral-800"
                  to="/account"
                >
                  계정
                </Link>
                <Link
                  className="block px-4 py-2 hover:bg-neutral-800"
                  onClick={handleLogout}
                  to="/"
                >
                  로그아웃
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
