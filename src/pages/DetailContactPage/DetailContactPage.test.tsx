import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "../../app/store";
import DetailContactPage from "./DetailContactPage";

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
    test("Then it should render the information of the contact passed for props", () => {
      render(
        <BrowserRouter>
          <Provider store={store}>
            <DetailContactPage />
          </Provider>
        </BrowserRouter>
      );

      const expectedText = screen.getByText("Contacts");

      expect(expectedText).toBeInTheDocument();
    });
  });
});
