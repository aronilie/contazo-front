import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "../../app/store";
import LoginPage from "./LoginPage";

describe("Given a LoginPage page", () => {
  describe("When it is instantiated", () => {
    test("Then it should show a component Login", () => {
      render(
        <Provider store={store}>
          <BrowserRouter>
            <LoginPage />
          </BrowserRouter>
        </Provider>
      );

      const nameHeading = screen.getByRole("heading");

      expect(nameHeading).toBeInTheDocument();
    });
  });
});
