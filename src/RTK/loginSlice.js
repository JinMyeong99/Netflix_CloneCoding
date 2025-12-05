import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
  name: "login",
  initialState: {
    user: null,
    isLogin: false,
  },
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
      state.isLogin = !!action.payload;
    },
    logout(state) {
      state.user = null;
      state.isLogin = false;
    },
  },
});
