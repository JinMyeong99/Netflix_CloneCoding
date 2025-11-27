import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginSlice } from "../RTK/loginSlice";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setError("이메일을 입력해 주세요");
      return;
    }

    dispatch(loginSlice.actions.login({ email }));
    navigate("/");
  };

  return (
    <div>
      <div>
        <h1>로그인</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>이메일</label>
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
            <label>비밀번호</label>
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
          {error && <div>{error}</div>}
          <button type="submit">로그인</button>
        </form>
      </div>
    </div>
  );
}
