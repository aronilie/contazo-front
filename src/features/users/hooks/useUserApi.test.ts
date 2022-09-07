import { renderHook } from "@testing-library/react";
import Wrapper from "../../../utils/test-utils/Wrapper";
import { UserData } from "../models/User";
import {
  loginUserActionCreator,
  logoutUserActionCreator,
} from "../slices/userSlice/userSlice";
import useUserApi from "./useUserApi";

const mockUseDispatch = jest.fn();

jest.mock("../../../app/hooks", () => ({
  ...jest.requireActual("../../../app/hooks"),
  useAppDispatch: () => mockUseDispatch,
}));

const mockFetchToken = jest.fn();

jest.mock("../../../utils/auth/auth", () => () => {
  mockFetchToken();
});

const mockUser: UserData = {
  name: "Dan",
  surname: "Abramov",
  email: "dan@test.com",
  phoneNumber: "888555222",
  password: "freesabana",
};

describe("Given a useUserApi hook", () => {
  describe("When register function is called with a User data", () => {
    test("Then it should return the response of the request", async () => {
      const newUser = {
        phoneNumber: "888555222",
        id: "6311947608ed28e35ccabbeb",
      };

      const {
        result: {
          current: { register },
        },
      } = renderHook(useUserApi, { wrapper: Wrapper });

      const result = await register(mockUser);

      expect(result).toStrictEqual(newUser);
    });
  });
});

describe("When login function is called with a phone number and a password", () => {
  test("Then it should call the mockUseDispatch with a loginUserActioncreator", async () => {
    const user =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWQiOiI2MzBkMDBjMTE1MDllNTE2N2JiN2Y1YmIiLCJpYXQiOjE2NjIxMTA0MDJ9.EBtoJh2jDwsMhtv89FuU_O1aYBdKX_CUccvQEue5D4E";
    const loginUser = {
      phoneNumber: "888555222",
      password: "freesabana",
    };
    const {
      result: {
        current: { login },
      },
    } = renderHook(useUserApi, { wrapper: Wrapper });

    await login(loginUser);
    const userToken = mockFetchToken(user);
    expect(mockUseDispatch).toHaveBeenCalledWith(
      loginUserActionCreator(userToken)
    );
  });
});

describe("When logout is called", () => {
  test("Then it should call the mockDispatch with logoutUserActioncreator", async () => {
    const {
      result: {
        current: { logout },
      },
    } = renderHook(useUserApi, { wrapper: Wrapper });
    await logout();

    expect(mockUseDispatch).toHaveBeenCalledWith(logoutUserActionCreator());
  });
});
