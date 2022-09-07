import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import userSlice from "../features/users/slices/userSlice/userSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
