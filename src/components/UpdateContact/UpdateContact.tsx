import { Contact } from "../../features/contacts/models/Contact";
import ContactForm from "../ContactForm/ContactForm";

interface UpdateContactProps {
  contact: Contact;
}

const UpdateContact = ({ contact }: UpdateContactProps): JSX.Element => {
  return <ContactForm contact={contact} />;
};

export default UpdateContact;
