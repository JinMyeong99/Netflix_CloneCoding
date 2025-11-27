import { Link, useNavigate } from "react-router-dom";
import Netflix_logo from "../assets/Netflix_logo.png";
import SearchBar from "./Searchbar";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginSlice } from "../RTK/loginSlice";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLogin, user } = useSelector((state) => state.login);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleLogoutClick = () => {
    dispatch(loginSlice.actions.logout());
    navigate("/");
  };

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
          {!isLogin && (
            <button
              onClick={handleLoginClick}
              className="hover:text-gray-300 cursor-pointer"
            >
              로그인
            </button>
          )}
          {isLogin && (
            <div>
              <button type="button">
                <div>
                  
                </div>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
