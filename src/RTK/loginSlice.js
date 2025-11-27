import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: null,
  isLogin: false,
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    register(state, action) {
      state.email = action.payload;
      state.isLogin = true;
    },
    login(state, action) {
      state.email = action.payload;
      state.isLogin = true;
    },
    logout(state) {
      state.email = null;
      state.isLogin = false;
    },
  },
});
