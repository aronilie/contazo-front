import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoginUserData } from "../../model/User";

const initialState: LoginUserData = {
  phoneNumber: "",
  id: "",
  token: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (previousState, action: PayloadAction<LoginUserData>) =>
      action.payload,
  },
});

export const { loginUser: loginUserActionCreator } = userSlice.actions;

export default userSlice.reducer;
