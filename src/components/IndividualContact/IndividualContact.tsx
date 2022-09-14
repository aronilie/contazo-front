import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import { Contact } from "../../features/contacts/models/Contact";
import IndividualContactStyled from "./IndividualContactStyled";
import { useNavigate } from "react-router-dom";
import useContactsApi from "../../features/contacts/hooks/useContactsApi";

interface ContactProps {
  contact: Contact;
}

const IndividualContact = ({ contact }: ContactProps): JSX.Element => {
  const contactImage = contact.backupImage;
  const navigate = useNavigate();

  const { deleteContact } = useContactsApi();

  const moveToDetails = () => {
    navigate(`/contact/${contact.phoneNumber}`);
  };

  const deleteUserContact = () => {
    deleteContact(contact.phoneNumber);
  };

  return (
    <li>
      <IndividualContactStyled className="contact">
        <img
          src={contactImage}
          alt="contact representation"
          className="contact__image"
          width={40}
          height={40}
        />
        <div className="contact__text" onClick={moveToDetails}>
          <div className="contact__fullname">
            <span className="contact__name">{contact.name}</span>
            <span className="contact__surname">{contact.surname}</span>
          </div>

          <span className="contact__email">{contact.email}</span>
          <span className="contact__phoneNumber">{contact.phoneNumber}</span>
        </div>

        <div className="contact__icon">
          <FontAwesomeIcon
            className="icon"
            icon={faCircleXmark}
            onClick={deleteUserContact}
            data-testid="icon"
          />
        </div>
      </IndividualContactStyled>
    </li>
  );
};

export default IndividualContact;
