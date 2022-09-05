import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import App from "./App";
import { store } from "./app/store";

describe("Given a App component", () => {
  describe("When it is instantiated in home", () => {
    test("Then it should show the RegisterPage page", () => {
      const route = "/register";

      render(
        <MemoryRouter initialEntries={[route]}>
          <Provider store={store}>
            <App />
          </Provider>
        </MemoryRouter>
      );

      const heading = screen.getByRole("heading");

      expect(heading).toBeInTheDocument();
    });
  });
});
