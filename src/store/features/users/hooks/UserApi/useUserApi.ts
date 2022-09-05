import { useAppDispatch } from "../../../../../app/hooks";
import { RegisterUserData, UserData, UserToken } from "../../models/User";
import axios, { AxiosResponse } from "axios";
import fetchToken from "../../../../../utils/auth/auth";
import {
  loginUserActionCreator,
  logoutUserActionCreator,
} from "../../slices/userSlice/userSlice";

export const apiURL = process.env.REACT_APP_USERS_API_URL;

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
      data: { token },
    }: AxiosResponse<UserToken> = await axios.post(
      `${apiURL}users/login`,
      userData
    );
    const user = fetchToken(token);

    localStorage.setItem("token", token);
    dispatch(loginUserActionCreator(user));
  };

  const logout = () => {
    dispatch(logoutUserActionCreator());
    localStorage.removeItem("token");
  };

  return { register, login, logout };
};
export default useUserApi;
