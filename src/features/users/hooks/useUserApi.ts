import { useAppDispatch } from "../../../app/hooks";
import { RegisterUserData, UserData, UserToken } from "../models/User";
import axios, { AxiosResponse } from "axios";
import fetchToken from "../../../utils/auth/auth";
import {
  loginUserActionCreator,
  logoutUserActionCreator,
} from "../slices/userSlice/userSlice";

const apiURL = process.env.REACT_APP_API_URL;

const useUserApi = () => {
  const dispatch = useAppDispatch();

  const register = async (userData: UserData) => {
    const response: AxiosResponse<RegisterUserData> = await axios.post(
      `${apiURL}users/register`,
      userData
    );

    return response.data;
  };

  const login = async (userData: UserData) => {
    const {
      data: {
        user: { token },
      },
    }: AxiosResponse<UserToken> = await axios.post(
      `${apiURL}users/login`,
      userData
    );
    const user = fetchToken(token);

    dispatch(loginUserActionCreator(user));

    localStorage.setItem("token", token);
  };

  const logout = () => {
    dispatch(logoutUserActionCreator());
    localStorage.removeItem("token");
  };

  return { register, login, logout };
};
export default useUserApi;
