import { createSlice } from "@reduxjs/toolkit";

createSlice({
  name: "popularMovies",
  initialState: {
    list: [],
    page: 0,
    hasMore: true,
    loading: true,
    error: null,
  },
  reducers: {
    
  }
});
