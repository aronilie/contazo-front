import IndividualContact from "../../components/IndividualContact/IndividualContact";
import Header from "../../components/Header/Header";
import { provisionallyContact } from "../../utils/components/defaultObjects";

const ContactsPage = (): JSX.Element => {
  return (
    <>
      <Header />
      <IndividualContact contact={provisionallyContact} />
    </>
  );
};

export default ContactsPage;
