import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isLogin: false,
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
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
