import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Netflix_logo from "../assets/Netflix_logo.png";
import { loginSlice } from "../RTK/loginSlice";
import Netflix_background from "../assets/Netflix_background.jpg";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      setError("이메일과 비밀번호를 모두 입력해 주세요.");
      return;
    }

    dispatch(loginSlice.actions.login({ email }));
    navigate("/");
  };

  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0">
        <img src={Netflix_background} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-linear-to-b from-black/10 via-black/70 to-black" />
      </div>

      <header className="relative z-10 flex items-center h-16 px-8">
        <Link to="/">
          <img src={Netflix_logo} alt="Netflix" className="h-8" />
        </Link>
      </header>

      <main className="relative z-10 flex justify-center">
        <div className="w-full max-w-sm bg-black/80 px-8 py-10 rounded">
          <h1 className="text-3xl font-bold mb-6">로그인</h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col space-y-1">
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

            <div className="flex flex-col space-y-1">
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
              className="
                w-full mt-4
                bg-red-600 hover:bg-red-700
                py-3
                rounded
                text-sm font-semibold
              "
            >
              로그인
            </button>
          </form>

          <div className="mt-8 text-sm text-gray-400">
            <p>
              Netflix 회원이 아니신가요?{" "}
              <Link to="/signup" className="text-white hover:underline">
                지금 가입하기
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
