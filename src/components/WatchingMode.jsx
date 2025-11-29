import { useDispatch, useSelector } from "react-redux";
import { loginSlice } from "../RTK/loginSlice";
import { useState } from "react";

export default function WatchingMode() {
  const dispatch = useDispatch();
  const { isLogin, watchingMode } = useSelector((state) => state.login);

  const [isHover, setIsHover] = useState(false);

  if (!isLogin) return null;

  const handleToggleMode = () => {
    if (!isLogin) return;
    const changeMode = watchingMode === "safe" ? "adult" : "safe";
    dispatch(loginSlice.actions.setWatchingMode(changeMode));
  };

  const currentLabel = watchingMode === "safe" ? "15+" : "19+";
  const hoverLabel = watchingMode === "safe" ? "19+" : "15+";

  let textColor = "text-gray-100";
  if (isHover) {
    textColor = watchingMode === "safe" ? "text-red-500" : "text-blue-400";
  }

  return (
    <button
      type="button"
      onClick={handleToggleMode}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      className={`text-sm font-semibold transition-colors duration-200 p-2 cursor-pointer ${textColor}`}
    >
      {isHover ? hoverLabel : currentLabel}
    </button>
  );
}
