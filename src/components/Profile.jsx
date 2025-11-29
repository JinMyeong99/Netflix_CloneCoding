import { useDispatch, useSelector } from "react-redux";
import { loginSlice } from "../RTK/loginSlice";
import { Link } from "react-router-dom";

export default function Profile() {
  const dispatch = useDispatch();
  const { email, isLogin } = useSelector((state) => state.login);

  const handleLogout = () => {
    dispatch(loginSlice.actions.logout());
  };

  if (!isLogin) {
    return (
      <Link
        to="/login"
        className="px-3 py-1.5 text-sm bg-red-600 hover:bg-red-700 rounded"
      >
        로그인
      </Link>
    );
  }

  return (
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
        <Link className="block px-4 py-2 hover:bg-neutral-800" to="/profile">
          프로필 관리
        </Link>
        <Link className="block px-4 py-2 hover:bg-neutral-800" to="/account">
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
  );
}
