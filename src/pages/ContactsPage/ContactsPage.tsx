import Header from "../../components/Header/Header";
import ContactsList from "../../components/ContactsList/ContactsList";
import Navigation from "../../components/Navigation/Navigation";

const ContactsPage = (): JSX.Element => {
  return (
    <>
      <Header />
      <ContactsList />
      <Navigation />
    </>
  );
};

export default ContactsPage;
