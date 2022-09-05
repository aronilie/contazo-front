import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "../../app/store";
import RegisterPage from "./RegisterPage";

describe("Given a RegisterPage page", () => {
  describe("When it is instantiated", () => {
    test("Then it should show a component Register", () => {
      render(
        <Provider store={store}>
          <RegisterPage />
        </Provider>
      );

      const nameHeading = screen.getByRole("heading");

      expect(nameHeading).toBeInTheDocument();
    });
  });
});
