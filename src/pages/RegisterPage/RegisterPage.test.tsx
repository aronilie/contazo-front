import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { store } from "../../app/store";
import RegisterPage from "./RegisterPage";

const route = "/register";

describe("Given a RegisterPage page", () => {
  describe("When it is instantiated", () => {
    test("Then it should show a component Register", () => {
      render(
        <MemoryRouter initialEntries={[route]}>
          <Provider store={store}>
            <RegisterPage />
          </Provider>
        </MemoryRouter>
      );

      const nameHeading = screen.getByRole("heading");

      expect(nameHeading).toBeInTheDocument();
    });
  });
});
