import { Contact } from "../models/Contact";
import contactsSlice, {
  deleteContactActionCreator,
  getContactsActionCreator,
} from "./contactsSlice";

const fakeContact: Contact = {
  name: "Dan",
  surname: "Abramov",
  email: "dan@test.com",
  phoneNumber: "888555222",
  owner: "631791f8d7342693105b6908",
};

describe("Given a usersSlice function", () => {
  describe("When invoked with an initial state as previous users and a loadUsers with a fakeUser inside", () => {
    test("Then it should return an array with the fakeUser", () => {
      const initialState: Contact[] = [];

      const users = contactsSlice(
        initialState,
        getContactsActionCreator([fakeContact])
      );

      expect(users).toStrictEqual([fakeContact]);
    });
  });

  describe("When deleteContact reducer is called with a fake phoneNumber as payload", () => {
    test("Then it should return the previous state without the contact that has the fakePhoneNumber", () => {
      const contacts = contactsSlice(
        [fakeContact],
        deleteContactActionCreator(fakeContact.phoneNumber)
      );

      expect(contacts).not.toContain(fakeContact);
    });
  });
});
