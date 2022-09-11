import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DetailContact from "../../components/DetailContact/DetailContact";
import Header from "../../components/Header/Header";
import Navigation from "../../components/Navigation/Navigation";
import useContactsApi from "../../features/contacts/hooks/useContactsApi";
import { Contact } from "../../features/contacts/models/Contact";

const DetailContactPage = (): JSX.Element => {
  const initialState = {
    name: "",
    surname: "",
    email: "",
    phoneNumber: "",
    image: "",
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
      <Header />
      <DetailContact contact={contact} />
      <Navigation />
    </>
  );
};

export default DetailContactPage;