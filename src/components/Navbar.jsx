import { Link } from "react-router-dom";
import Netflix_logo from "../assets/Netflix_logo.png";

export default function Navbar() {
  return (
    <header className="navBar">
      <img className="logo" src={Netflix_logo} />
      <nav className="navLinks">
        <Link to="/">홈</Link>
        <Link to="/series">시리즈</Link>
        <Link to="/movie">영화</Link>
        <Link to="/trending">트렌드</Link>
        <Link to="/favorite">내가 찜한 리스트</Link>
      </nav>
      <div>검색/로그인</div>
    </header>
  );
}
