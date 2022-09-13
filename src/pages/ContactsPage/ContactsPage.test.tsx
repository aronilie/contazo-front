import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "../../app/store";
import ContactsPage from "./ContactsPage";

describe("Given a ContactsPage component", () => {
  describe("When it is instantiated", () => {
    test("Then it should render the text 'You have no contacts yet! 😢'", () => {
      render(
        <Provider store={store}>
          <BrowserRouter>
            <ContactsPage />
          </BrowserRouter>
        </Provider>
      );

      const heading = screen.getByText("You have no contacts yet! 😢");

      expect(heading).toBeInTheDocument();
    });
  });
});
