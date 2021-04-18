import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: { uid: "", displayName: "" },
  },
  reducers: {
    // ログイン状態をストアに保存
    login: (state, action) => {
      state.user = action.payload;
    },
    // ユーザー情報リセット
    logout: (state) => {
      state.user = { uid: "", displayName: "" };
    },
    // プロフィール情報格納
    updateUserProfile: (state, action) => {
      state.user.displayName = action.payload.displayName;
    },
  },
});

export const { login, logout, updateUserProfile } = userSlice.actions;

export const selectUser = (state: RootState) => state.user.user;

export default userSlice.reducer;
