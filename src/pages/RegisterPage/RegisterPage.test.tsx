import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import RegisterPage from "./RegisterPage";

describe("Given a RegisterPage page", () => {
  describe("When it is instantiated", () => {
    test("Then it should show a component Register", () => {
      render(
        <BrowserRouter>
          <RegisterPage />
        </BrowserRouter>
      );

      const nameHeading = screen.getByRole("heading");

      expect(nameHeading).toBeInTheDocument();
    });
  });
});
