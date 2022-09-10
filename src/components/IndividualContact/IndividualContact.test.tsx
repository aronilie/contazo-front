import IndividualContact from "./IndividualContact";
import { render, screen } from "@testing-library/react";
import * as router from "react-router";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";

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

describe("Given a IndividualContact component", () => {
  describe("When it is instantiated with a contact", () => {
    test("Then it should render the 'email' and the 'phoneNumber' of the contact", async () => {
      render(
        <MemoryRouter>
          <IndividualContact contact={contact} />
        </MemoryRouter>
      );

      const phoneNumber = screen.getByText("888555222");
      const email = screen.getByText("dan@test.com");

      expect(phoneNumber).toBeInTheDocument();
      expect(email).toBeInTheDocument();
    });

    describe("And the user clicks in one contact", () => {
      test("Then it should navigate to the contact details page", async () => {
        render(
          <MemoryRouter>
            <IndividualContact contact={contact} />
          </MemoryRouter>
        );

        const contactReceived = screen.getByRole("listitem");
        await userEvent.click(contactReceived);

        expect(navigate).toHaveBeenCalledTimes(1);
      });
    });
  });
});
