import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DetailContact from "../../components/DetailContact/DetailContact";
import UpdateContact from "../../components/UpdateContact/UpdateContact";
import useContactsApi from "../../features/contacts/hooks/useContactsApi";
import { Contact } from "../../features/contacts/models/Contact";

interface GetContactPageProps {
  type: "update" | "detail";
}

const GetContactPage = ({ type }: GetContactPageProps): JSX.Element => {
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
      {type === "update" && <UpdateContact contact={contact} />}
      {type === "detail" && <DetailContact contact={contact} />}
    </>
  );
};

export default GetContactPage;
