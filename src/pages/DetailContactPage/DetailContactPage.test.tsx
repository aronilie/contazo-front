import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "../../app/store";
import DetailContactPage from "./DetailContactPage";

describe("Given a DetailContactPage component", () => {
  describe("When it is instantiated", () => {
    test("Then it should show the text of navigation 'Contacts'", () => {
      render(
        <Provider store={store}>
          <BrowserRouter>
            <DetailContactPage />
          </BrowserRouter>
        </Provider>
      );

      const expectedText = screen.getByText("Contacts");

      expect(expectedText).toBeInTheDocument();
    });
  });
});
