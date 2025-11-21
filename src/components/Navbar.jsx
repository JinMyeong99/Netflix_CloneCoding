import { Link } from "react-router-dom";
import Netflix_logo from "../assets/Netflix_logo.png";

export default function Navbar() {
  return (
    <header className="flex items-center justify-between h-16 bg-black text-white">
      <div className="flex items-center justify-between ">
        <Link to="/" className="mr-10">
          <img className="flex h-6" src={Netflix_logo} />
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
      <div className="flex">검색/로그인</div>
    </header>
  );
}
