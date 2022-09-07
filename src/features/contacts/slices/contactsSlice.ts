import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Contact from "../models/Contact";

const initialState: Contact[] = [];

const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    getContacts: (previousContacts, action: PayloadAction<Contact>) => [
      action.payload,
    ],
  },
});

export const { getContacts: getContactsActionCreator } = contactsSlice.actions;

export default contactsSlice.reducer;
