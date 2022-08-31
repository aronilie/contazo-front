import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Register from "./Register";

const mockRegisterFunction = { register: jest.fn() };
jest.mock(
  "../../store/features/users/hooks/UserApi/useUserApi",
  () => () => mockRegisterFunction
);

describe("Given a Register component", () => {
  describe("When it is instantiated", () => {
    test("Then it should render a heading, name, surname, email, password and repeatPassword inputs and a submit button", () => {
      render(<Register />);

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
  });

  describe("When it is instantiated with text 'registerTest'", () => {
    test("Then it should render a username, password and repeatPassword inputs with the text", () => {
      const newText = "registerTest";
      render(<Register />);
      const form = {
        username: screen.getByLabelText("Phone number") as HTMLInputElement,
        password: screen.getByLabelText("Password") as HTMLInputElement,
        repeatPassword: screen.getByLabelText(
          "Repeat password"
        ) as HTMLInputElement,
      };

      fireEvent.change(form.username, { target: { value: newText } });
      fireEvent.change(form.password, { target: { value: newText } });
      fireEvent.change(form.repeatPassword, {
        target: { value: newText },
      });

      expect(form.username.value).toBe(newText);
      expect(form.password.value).toBe(newText);
      expect(form.repeatPassword.value).toBe(newText);
    });

    describe("And the user type is not valid", () => {
      test("Then the button should be disabled", () => {
        const newInvalidText = "test";
        render(<Register />);
        const form = {
          username: screen.getByLabelText("Phone number") as HTMLInputElement,
          password: screen.getByLabelText("Password") as HTMLInputElement,
          repeatPassword: screen.getByLabelText(
            "Repeat password"
          ) as HTMLInputElement,
        };
        const button = screen.getByRole("button", { name: "Register" });

        fireEvent.change(form.username, { target: { value: newInvalidText } });
        fireEvent.change(form.password, { target: { value: newInvalidText } });
        fireEvent.change(form.repeatPassword, {
          target: { value: newInvalidText },
        });

        expect(button).toBeDisabled();
      });

      test("Then it should call the mockRegister function with the new text", async () => {
        const newText = "registerTest";
        render(<Register />);
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

        fireEvent.change(form.name, { target: { value: newText } });
        fireEvent.change(form.surname, { target: { value: newText } });
        fireEvent.change(form.email, { target: { value: newText } });
        fireEvent.change(form.phoneNumber, { target: { value: newText } });
        fireEvent.change(form.password, { target: { value: newText } });
        fireEvent.change(form.repeatPassword, {
          target: { value: newText },
        });
        const submit = screen.getByRole("button", { name: "Register" });
        await userEvent.click(submit);
        const registerData = {
          name: newText,
          surname: newText,
          email: newText,
          phoneNumber: newText,
          password: newText,
        };

        expect(mockRegisterFunction.register).toHaveBeenCalledWith(
          registerData
        );
      });
    });

    describe("And the user type different passwords", () => {
      test("Then it shouldn't call the mockRegister function", async () => {
        const password = "password";
        const repeatPassword = "wrongPassword";
        render(<Register />);
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

        fireEvent.change(form.name, { target: { value: password } });
        fireEvent.change(form.surname, { target: { value: password } });
        fireEvent.change(form.email, { target: { value: password } });
        fireEvent.change(form.phoneNumber, { target: { value: password } });
        fireEvent.change(form.password, { target: { value: password } });
        fireEvent.change(form.repeatPassword, {
          target: { value: repeatPassword },
        });
        const submit = screen.getByRole("button", { name: "Register" });
        await userEvent.click(submit);

        expect(mockRegisterFunction.register).not.toHaveBeenCalled();
      });
    });
  });
});
