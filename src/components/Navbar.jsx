import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  return (
    <header className="navBar">
      <img
        className="logo"
        src="../assets/Netflix_logo.png"
        onClick={() => navigate("/")}
      />
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
