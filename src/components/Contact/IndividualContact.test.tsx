import IndividualContact from "./IndividualContact";
import { render, screen } from "@testing-library/react";

const contact = {
  name: "Dan",
  surname: "Abramov",
  email: "dan@test.com",
  phoneNumber: "888555222",
  owner: "owner",
};
describe("Given a IndividualContact component", () => {
  describe("When it is instantiated with a contact", () => {
    test.only("Then it should render the 'email' and the 'phoneNumber' of the contact", async () => {
      render(<IndividualContact contact={contact} />);

      const phoneNumber = screen.getByText("888555222");
      const email = screen.getByText("dan@test.com");

      expect(phoneNumber).toBeInTheDocument();
      expect(email).toBeInTheDocument();
    });
  });
});
