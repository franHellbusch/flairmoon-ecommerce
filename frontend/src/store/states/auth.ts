import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    logoutAuth: () => initialState,
  },
});

export const { setAuth, logoutAuth } = authSlice.actions;
export default authSlice.reducer;
