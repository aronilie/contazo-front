import { renderHook } from "@testing-library/react";
import axios from "axios";
import Wrapper from "../../../utils/test-utils/Wrapper";
import { Contact } from "../models/Contact";
import useContactsApi from "./useContactsApi";

const mockUseDispatch = jest.fn();

jest.mock("../../../app/hooks", () => ({
  ...jest.requireActual("../../../app/hooks"),
  useAppDispatch: () => mockUseDispatch,
}));

const fakeContacts: Contact[] = [
  {
    name: "Dan",
    surname: "Abramov",
    email: "dan@test.com",
    phoneNumber: "888555222",
    owner: "631791f8d7342693105b6908",
  },
];

const fakeContact: Contact = {
  name: "Dan",
  surname: "Abramov",
  email: "dan@test.com",
  phoneNumber: "888555222",
  owner: "631791f8d7342693105b6908",
};
describe("Given a useContactsApi hook", () => {
  describe("When getContacts function is called", () => {
    test("The it should call the mockUseDispatch with an array fakeContacts", async () => {
      const {
        result: {
          current: { getContacts },
        },
      } = renderHook(useContactsApi, { wrapper: Wrapper });
      const response = { data: fakeContacts };

      axios.get = jest.fn().mockResolvedValue(response);

      const expectedAction = {
        payload: undefined,
        type: "contacts/getContacts",
      };

      await getContacts();

      expect(mockUseDispatch).toHaveBeenCalledWith(expectedAction);
    });
  });

  describe("When getContactByPhoneNumber function is called with a phoneNumber '888555222'", () => {
    test("Then it should return a contact with a phoneNumber", async () => {
      const phoneNumber = "888555222";
      const {
        result: {
          current: { getContactByPhoneNumber },
        },
      } = renderHook(useContactsApi, { wrapper: Wrapper });
      const response = { data: fakeContact };

      axios.get = jest.fn().mockResolvedValue(response);
      const expectedContact = await getContactByPhoneNumber(phoneNumber);

      expect(expectedContact).toStrictEqual(fakeContact);
    });
  });
});
