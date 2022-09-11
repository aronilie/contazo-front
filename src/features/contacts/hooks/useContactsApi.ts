import axios, { AxiosResponse } from "axios";
import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { getContactsActionCreator } from "../slices/contactsSlice";
import { Contact, Contacts } from "../models/Contact";

export const apiURL = process.env.REACT_APP_API_URL;

const useContactsApi = () => {
  const dispatch = useAppDispatch();
  const contacts = useAppSelector((state) => state.contacts);
  const token = useAppSelector((state) => state.user.token);

  const getContacts = useCallback(async () => {
    const {
      data: { contacts },
    }: AxiosResponse<Contacts> = await axios.get(`${apiURL}contacts`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch(getContactsActionCreator(contacts));
  }, [dispatch, token]);

  const getContactByPhoneNumber = useCallback(
    async (phoneNumber: string) => {
      const { data: contact }: AxiosResponse<Contact> = await axios.get(
        `${apiURL}contacts/${phoneNumber}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return contact;
    },
    [token]
  );

  const createContact = async (contact: Contact) => {
    const response: AxiosResponse<string> = await axios.post(
      `${apiURL}create`,
      contact,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  };

  return { contacts, getContacts, getContactByPhoneNumber, createContact };
};
export default useContactsApi;
