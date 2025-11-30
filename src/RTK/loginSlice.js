import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
  name: "login",
  initialState: {
    email: null,
    isLogin: false,
  },
  reducers: {
    register(state, action) {
      state.email = action.payload;
      state.isLogin = true;
    },
    login(state, action) {
      state.email = action.payload;
      state.isLogin = true;
    },
    setWatchingMode(state, action) {
      state.watchingMode = action.payload;
    },
    logout(state) {
      state.email = null;
      state.isLogin = false;
    },
  },
});
