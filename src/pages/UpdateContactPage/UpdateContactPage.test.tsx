import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "../../app/store";
import UpdateContactPage from "./UpdateContactPage";

const contact = {
  name: "Dan",
  surname: "Abramov",
  email: "dan@test.com",
  phoneNumber: "888555222",
  owner: "owner",
};

let mockGetByPhoneNumberFunction = {
  getContactByPhoneNumber: jest.fn().mockReturnValue(contact),
};
jest.mock(
  "../../features/contacts/hooks/useContactsApi",
  () => () => mockGetByPhoneNumberFunction
);

describe("Given a DetailContactPage component", () => {
  describe("When it is instantiated", () => {
    test.only("Then it should render the name of the contact passed for props", async () => {
      render(
        <BrowserRouter>
          <Provider store={store}>
            <UpdateContactPage />
          </Provider>
        </BrowserRouter>
      );

      let expectedText: HTMLElement;

      setTimeout(() => {
        expectedText = screen.getByText(contact.name);
      }, 1000);

      setTimeout(() => {
        expect(expectedText).toBeInTheDocument();
      }, 2000);
    });
  });
});
