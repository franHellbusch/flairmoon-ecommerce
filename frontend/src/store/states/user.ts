import IUser, { ROLES } from "@/interfaces/IUser";
import { createSlice } from "@reduxjs/toolkit";

const initialState: IUser = {
  id: "",
  email: "",
  role: ROLES.USER,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfo: (_state, action) => action.payload,
    clearUserInfo: () => initialState,
    updateUserInfo: (state, action) => ({ ...state, ...action.payload }),
  },
});

export const { setUserInfo, clearUserInfo, updateUserInfo } = userSlice.actions;
export default userSlice.reducer;
