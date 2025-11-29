import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: null,
  isLogin: false,
  watchingMode: "safe",
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    register(state, action) {
      state.email = action.payload;
      state.isLogin = true;
      state.watchingMode = "safe";
    },
    login(state, action) {
      state.email = action.payload;
      state.isLogin = true;
      state.watchingMode = "safe";
    },
    setWatchingMode(state, action) {
      state.watchingMode = action.payload;
    },
    logout(state) {
      state.email = null;
      state.isLogin = false;
      state.watchingMode = "safe";
    },
  },
});
