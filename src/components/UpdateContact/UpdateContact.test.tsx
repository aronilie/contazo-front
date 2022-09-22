import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { store } from "../../app/store";
import * as router from "react-router";
import UpdateContact from "./UpdateContact";

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

const mockUpdateFunction = { updateContact: jest.fn() };
jest.mock(
  "../../features/contacts/hooks/useContactsApi",
  () => () => mockUpdateFunction
);

const mockUseDispatch = jest.fn();

jest.mock("../../app/hooks", () => ({
  ...jest.requireActual("../../app/hooks"),
  useAppDispatch: () => mockUseDispatch,
}));

const navigate = jest.fn();

beforeEach(() => {
  jest.spyOn(router, "useNavigate").mockImplementation(() => navigate);
});

describe("Given a UpdateContact component", () => {
  describe("When it is instantiated", () => {
    test("Then it should render a heading, name, surname, email inputs and a submit button", () => {
      render(
        <MemoryRouter>
          <Provider store={store}>
            <UpdateContact contact={contact} />
          </Provider>
        </MemoryRouter>
      );

      const form = [
        screen.getByRole("heading", { name: "Edit contact" }),
        screen.getByLabelText("Name"),
        screen.getByLabelText("Surname"),
        screen.getByLabelText("Email address"),
        screen.getByRole("button", { name: "Save" }),
      ];

      form.forEach((input) => expect(input).toBeInTheDocument());
    });

    test("Then it should call the navigate function", async () => {
      const newText = "test@prove";
      const newNumber = 888555222;

      render(
        <MemoryRouter>
          <Provider store={store}>
            <UpdateContact contact={contact} />
          </Provider>
        </MemoryRouter>
      );

      const form = {
        name: screen.getByLabelText("Name") as HTMLInputElement,
        surname: screen.getByLabelText("Surname") as HTMLInputElement,
        email: screen.getByLabelText("Email address") as HTMLInputElement,
        phoneNumber: screen.getByLabelText(
          "Phone number *"
        ) as HTMLInputElement,
      };
      await userEvent.type(form.name, newText);
      await userEvent.type(form.surname, newText);
      await userEvent.type(form.email, newText);
      await userEvent.type(form.phoneNumber, newNumber.toString());

      const submit = screen.getByRole("button", { name: "Save" });
      await userEvent.click(submit);

      expect(navigate).toHaveBeenCalledTimes(1);
    });

    test("Then it should call the mockUpdate function", async () => {
      const newText = "test@prove";
      const newNumber = 888555222;

      render(
        <MemoryRouter>
          <Provider store={store}>
            <UpdateContact contact={contact} />
          </Provider>
        </MemoryRouter>
      );

      const form = {
        name: screen.getByLabelText("Name") as HTMLInputElement,
        surname: screen.getByLabelText("Surname") as HTMLInputElement,
        email: screen.getByLabelText("Email address") as HTMLInputElement,
        phoneNumber: screen.getByLabelText(
          "Phone number *"
        ) as HTMLInputElement,
        image: screen.getByTestId("upload-file"),
      };
      await userEvent.type(form.name, newText);
      await userEvent.type(form.surname, newText);
      await userEvent.type(form.email, newText);
      await userEvent.type(form.phoneNumber, newNumber.toString());
      await userEvent.upload(form.image, new File([""], ""));

      const submit = screen.getByRole("button", { name: "Save" });
      await userEvent.click(submit);

      expect(mockUpdateFunction.updateContact).toHaveBeenCalled();
    });

    describe("And the input is the number: '674218987'", () => {
      test("Then it should render a phoneNumber with the text", async () => {
        const newNumber = 674218987;
        render(
          <MemoryRouter>
            <Provider store={store}>
              <UpdateContact contact={contact} />
            </Provider>
          </MemoryRouter>
        );

        const form = {
          phoneNumber: screen.getByRole("spinbutton", {
            name: /phone number/i,
          }) as HTMLInputElement,
        };
        await userEvent.clear(form.phoneNumber);
        await userEvent.type(form.phoneNumber, newNumber.toString());

        expect(form.phoneNumber.value).toEqual(newNumber.toString());
      });
    });

    describe("And the value of the phone number is empty", () => {
      test("Then the button should be disabled", async () => {
        render(
          <MemoryRouter>
            <Provider store={store}>
              <UpdateContact contact={contact} />
            </Provider>
          </MemoryRouter>
        );
        const phoneNumber = screen.getByLabelText(
          "Phone number *"
        ) as HTMLInputElement;

        const button = screen.getByRole("button", { name: "Save" });
        await userEvent.clear(phoneNumber);

        expect(button).toBeDisabled();
      });

      test("Then the button should not be fully visible", async () => {
        render(
          <MemoryRouter>
            <Provider store={store}>
              <UpdateContact contact={contact} />
            </Provider>
          </MemoryRouter>
        );
        const phoneNumber = screen.getByLabelText(
          "Phone number *"
        ) as HTMLInputElement;

        const button = screen.getByRole("button", { name: "Save" });
        await userEvent.clear(phoneNumber);

        expect(button).toHaveClass("form__button ");
      });
    });

    describe("And the user type an email without the '@' character", () => {
      test("Then it shouldn't call mockUpdate function", async () => {
        const email = "email";
        const number = 555000888;
        render(
          <MemoryRouter>
            <Provider store={store}>
              <UpdateContact contact={contact} />
            </Provider>
          </MemoryRouter>
        );
        const form = {
          email: screen.getByLabelText("Email address") as HTMLInputElement,
          phoneNumber: screen.getByLabelText(
            "Phone number *"
          ) as HTMLInputElement,
        };

        await userEvent.clear(form.email);
        await userEvent.type(form.email, email);
        await userEvent.clear(form.phoneNumber);
        await userEvent.type(form.phoneNumber, number.toString());

        const submit = screen.getByRole("button", { name: "Save" });
        await userEvent.click(submit);

        expect(mockUpdateFunction.updateContact).not.toHaveBeenCalled();
      });
    });

    describe("And the user type a phone number with less than 9 characters", () => {
      test("Then it shouldn't call the mockUpdate function", async () => {
        const number = 555;

        render(
          <MemoryRouter>
            <Provider store={store}>
              <UpdateContact contact={contact} />
            </Provider>
          </MemoryRouter>
        );
        const phoneNumber = screen.getByLabelText(
          "Phone number *"
        ) as HTMLInputElement;

        await userEvent.clear(phoneNumber);
        await userEvent.type(phoneNumber, number.toString());

        const submit = screen.getByRole("button", { name: "Save" });
        await userEvent.click(submit);

        expect(mockUpdateFunction.updateContact).not.toHaveBeenCalled();
      });
    });

    describe("And the user don't type a name and a surname", () => {
      test("Then it should call the mockUpdate function", async () => {
        render(
          <MemoryRouter>
            <Provider store={store}>
              <UpdateContact contact={contact} />
            </Provider>
          </MemoryRouter>
        );

        const form = {
          name: screen.getByLabelText("Name"),
          surname: screen.getByLabelText("Surname"),
          image: screen.getByTestId("upload-file"),
        };
        await userEvent.upload(form.image, new File([""], ""));
        await userEvent.clear(form.name);
        await userEvent.clear(form.surname);
        const submit = screen.getByRole("button", { name: "Save" });
        await userEvent.click(submit);

        expect(mockUpdateFunction.updateContact).toHaveBeenCalled();
      });
    });

    describe("And the user clicks on the return arrow icon", () => {
      test("Then it should call the navigate function", async () => {
        render(
          <MemoryRouter>
            <Provider store={store}>
              <UpdateContact contact={contact} />
            </Provider>
          </MemoryRouter>
        );

        const icon = screen.getByTestId("return-icon");
        await userEvent.click(icon);

        expect(navigate).toHaveBeenCalledTimes(1);
      });
    });
  });
});
