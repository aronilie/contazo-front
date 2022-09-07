import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import Login from "./Login";

let mockLoginFunction = { login: jest.fn() };
jest.mock(
  "../../features/users/hooks/useUserApi",
  () => () => mockLoginFunction
);

const route = "/login";

describe("Given a Register component", () => {
  describe("When it is instantiated", () => {
    test("Then it should render a 'Login' heading, phoneNumber and password inputs and a submit button", () => {
      render(
        <MemoryRouter initialEntries={[route]}>
          <Login />
        </MemoryRouter>
      );

      const form = [
        screen.getByRole("heading", { name: "Login" }),
        screen.getByLabelText("Phone number"),
        screen.getByLabelText("Password"),
        screen.getByRole("button", { name: "Login" }),
      ];

      form.forEach((input) => expect(input).toBeInTheDocument());
    });

    test("Then it should call the mockLogin function with the new text", async () => {
      const newText = "test@prove";
      const newNumber = 674218987;
      render(
        <MemoryRouter initialEntries={[route]}>
          <Login />
        </MemoryRouter>
      );

      const form = {
        phoneNumber: screen.getByLabelText("Phone number") as HTMLInputElement,
        passwd: screen.getByLabelText("Password") as HTMLInputElement,
      };

      await userEvent.type(form.phoneNumber, newNumber.toString());
      await userEvent.type(form.passwd, newText);

      const submit = screen.getByRole("button", { name: "Login" });
      await userEvent.click(submit);
      const loginData = {
        phoneNumber: newNumber.toString(),
        password: newText,
      };

      expect(mockLoginFunction.login).toHaveBeenCalledWith(loginData);
    });

    describe("And the inputs are password: 'registerTest' and the number: '674218987'", () => {
      test("Then it should render a phoneNumber and password inputs with the text", async () => {
        const newText = "registerTest";
        const newNumber = 674218987;
        render(
          <MemoryRouter initialEntries={[route]}>
            <Login />
          </MemoryRouter>
        );
        const form = {
          phoneNumber: screen.getByRole("spinbutton", {
            name: /phone number/i,
          }) as HTMLInputElement,
          password: screen.getByLabelText("Password") as HTMLInputElement,
        };

        await userEvent.type(form.phoneNumber, newNumber.toString());
        await userEvent.type(form.password, newText);

        expect(form.phoneNumber.value).toEqual(newNumber.toString());
        expect(form.password.value).toBe(newText);
      });
    });

    describe("And the value of one or more inputs are not introduced", () => {
      test("Then the button should be disabled", async () => {
        const text = "test text";
        render(
          <MemoryRouter initialEntries={[route]}>
            <Login />
          </MemoryRouter>
        );
        const form = {
          phoneNumber: screen.getByLabelText(
            "Phone number"
          ) as HTMLInputElement,
          password: screen.getByLabelText("Password") as HTMLInputElement,
        };
        const button = screen.getByRole("button", { name: "Login" });

        await userEvent.type(form.password, text);

        expect(button).toBeDisabled();
      });

      test("Then the button should not be fully visible", async () => {
        const text = "test";
        const number = 888555888;
        render(
          <MemoryRouter initialEntries={[route]}>
            <Login />
          </MemoryRouter>
        );
        const form = {
          phoneNumber: screen.getByLabelText(
            "Phone number"
          ) as HTMLInputElement,
          password: screen.getByLabelText("Password") as HTMLInputElement,
        };
        const button = screen.getByRole("button", { name: "Login" });

        await userEvent.type(form.phoneNumber, number.toString());
        await userEvent.type(form.password, text);

        await userEvent.clear(form.phoneNumber);

        expect(button).toHaveClass("form__button ");
      });
    });

    describe("And the user type an incorrect phoneNumber or password", () => {
      test("Then it should show a message error 'Invalid phone number or password.'", async () => {
        mockLoginFunction = { login: jest.fn().mockRejectedValue(new Error()) };
        const text = "Invalid phone number or password.";
        const number = "618035777";
        const password = "passwordtest";
        render(
          <MemoryRouter initialEntries={[route]}>
            <Login />
          </MemoryRouter>
        );
        const form = {
          phoneNumber: screen.getByLabelText(
            "Phone number"
          ) as HTMLInputElement,
          password: screen.getByLabelText("Password") as HTMLInputElement,
        };

        fireEvent.change(form.phoneNumber, { target: { value: number } });
        fireEvent.change(form.password, { target: { value: password } });
        const submit = screen.getByRole("button", { name: "Login" });
        await userEvent.click(submit);

        const showedText = screen.getByText(text);

        expect(showedText).toBeInTheDocument();
      });
    });
  });
});
