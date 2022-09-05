import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "../../app/store";
import NotFoundPage from "./NotFoundPage";

describe("Given a NotFoundPage component", () => {
  describe("When it is instantiated", () => {
    test("Then it should render a heading with the text '404'", () => {
      render(
        <Provider store={store}>
          <BrowserRouter>
            <NotFoundPage />
          </BrowserRouter>
        </Provider>
      );

      const heading = screen.getByRole("heading", { name: "404" });

      expect(heading).toBeInTheDocument();
    });
  });
});
