import IndividualContact from "./IndividualContact";
import { render, screen } from "@testing-library/react";
import * as router from "react-router";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../../app/store";

const contact = {
  name: "Dan",
  surname: "Abramov",
  email: "dan@test.com",
  phoneNumber: "888555222",
  owner: "owner",
};

const navigate = jest.fn();
beforeEach(() => {
  jest.spyOn(router, "useNavigate").mockImplementation(() => navigate);
});

const mockDeleteFunction = { deleteContact: jest.fn() };
jest.mock(
  "../../features/contacts/hooks/useContactsApi",
  () => () => mockDeleteFunction
);

describe("Given a IndividualContact component", () => {
  describe("When it is instantiated with a contact", () => {
    test("Then it should render the 'email' and the 'phoneNumber' of the contact", async () => {
      render(
        <BrowserRouter>
          <Provider store={store}>
            <IndividualContact contact={contact} />
          </Provider>
        </BrowserRouter>
      );

      const phoneNumber = screen.getByText("888555222");
      const email = screen.getByText("dan@test.com");

      expect(phoneNumber).toBeInTheDocument();
      expect(email).toBeInTheDocument();
    });

    describe("And the user clicks in one contact", () => {
      test("Then it should navigate to the contact details page", async () => {
        render(
          <BrowserRouter>
            <Provider store={store}>
              <IndividualContact contact={contact} />
            </Provider>
          </BrowserRouter>
        );

        const contactReceived = screen.getByText("Dan");
        await userEvent.click(contactReceived);

        expect(navigate).toHaveBeenCalledTimes(1);
      });
    });

    describe("And the user clicks in the delete icon", () => {
      test("Then it should call the deleteContact function", async () => {
        render(
          <BrowserRouter>
            <Provider store={store}>
              <IndividualContact contact={contact} />
            </Provider>
          </BrowserRouter>
        );

        const deleteIcon = screen.getByTestId("icon");
        await userEvent.click(deleteIcon);

        expect(mockDeleteFunction.deleteContact).toHaveBeenCalledTimes(1);
      });
    });
  });
});
