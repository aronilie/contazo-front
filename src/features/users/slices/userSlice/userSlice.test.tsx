import { LoginUserData } from "../../models/User";
import userSlice, {
  loginUserActionCreator,
  logoutUserActionCreator,
} from "./userSlice";

describe("Given a user slice", () => {
  describe("When it's invoked with an initial state as previous user and a login user action creator with a fakeUser", () => {
    test("Then it should return the fakeUser", () => {
      const initialState: LoginUserData = {
        id: "",
        token: "",
        phoneNumber: "",
      };
      const fakeUser: LoginUserData = {
        id: "123456789",
        token: "1a2b3c",
        phoneNumber: "888555222",
      };

      const user = userSlice(initialState, loginUserActionCreator(fakeUser));

      expect(user).toStrictEqual(fakeUser);
    });
  });
  describe("When it's invoked with an initial state", () => {
    test("Then it should return the initialState", () => {
      const initialState: LoginUserData = {
        id: "",
        token: "",
        phoneNumber: "",
      };

      const user = userSlice(initialState, logoutUserActionCreator());

      expect(user).toStrictEqual(initialState);
    });
  });
});
