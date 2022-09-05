import jwt_decode from "jwt-decode";
import fetchToken from "./auth";

jest.mock("jwt-decode", () => jest.fn());

describe("Given a fetchToken function", () => {
  describe("When called with a token (string) as an argument", () => {
    test("Then it should call a jwt decode function and return its value", () => {
      const token = "1a2b3c";

      (jwt_decode as jest.Mock).mockImplementationOnce(() => ({ token }));
      fetchToken(token);

      expect(jwt_decode).toHaveBeenCalledWith(token);
    });
  });
});
