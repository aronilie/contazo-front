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
        image: "image",
      };
      const expectedText = contact.name;

      render(<DetailContact contact={contact} />);
      const receivedText = screen.getByText(expectedText);

      expect(receivedText).toBeInTheDocument();
    });

    describe("And the contact passed for props don't have image", () => {
      test("Then it should render the default image", () => {
        const contact = {
          name: "Dan",
          surname: "Abramov",
          email: "dan@test.com",
          phoneNumber: "888555222",
          owner: "owner",
          image: undefined,
        };

        render(<DetailContact contact={contact} />);
        const receivedImage = screen.getByRole("img", {
          name: "Contact presentation",
        });

        expect(receivedImage).toBeInTheDocument();
      });
    });
  });
});
