import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Navigation from "./Navigation";

describe("Given a Navigation component", () => {
  describe("When it is instantiated", () => {
    test("Then it should render the texts: 'Telephone', 'Contacts' and 'Favourites'", async () => {
      render(
        <BrowserRouter>
          <Navigation />
        </BrowserRouter>
      );

      const telephoneText = "Telephone";
      const contactsText = "Contacts";
      const favouritesText = "Favourites";

      const firstTextExpected = await screen.findByText(telephoneText);
      const secondTextExpected = await screen.findByText(contactsText);
      const thirdTextExpected = await screen.findByText(favouritesText);

      expect(firstTextExpected).toBeVisible();
      expect(secondTextExpected).toBeVisible();
      expect(thirdTextExpected).toBeVisible();
    });
  });
});
