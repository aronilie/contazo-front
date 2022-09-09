import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import App from "./App";
import { store } from "./app/store";

describe("Given a App component", () => {
  describe("When it is instantiated in home", () => {
    test("Then it should show the RegisterPage page", () => {
      render(
        <MemoryRouter>
          <Provider store={store}>
            <App />
          </Provider>
        </MemoryRouter>
      );

      const heading = screen.getByRole("heading");

      expect(heading).toBeInTheDocument();
    });
  });

  describe("When it is instantiated with a token in localStorage", () => {
    test("Then it should call the getItem loaclStorage function", () => {
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMWEzNDNiOTVlODNlNDliOTVmOTY0NiIsInBob25lTnVtYmVyIjoiNjY2NjY2NjY2IiwiaWF0IjoxNjYyNjYyNzMyfQ.mGWnQzvhonaZDixn47B0Ed2sI9uWNTmgOHak-QLNAGA";

      jest.spyOn(Storage.prototype, "getItem");
      Storage.prototype.getItem = jest.fn(() => token);
      render(
        <MemoryRouter>
          <Provider store={store}>
            <App />
          </Provider>
        </MemoryRouter>
      );

      expect(localStorage.getItem).toHaveBeenCalled();
    });
  });
});
