import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Contact } from "../models/Contact";

const initialState: Contact[] = [];

const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    getContacts: (previousContacts, action: PayloadAction<Contact[]>) => [
      ...action.payload,
    ],
    deleteContact: (previousState, action: PayloadAction<string>) =>
      previousState.filter((contact) => contact.phoneNumber !== action.payload),
  },
});

export const {
  getContacts: getContactsActionCreator,
  deleteContact: deleteContactActionCreator,
} = contactsSlice.actions;

export default contactsSlice.reducer;
