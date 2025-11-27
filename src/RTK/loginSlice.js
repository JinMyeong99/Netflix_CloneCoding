import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isLogin: false,
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    register(state, action) {
      state.user = action.payload;
      state.isLogin = true;
    },
    login(state, action) {
      state.user = action.payload;
      state.isLogin = true;
    },
    logout(state) {
      state.user = null;
      state.isLogin = false;
    },
  },
});
