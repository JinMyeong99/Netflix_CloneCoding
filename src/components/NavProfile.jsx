import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../api/supabaseClient";
import useLoginStore from "../store/useLoginStore";

export default function NavProfile() {
  const navigate = useNavigate();
  const user = useLoginStore((state) => state.user);
  const isLogin = useLoginStore((state) => state.isLogin);
  const logout = useLoginStore((state) => state.logout);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    logout();

    navigate("/");
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

  const firstLetter =
    (user.name && user.name[0]) || (user.email && user.email[0]) || "U";

  return (
    <div className="relative group">
      <div
        className="
          w-8 h-8 rounded-sm
          bg-blue-500 flex items-center justify-center
          cursor-pointer
        "
      >
        {firstLetter.toUpperCase()}
      </div>

      <div
        className="
          absolute right-0 mt-2 w-32
          bg-black text-white
          rounded
          opacity-0 invisible
          group-hover:opacity-100 group-hover:visible
          transition-all duration-200
        "
      >
        <Link
          className="block px-4 py-2 text-sm hover:bg-neutral-800 "
          to="/profile"
        >
          프로필
        </Link>
        <button
          className="block w-full text-left px-4 py-2 text-sm hover:bg-neutral-800"
          onClick={handleLogout}
        >
          로그아웃
        </button>
      </div>
    </div>
  );
}
