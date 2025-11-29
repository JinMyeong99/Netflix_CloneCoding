import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: null,
  isLogin: false,
  watchMode: "safe",
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    register(state, action) {
      state.email = action.payload;
      state.isLogin = true;
      state.watchMode = "safe";
    },
    login(state, action) {
      state.email = action.payload;
      state.isLogin = true;
      state.watchMode = "safe";
    },
    setWatchMode(state, action) {
      state.watchMode = action.payload;
    },
    logout(state) {
      state.email = null;
      state.isLogin = false;
      state.watchMode = "safe";
    },
  },
});
