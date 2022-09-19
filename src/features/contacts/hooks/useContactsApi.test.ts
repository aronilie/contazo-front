import { renderHook } from "@testing-library/react";
import axios from "axios";
import Wrapper from "../../../utils/test-utils/Wrapper";
import { Contact } from "../models/Contact";
import { deleteContactActionCreator } from "../slices/contactsSlice";
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
    owner: "6319c275b774d4a8400d6344",
  },
];

const fakeContact: Contact = {
  name: "Dan",
  surname: "Abramov",
  email: "dan@test.com",
  phoneNumber: "888555222",
  owner: "6319c275b774d4a8400d6344",
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

  describe("When createContact function is called", () => {
    test("Then it should return the response message 'Contact successfully created'", async () => {
      const publicMessage = "Contact successfully created";

      const {
        result: {
          current: { createContact },
        },
      } = renderHook(useContactsApi, { wrapper: Wrapper });

      const formData = new FormData();
      formData.append("contact", JSON.stringify(fakeContact));
      const contactCreated = await createContact(formData);

      expect(contactCreated.data).toBe(publicMessage);
    });
  });

  describe("When deleteContact function is called with an fakePhoneNumber", () => {
    test("Then it should call the mockDispatch with an action creator and the fakePhoneNumber", async () => {
      const fakePhoneNumber = "888555222";

      const {
        result: {
          current: { deleteContact },
        },
      } = renderHook(useContactsApi, { wrapper: Wrapper });

      await deleteContact(fakePhoneNumber);

      expect(mockUseDispatch).toHaveBeenCalledWith(
        deleteContactActionCreator(fakePhoneNumber)
      );
    });
  });

  describe("When updateContact function is called with a fake contact", () => {
    test("Then it should return the response message 'Contact updated successfully'", async () => {
      const publicMessage = "Contact updated successfully";

      const {
        result: {
          current: { updateContact },
        },
      } = renderHook(useContactsApi, { wrapper: Wrapper });

      const { phoneNumber } = fakeContact;
      const formData = new FormData();
      formData.append("contact", JSON.stringify(fakeContact));
      const contactUpdated = await updateContact(phoneNumber, formData);

      expect(contactUpdated.data).toBe(publicMessage);
    });
  });
});
