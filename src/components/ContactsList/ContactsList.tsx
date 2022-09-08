import { useEffect } from "react";
import { useAppSelector } from "../../app/hooks";
import useContactsApi from "../../features/contacts/hooks/useContactsApi";
import IndividualContact from "../IndividualContact/IndividualContact";

const ContactsList = (): JSX.Element => {
  const { getContacts } = useContactsApi();
  const contacts = useAppSelector((state) => state.contacts);

  useEffect(() => {
    getContacts();
  }, [getContacts]);

  const thereAreContacts = contacts.length !== 0;

  return (
    <>
      {!thereAreContacts ? (
        <span>There are no contacts yet</span>
      ) : (
        <ul>
          {contacts.map((contact) => (
            <IndividualContact contact={contact} />
          ))}
        </ul>
      )}
    </>
  );
};

export default ContactsList;
