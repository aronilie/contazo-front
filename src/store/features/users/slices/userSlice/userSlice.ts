import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoginUserData } from "../../models/User";

const initialState: LoginUserData = {
  phoneNumber: "",
  token: "",
  id: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (previousState, action: PayloadAction<LoginUserData>) =>
      action.payload,
    logoutUser: (previousState) => initialState,
  },
});

export const {
  loginUser: loginUserActionCreator,
  logoutUser: logoutUserActionCreator,
} = userSlice.actions;
export default userSlice.reducer;
