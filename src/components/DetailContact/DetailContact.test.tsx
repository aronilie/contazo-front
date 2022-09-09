import { render, screen } from "@testing-library/react";
import DetailContact from "./DetailContact";

describe("Given a DetailContact component", () => {
  describe("When it is instantiated with a contact", () => {
    test("Then it should render the name of the contact", () => {
      const contact = {
        name: "Dan",
        surname: "Abramov",
        email: "dan@test.com",
        phoneNumber: "888555222",
        owner: "owner",
      };
      const expectedText = contact.name;

      render(<DetailContact contact={contact} />);
      const receivedText = screen.getByText(expectedText);

      expect(receivedText).toBeInTheDocument();
    });
  });
});
