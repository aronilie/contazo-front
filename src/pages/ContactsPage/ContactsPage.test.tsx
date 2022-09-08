import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "../../app/store";
import ContactsPage from "./ContactsPage";

describe("Given a ContactsPage component", () => {
  describe("When it is instantiated", () => {
    test("Then it should render the image of a contact", () => {
      render(
        <Provider store={store}>
          <BrowserRouter>
            <ContactsPage />
          </BrowserRouter>
        </Provider>
      );

      const heading = screen.getByRole("img", {
        name: "contact representation",
      });

      expect(heading).toBeInTheDocument();
    });
  });
});
