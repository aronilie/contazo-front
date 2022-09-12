import { render, screen } from "@testing-library/react";
import * as router from "react-router";
import Header from "./Header";
import userEvent from "@testing-library/user-event";
import Wrapper from "../../utils/test-utils/Wrapper";

const mockLogout = jest.fn();

jest.mock("../../features/users/hooks/useUserApi", () => () => ({
  logout: mockLogout,
}));

const mockNavigate = jest.fn();

beforeEach(() => {
  jest.spyOn(router, "useNavigate").mockImplementation(() => mockNavigate);
});

describe("Given a Header component", () => {
  describe("When it is instantiated with path 'contacts'", () => {
    test("Then it should render a clickeable 'logout' link", async () => {
      const mockLocation = {
        pathname: "/contacts",
        Location: "",
        key: "",
        search: "",
        hash: "",
        state: "",
      };

      jest.spyOn(router, "useLocation").mockImplementation(() => mockLocation);

      render(<Header />, { wrapper: Wrapper });

      const link = screen.getByRole("link", {
        name: /logout/i,
      });

      await userEvent.click(link);

      expect(mockNavigate).toHaveBeenCalled();
    });
  });
});
