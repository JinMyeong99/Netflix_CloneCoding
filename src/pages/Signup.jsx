import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useLoginStore from "../store/useLoginStore";
import Netflix_logo from "../assets/Netflix_logo.png";
import Netflix_background from "../assets/Netflix_background.jpg";
import { supabase } from "../api/supabaseClient";

export default function Signup() {
  const navigate = useNavigate();
  const setUser = useLoginStore((state) => state.setUser);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim() || !passwordCheck.trim()) {
      setError("모든 항목을 입력해 주세요.");
      return;
    }
    if (password.length < 8) {
      setError("비밀번호는 최소 8자 이상이어야 합니다.");
      return;
    }
    if (password !== passwordCheck) {
      setError("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
      return;
    }

    const userName = name.trim() ? name.trim() : "user";

    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: userName,
          },
        },
      });

      if (error) {
        setError(error.message || "회원가입에 실패했습니다.");
        return;
      }

      const user = data.user;
      if (user) {
        setUser({
          id: user.id,
          email: user.email,
          name: user.user_metadata?.name || userName,
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
          <img src={Netflix_logo} alt="Netflix" className="h-7" />
        </Link>
      </header>

      <main className="relative z-10 flex justify-center">
        <div className="w-full max-w-sm bg-black/80 px-12 py-16 rounded mt-10">
          <h1 className="text-3xl font-bold mb-6">회원가입</h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (error) setError("");
                }}
                className="
                  w-full rounded bg-neutral-800
                  px-4 py-3
                  text-sm
                  outline-none
                  focus:bg-neutral-700
                "
                placeholder="이름"
              />
            </div>

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
                  setPassword(e.targe.value);
                  if (error) setError("");
                }}
                className="
                  w-full rounded bg-neutral-800
                  px-4 py-3
                  text-sm
                  outline-none
                  focus:bg-neutral-700
                "
                placeholder="비밀번호 (8자 이상)"
              />
            </div>

            <div>
              <input
                type="password"
                value={passwordCheck}
                onChange={(e) => {
                  setPasswordCheck(e.target.value);
                  if (error) setError("");
                }}
                className="
                  w-full rounded bg-neutral-800
                  px-4 py-3
                  text-sm
                  outline-none
                  focus:bg-neutral-700
                "
                placeholder="비밀번호 확인"
              />
            </div>

            {error && <div className="text-sm text-red-500 mt-1">{error}</div>}

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
              {loading ? "가입 중..." : "회원가입"}
            </button>
          </form>

          <div className="mt-8 text-sm text-gray-400">
            <p>
              이미 계정이 있으신가요?{" "}
              <Link to="/login" className="text-white hover:underline">
                로그인하기
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
