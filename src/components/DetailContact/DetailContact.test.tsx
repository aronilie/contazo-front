import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "../../app/store";
import DetailContact from "./DetailContact";
import userEvent from "@testing-library/user-event";
import { Contact } from "../../features/contacts/models/Contact";

const mockDeleteFunction = { deleteContact: jest.fn() };
jest.mock(
  "../../features/contacts/hooks/useContactsApi",
  () => () => mockDeleteFunction
);

describe("Given a DetailContact component", () => {
  describe("When it is instantiated with a contact", () => {
    test("Then it should render the name of the contact", () => {
      const contact = {
        name: "Dan",
        surname: "Abramov",
        email: "dan@test.com",
        phoneNumber: "888555222",
        owner: "owner",
        image: "image",
      };
      const expectedText = contact.name;

      render(
        <BrowserRouter>
          <Provider store={store}>
            <DetailContact contact={contact} />
          </Provider>
        </BrowserRouter>
      );
      const receivedText = screen.getByText(expectedText);

      expect(receivedText).toBeInTheDocument();
    });

    describe("And the contact passed for props have an image", () => {
      test("Then it should render the contact image", () => {
        const contactWithImage: Contact = {
          name: "Dan",
          surname: "Abramov",
          email: "dan@test.com",
          phoneNumber: "888555222",
          owner: "owner",
          backupImage:
            "https://sastdxyrrgemxsyrrbrd.supabase.co/storage/v1/object/public/contazo-images/public/1663070105072-logo.png",
        };

        render(
          <BrowserRouter>
            <Provider store={store}>
              <DetailContact contact={contactWithImage} />
            </Provider>
          </BrowserRouter>
        );
        const receivedImage = screen.getByRole("img", {
          name: "Contact presentation",
        });

        expect(receivedImage).toBeInTheDocument();
      });
    });

    describe("And the user clicks on delete contact button", () => {
      test("Then it should call the deleteContact method", async () => {
        const contact = {
          name: "Dan",
          surname: "Abramov",
          email: "dan@test.com",
          phoneNumber: "888555222",
          owner: "owner",
          image: undefined,
        };

        render(
          <BrowserRouter>
            <Provider store={store}>
              <DetailContact contact={contact} />
            </Provider>
          </BrowserRouter>
        );
        const deleteButton = screen.getByRole("button", {
          name: /delete contact/i,
        });

        await userEvent.click(deleteButton);

        expect(mockDeleteFunction.deleteContact).toBeCalled();
      });
    });
  });
});
