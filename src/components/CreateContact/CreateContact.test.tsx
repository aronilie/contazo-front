import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { store } from "../../app/store";
import CreateContact from "./CreateContact";
import * as router from "react-router";

const mockCreateFunction = { createContact: jest.fn() };
jest.mock(
  "../../features/contacts/hooks/useContactsApi",
  () => () => mockCreateFunction
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

describe("Given a CreateContact component", () => {
  describe("When it is instantiated", () => {
    test("Then it should render a heading, name, surname, email inputs and a submit button", () => {
      render(
        <MemoryRouter>
          <Provider store={store}>
            <CreateContact />
          </Provider>
        </MemoryRouter>
      );

      const form = [
        screen.getByRole("heading", { name: "Create contact" }),
        screen.getByLabelText("Name"),
        screen.getByLabelText("Surname"),
        screen.getByLabelText("Email address"),
        screen.getByRole("button", { name: "Create contact" }),
      ];

      form.forEach((input) => expect(input).toBeInTheDocument());
    });

    test("Then it should call the navigate function", async () => {
      const newText = "test@prove";
      const newNumber = 888555222;

      render(
        <MemoryRouter>
          <Provider store={store}>
            <CreateContact />
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

      const submit = screen.getByRole("button", { name: "Create contact" });
      await userEvent.click(submit);

      expect(navigate).toHaveBeenCalledTimes(1);
    });

    test("Then it should call the mockCreate function", async () => {
      const newText = "test@prove";
      const newNumber = 888555222;

      render(
        <MemoryRouter>
          <Provider store={store}>
            <CreateContact />
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

      const submit = screen.getByRole("button", { name: "Create contact" });
      await userEvent.click(submit);

      expect(mockCreateFunction.createContact).toHaveBeenCalled();
    });

    describe("And the input is the number: '674218987'", () => {
      test("Then it should render a phoneNumber with the text", async () => {
        const newNumber = 674218987;
        render(
          <MemoryRouter>
            <Provider store={store}>
              <CreateContact />
            </Provider>
          </MemoryRouter>
        );

        const form = {
          phoneNumber: screen.getByRole("spinbutton", {
            name: /phone number/i,
          }) as HTMLInputElement,
        };
        await userEvent.type(form.phoneNumber, newNumber.toString());

        expect(form.phoneNumber.value).toEqual(newNumber.toString());
      });
    });

    describe("And the value of one or more inputs are not introduced", () => {
      test("Then the button should be disabled", async () => {
        const text = "test text";
        render(
          <MemoryRouter>
            <Provider store={store}>
              <CreateContact />
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
        const button = screen.getByRole("button", { name: "Create contact" });

        await userEvent.type(form.name, text);
        await userEvent.type(form.surname, text);
        await userEvent.type(form.email, text);

        expect(button).toBeDisabled();
      });

      test("Then the button should not be fully visible", async () => {
        const text = "test";
        const number = 888555888;
        render(
          <MemoryRouter>
            <Provider store={store}>
              <CreateContact />
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
        const button = screen.getByRole("button", { name: "Create contact" });

        await userEvent.type(form.name, text);
        await userEvent.type(form.surname, text);
        await userEvent.type(form.email, text);
        await userEvent.type(form.phoneNumber, number.toString());

        await userEvent.clear(form.phoneNumber);

        expect(button).toHaveClass("form__button ");
      });
    });

    describe("And the user type an email without the '@' character", () => {
      test("Then it shouldn't call mockRegister function", async () => {
        const password = "password";
        const email = "email";
        const number = 555000888;
        render(
          <MemoryRouter>
            <Provider store={store}>
              <CreateContact />
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

        await userEvent.type(form.name, password);
        await userEvent.type(form.surname, password);
        await userEvent.type(form.email, email);
        await userEvent.type(form.phoneNumber, number.toString());

        const submit = screen.getByRole("button", { name: "Create contact" });
        await userEvent.click(submit);

        expect(mockCreateFunction.createContact).not.toHaveBeenCalled();
      });
    });

    describe("And the user type a phone number with less than 9 characters", () => {
      test("Then it shouldn't call the mockRegister function", async () => {
        const password = "password";
        const email = "email@test.com";
        const number = 555;

        render(
          <MemoryRouter>
            <Provider store={store}>
              <CreateContact />
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

        await userEvent.type(form.name, password);
        await userEvent.type(form.surname, password);
        await userEvent.type(form.email, email);
        await userEvent.type(form.phoneNumber, number.toString());

        const submit = screen.getByRole("button", { name: "Create contact" });
        await userEvent.click(submit);

        expect(mockCreateFunction.createContact).not.toHaveBeenCalled();
      });
    });

    describe("And the user don't type a name and a surname", () => {
      test("Then it should call the mockRegister function", async () => {
        const newText = "test@prove";
        const newNumber = 888555222;

        render(
          <MemoryRouter>
            <Provider store={store}>
              <CreateContact />
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
        await userEvent.type(form.email, newText);
        await userEvent.type(form.phoneNumber, newNumber.toString());
        await userEvent.upload(form.image, new File([""], ""));

        const submit = screen.getByRole("button", { name: "Create contact" });
        await userEvent.click(submit);

        expect(mockCreateFunction.createContact).toHaveBeenCalled();
      });
    });
  });
});
