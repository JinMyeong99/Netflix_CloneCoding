import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginSlice } from "../RTK/loginSlice";

export default function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim() || !passwordCheck.trim()) {
      setError("모든 항목을 입력해 주세요.");
      return;
    }
    if (password.length < 8) {
      setError("비밀번호는 최소 8자 이상이어야 합니다");
      return;
    }
    if (password !== passwordCheck) {
      setError("비밀번호와 일치하지 않습니다");
      return;
    }

    const userName = name.trim() ? name.trim() : "user";

    dispatch(loginSlice.actions.register({ name: userName, email }));

    navigate("/");
  };

  return (
    <div>
      <div>
        <img src="" />
        <div />
      </div>
      <main>
        <div>
          <h1>회원가입</h1>
          <form onSubmit={handleSubmit}>
            <div>
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (error) setError("");
                }}
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
                placeholder="이메일"
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
                placeholder="비밀번호"
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
                placeholder="비밀번호 확인"
              />
            </div>
            {error && <div>{error}</div>}
            <button type="submit">회원가입</button>
          </form>
          <div>
            <p>
              이미 계정이 있으신가요?
              <Link to="/login">로그인하기</Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
