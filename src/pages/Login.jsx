import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Netflix_logo_small from "../assets/Netflix_logo_small.png";
import Netflix_background from "../assets/Netflix_background.jpg";
import useLoginStore from "../store/useLoginStore";
import { supabase } from "../api/supabaseClient";

export default function Login() {
  const navigate = useNavigate();
  const setUser = useLoginStore((state) => state.setUser);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      setError("이메일과 비밀번호를 모두 입력해 주세요.");
      return;
    }

    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message || "로그인에 실패했습니다.");
        return;
      }

      const user = data.user;
      if (user) {
        setUser({
          id: user.id,
          email: user.email,
          name: user.user_metadata?.name || "user",
        });
      }

      navigate("/");
    } catch (error) {
      setError("알 수 없는 오류가 발생했습니다.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0">
        <img src={Netflix_background} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-linear-to-b from-black/10 via-black/40 to-black/90" />
      </div>

      <header className="relative z-10 flex items-center h-16 px-8">
        <Link to="/">
          <img src={Netflix_logo_small} alt="Netflix_logo" className="h-7 " />
        </Link>
      </header>

      <main className="relative z-10 flex justify-center">
        <div className="w-full max-w-sm bg-black/80 px-12 py-16 rounded mt-16">
          <h1 className="text-3xl font-bold mb-6">로그인</h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError("");
                }}
                className="
                  w-full rounded bg-neutral-800
                  px-4 py-3
                  text-sm
                  outline-none
                  focus:bg-neutral-700
                "
                placeholder="이메일 주소"
              />
            </div>

            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError("");
                }}
                className="
                  w-full rounded bg-neutral-800
                  px-4 py-3
                  text-sm
                  outline-none
                  focus:bg-neutral-700
                "
                placeholder="비밀번호"
              />
            </div>

            {error && <p className="text-sm text-red-500 mt-1">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="
                w-full mt-4
                bg-red-600 hover:bg-red-700
                py-3
                rounded
                text-sm font-semibold
                disabled:opacity-60
              "
            >
              {loading ? "로그인 중..." : "로그인"}
            </button>
          </form>

          <div className="mt-8 text-sm text-gray-400">
            <p>
              Netflix 회원이 아니신가요?{" "}
              <Link to="/signup" className="text-white hover:underline">
                지금 가입하세요.
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
