// src/components/Navbar.jsx
import { Link } from "react-router-dom";
import Netflix_logo from "../assets/Netflix_logo.png";
import SearchBar from "./Searchbar";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginSlice } from "../RTK/loginSlice";

export default function Navbar() {
  const dispatch = useDispatch();

  const [isScrolled, setIsScrolled] = useState(false);

  const user = useSelector((state) => state.login.email);
  const handleLogout = () => {
    dispatch(loginSlice.actions.logout());
  };

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
      ${isScrolled ? "bg-black" : "bg-transparent"}`}
    >
      <div className="mx-auto max-w-[90%] flex h-16 items-center justify-between">
        {/* 왼쪽: 로고 + 메뉴 */}
        <div className="flex items-center gap-8">
          <Link to="/">
            <img src={Netflix_logo} className="h-6" alt="Netflix logo" />
          </Link>

          <nav className="flex gap-5 text-sm">
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

        {/* 오른쪽: 검색 + 로그인 or 프로필 */}
        <div className="flex items-center gap-5">
          <SearchBar />

          {/* 로그인 상태에 따라 버튼/프로필 변경 */}
          {!user ? (
            <Link to="/login" className="text-sm hover:text-gray-300">
              로그인
            </Link>
          ) : (
            <div className="relative group">
              {/* 프로필 원형 */}
              <div
                className="
                  w-8 h-8 rounded-full 
                  bg-red-600 flex items-center justify-center
                  cursor-pointer
                "
              >
                {user?.name ? user.name[0].toUpperCase() : "U"}
              </div>

              {/* hover 시 드롭다운 */}
              <div
                className="
                  absolute right-0 mt-2 w-32
                  bg-black text-sm text-white
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
