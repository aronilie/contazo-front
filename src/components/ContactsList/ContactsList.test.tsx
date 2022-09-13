import { render, screen } from "@testing-library/react";
import contacts from "../../utils/test-utils/contacts";
import Wrapper from "../../utils/test-utils/Wrapper";
import ContactsList from "./ContactsList";

let mockSelectorReturn: [] = [];

let mockContacts: [] = [];

jest.mock("../../features/contacts/hooks/useContactsApi", () => () => ({
  getContacts: jest.fn().mockReturnValue(mockContacts),
}));

jest.mock("../../app/hooks", () => ({
  ...jest.requireActual("../../app/hooks"),
  useAppSelector: () => mockSelectorReturn,
}));

afterEach(() => {
  jest.clearAllMocks();
});

describe("Given a DestinationsList component", () => {
  describe("When it's render", () => {
    describe("And there is any destination availability", () => {
      test("Then it should show 'You have no contacts yet! 😢'", () => {
        const expectedText = "You have no contacts yet! 😢";

        mockContacts = [];
        mockSelectorReturn = [];
        render(<ContactsList />, { wrapper: Wrapper });

        const resultText = screen.getByText(expectedText);

        expect(resultText).toHaveTextContent(expectedText);
      });
    });

    describe("And there is destination availability", () => {
      test("Then it should show a Destination with title 'Nepal' inside'", () => {
        const expectedText = "Abramov";

        mockContacts = contacts as [];
        mockSelectorReturn = contacts as [];

        render(<ContactsList />, { wrapper: Wrapper });

        const resultText = screen.getByText(expectedText);

        expect(resultText).toBeInTheDocument();
      });
    });
  });
});
