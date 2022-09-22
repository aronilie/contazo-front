import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UpdateContact from "../../components/UpdateContact/UpdateContact";
import useContactsApi from "../../features/contacts/hooks/useContactsApi";
import { Contact } from "../../features/contacts/models/Contact";

const UpdateContactPage = (): JSX.Element => {
  const initialState = {
    name: "",
    surname: "",
    email: "",
    phoneNumber: "",
    backupImage: "",
    owner: "",
  };

  const { id } = useParams();
  const { getContactByPhoneNumber } = useContactsApi();

  const [contact, setContact] = useState<Contact>(initialState);

  useEffect(() => {
    (async () => {
      const phoneNumberContact: Contact = await getContactByPhoneNumber(id!);
      setContact(phoneNumberContact);
    })();
  }, [getContactByPhoneNumber, id]);

  return (
    <>
      <UpdateContact contact={contact} />
    </>
  );
};

export default UpdateContactPage;
