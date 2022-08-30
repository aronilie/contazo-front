import axios from "axios";
import RegisterUserData from "../../model/User";
import useUserApi, { apiURL } from "./useUserApi";

jest.mock("axios");

describe("Given a useUserApi hook", () => {
  describe("When invoke register function with a mockUser", () => {
    test("Then it should post a new user", async () => {
      const mockUser: RegisterUserData = {
        phoneNumber: "+44 654 258 22",
        password: "test",
      };

      const { register } = useUserApi();
      await register(mockUser);

      expect(axios.post).toHaveBeenCalledWith(
        `${apiURL}users/register`,
        mockUser
      );
    });
  });
});
