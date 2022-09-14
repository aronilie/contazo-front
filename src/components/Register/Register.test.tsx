import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { store } from "../../app/store";
import Register from "./Register";

let mockRegisterFunction = { register: jest.fn() };
jest.mock(
  "../../features/users/hooks/useUserApi",
  () => () => mockRegisterFunction
);

const route = "/register";

describe("Given a Register component", () => {
  describe("When it is instantiated", () => {
    test("Then it should render a heading, name, surname, email, password and repeatPassword inputs and a submit button", () => {
      render(
        <MemoryRouter initialEntries={[route]}>
          <Provider store={store}>
            <Register />
          </Provider>
        </MemoryRouter>
      );

      const form = [
        screen.getByRole("heading", { name: "Register" }),
        screen.getByLabelText("Name"),
        screen.getByLabelText("Surname"),
        screen.getByLabelText("Email address"),
        screen.getByLabelText("Password"),
        screen.getByLabelText("Repeat password"),
        screen.getByRole("button", { name: "Register" }),
      ];

      form.forEach((input) => expect(input).toBeInTheDocument());
    });

    test("Then it should call the mockRegister function with the new text", async () => {
      const newText = "test@prove";
      const newNumber = 674218987;
      render(
        <MemoryRouter initialEntries={[route]}>
          <Register />
        </MemoryRouter>
      );

      const form = {
        name: screen.getByLabelText("Name") as HTMLInputElement,
        surname: screen.getByLabelText("Surname") as HTMLInputElement,
        email: screen.getByLabelText("Email address") as HTMLInputElement,
        phoneNumber: screen.getByLabelText("Phone number") as HTMLInputElement,
        passwd: screen.getByLabelText("Password") as HTMLInputElement,
        repeatPassword: screen.getByLabelText(
          "Repeat password"
        ) as HTMLInputElement,
      };

      await userEvent.type(form.name, newText);
      await userEvent.type(form.surname, newText);
      await userEvent.type(form.email, newText);
      await userEvent.type(form.phoneNumber, newNumber.toString());
      await userEvent.type(form.passwd, newText);
      await userEvent.type(form.repeatPassword, newText);

      const submit = screen.getByRole("button", { name: "Register" });
      await userEvent.click(submit);
      const registerData = {
        name: newText,
        surname: newText,
        email: newText,
        phoneNumber: newNumber.toString(),
        password: newText,
      };

      expect(mockRegisterFunction.register).toHaveBeenCalledWith(registerData);
    });

    describe("And the inputs are password: 'registerTest' and the number: '674218987'", () => {
      test("Then it should render a phoneNumber, password and repeatPassword inputs with the text", async () => {
        const newText = "registerTest";
        const newNumber = 674218987;
        render(
          <MemoryRouter initialEntries={[route]}>
            <Register />
          </MemoryRouter>
        );
        const form = {
          phoneNumber: screen.getByRole("spinbutton", {
            name: /phone number/i,
          }) as HTMLInputElement,
          password: screen.getByLabelText("Password") as HTMLInputElement,
          repeatPassword: screen.getByLabelText(
            "Repeat password"
          ) as HTMLInputElement,
        };

        await userEvent.type(form.phoneNumber, newNumber.toString());
        await userEvent.type(form.password, newText);
        await userEvent.type(form.repeatPassword, newText);

        expect(form.phoneNumber.value).toEqual(newNumber.toString());
        expect(form.password.value).toBe(newText);
        expect(form.repeatPassword.value).toBe(newText);
      });
    });

    describe("And the value of one or more inputs are not introduced", () => {
      test("Then the button should be disabled", async () => {
        const text = "test text";
        render(
          <MemoryRouter initialEntries={[route]}>
            <Register />
          </MemoryRouter>
        );
        const form = {
          name: screen.getByLabelText("Name") as HTMLInputElement,
          surname: screen.getByLabelText("Surname") as HTMLInputElement,
          email: screen.getByLabelText("Email address") as HTMLInputElement,
          phoneNumber: screen.getByLabelText(
            "Phone number"
          ) as HTMLInputElement,
          password: screen.getByLabelText("Password") as HTMLInputElement,
          repeatPassword: screen.getByLabelText(
            "Repeat password"
          ) as HTMLInputElement,
        };
        const button = screen.getByRole("button", { name: "Register" });

        await userEvent.type(form.name, text);
        await userEvent.type(form.surname, text);
        await userEvent.type(form.email, text);
        await userEvent.type(form.password, text);
        await userEvent.type(form.repeatPassword, text);

        expect(button).toBeDisabled();
      });

      test("Then the button should not be fully visible", async () => {
        const text = "test";
        const number = 888555888;
        render(
          <MemoryRouter initialEntries={[route]}>
            <Register />
          </MemoryRouter>
        );
        const form = {
          name: screen.getByLabelText("Name") as HTMLInputElement,
          surname: screen.getByLabelText("Surname") as HTMLInputElement,
          email: screen.getByLabelText("Email address") as HTMLInputElement,
          phoneNumber: screen.getByLabelText(
            "Phone number"
          ) as HTMLInputElement,
          password: screen.getByLabelText("Password") as HTMLInputElement,
          repeatPassword: screen.getByLabelText(
            "Repeat password"
          ) as HTMLInputElement,
        };
        const button = screen.getByRole("button", { name: "Register" });

        await userEvent.type(form.name, text);
        await userEvent.type(form.surname, text);
        await userEvent.type(form.email, text);
        await userEvent.type(form.phoneNumber, number.toString());
        await userEvent.type(form.password, text);
        await userEvent.type(form.repeatPassword, text);

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
          <MemoryRouter initialEntries={[route]}>
            <Register />
          </MemoryRouter>
        );
        const form = {
          name: screen.getByLabelText("Name") as HTMLInputElement,
          surname: screen.getByLabelText("Surname") as HTMLInputElement,
          email: screen.getByLabelText("Email address") as HTMLInputElement,
          phoneNumber: screen.getByLabelText(
            "Phone number"
          ) as HTMLInputElement,
          password: screen.getByLabelText("Password") as HTMLInputElement,
          repeatPassword: screen.getByLabelText(
            "Repeat password"
          ) as HTMLInputElement,
        };

        await userEvent.type(form.name, password);
        await userEvent.type(form.surname, password);
        await userEvent.type(form.email, email);
        await userEvent.type(form.phoneNumber, number.toString());
        await userEvent.type(form.password, password);
        await userEvent.type(form.repeatPassword, password);

        const submit = screen.getByRole("button", { name: "Register" });
        await userEvent.click(submit);

        expect(mockRegisterFunction.register).not.toHaveBeenCalled();
      });
    });

    describe("And the user type a phone number with less than 9 characters", () => {
      test("Then it shouldn't call the mockRegister function", async () => {
        const password = "password";
        const email = "email@test.com";
        const number = 555;

        render(
          <MemoryRouter initialEntries={[route]}>
            <Register />
          </MemoryRouter>
        );
        const form = {
          name: screen.getByLabelText("Name") as HTMLInputElement,
          surname: screen.getByLabelText("Surname") as HTMLInputElement,
          email: screen.getByLabelText("Email address") as HTMLInputElement,
          phoneNumber: screen.getByLabelText(
            "Phone number"
          ) as HTMLInputElement,
          password: screen.getByLabelText("Password") as HTMLInputElement,
          repeatPassword: screen.getByLabelText(
            "Repeat password"
          ) as HTMLInputElement,
        };

        await userEvent.type(form.name, password);
        await userEvent.type(form.surname, password);
        await userEvent.type(form.email, email);
        await userEvent.type(form.phoneNumber, number.toString());
        await userEvent.type(form.password, password);
        await userEvent.type(form.repeatPassword, password);

        const submit = screen.getByRole("button", { name: "Register" });
        await userEvent.click(submit);

        expect(mockRegisterFunction.register).not.toHaveBeenCalled();
      });
    });

    describe("And the user type a password with less than 8 characters", () => {
      test("Then it shouldn't call the mockRegister function", async () => {
        const password = "passwd";
        const email = "email@test.com";
        const number = 555000888;
        render(
          <MemoryRouter initialEntries={[route]}>
            <Register />
          </MemoryRouter>
        );
        const form = {
          name: screen.getByLabelText("Name") as HTMLInputElement,
          surname: screen.getByLabelText("Surname") as HTMLInputElement,
          email: screen.getByLabelText("Email address") as HTMLInputElement,
          phoneNumber: screen.getByLabelText(
            "Phone number"
          ) as HTMLInputElement,
          password: screen.getByLabelText("Password") as HTMLInputElement,
          repeatPassword: screen.getByLabelText(
            "Repeat password"
          ) as HTMLInputElement,
        };

        await userEvent.type(form.name, password);
        await userEvent.type(form.surname, password);
        await userEvent.type(form.email, email);
        await userEvent.type(form.phoneNumber, number.toString());
        await userEvent.type(form.password, password);
        await userEvent.type(form.repeatPassword, password);

        const submit = screen.getByRole("button", { name: "Register" });
        await userEvent.click(submit);

        expect(mockRegisterFunction.register).not.toHaveBeenCalled();
      });
    });

    describe("And the user type different passwords", () => {
      test("Then it shouldn't call the mockRegister function", async () => {
        const password = "password";
        const repeatPassword = "wrong password";
        const email = "email@test.com";
        const number = 555000888;
        render(
          <MemoryRouter initialEntries={[route]}>
            <Register />
          </MemoryRouter>
        );
        const form = {
          name: screen.getByLabelText("Name") as HTMLInputElement,
          surname: screen.getByLabelText("Surname") as HTMLInputElement,
          email: screen.getByLabelText("Email address") as HTMLInputElement,
          phoneNumber: screen.getByLabelText(
            "Phone number"
          ) as HTMLInputElement,
          password: screen.getByLabelText("Password") as HTMLInputElement,
          repeatPassword: screen.getByLabelText(
            "Repeat password"
          ) as HTMLInputElement,
        };

        await userEvent.type(form.name, password);
        await userEvent.type(form.surname, password);
        await userEvent.type(form.email, email);
        await userEvent.type(form.phoneNumber, number.toString());
        await userEvent.type(form.password, password);
        await userEvent.type(form.repeatPassword, repeatPassword);

        const submit = screen.getByRole("button", { name: "Register" });
        await userEvent.click(submit);

        expect(mockRegisterFunction.register).not.toHaveBeenCalled();
      });
    });

    describe("And the user type a phone number already taken", () => {
      test("Then it should render the error message 'Phone number already taken.'", async () => {
        mockRegisterFunction = {
          register: jest.fn().mockRejectedValue(new Error()),
        };
        const errorText = "Phone number already taken.";
        const newText = "test@prove";
        const newNumber = 674218987;
        render(
          <MemoryRouter initialEntries={[route]}>
            <Register />
          </MemoryRouter>
        );

        const form = {
          name: screen.getByLabelText("Name") as HTMLInputElement,
          surname: screen.getByLabelText("Surname") as HTMLInputElement,
          email: screen.getByLabelText("Email address") as HTMLInputElement,
          phoneNumber: screen.getByLabelText(
            "Phone number"
          ) as HTMLInputElement,
          passwd: screen.getByLabelText("Password") as HTMLInputElement,
          repeatPassword: screen.getByLabelText(
            "Repeat password"
          ) as HTMLInputElement,
        };

        await userEvent.type(form.name, newText);
        await userEvent.type(form.surname, newText);
        await userEvent.type(form.email, newText);
        await userEvent.type(form.phoneNumber, newNumber.toString());
        await userEvent.type(form.passwd, newText);
        await userEvent.type(form.repeatPassword, newText);

        const submit = screen.getByRole("button", { name: "Register" });
        await userEvent.click(submit);

        let expectedError: HTMLElement;

        setTimeout(() => {
          expectedError = screen.getByText(errorText);
        }, 1000);

        setTimeout(() => {
          expect(expectedError).toBeInTheDocument();
        }, 1200);
      });
    });
  });
});
