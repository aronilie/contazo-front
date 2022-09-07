import Contact from "../models/Contact";
import contactsSlice, { getContactsActionCreator } from "./contactsSlice";

describe("Given a usersSlice function", () => {
  describe("When invoked with an initial state as previous users and a loadUsers with a fakeUser inside", () => {
    test("Then it should return an array with the fakeUser", () => {
      const initialState: Contact[] = [];
      const fakeContact: Contact = {
        name: "Dan",
        surname: "Abramov",
        email: "dan@test.com",
        phoneNumber: "888555222",
      };

      const users = contactsSlice(
        initialState,
        getContactsActionCreator(fakeContact)
      );

      expect(users).toStrictEqual([fakeContact]);
    });
  });
});
