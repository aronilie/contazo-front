import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import { Contact } from "../../features/contacts/models/Contact";
import IndividualContactStyled from "./IndividualContactStyled";

interface ContactProps {
  contact: Contact;
}

// eslint-disable-next-line @typescript-eslint/no-redeclare
const IndividualContact = ({ contact }: ContactProps): JSX.Element => {
  return (
    <li>
      <IndividualContactStyled className="contact">
        <img
          src={contact.image}
          alt="contact representation"
          className="contact__image"
        />
        <div className="contact__text">
          <div className="contact__fullname">
            <span className="contact__name">{contact.name}</span>
            <span className="contact__surname">{contact.surname}</span>
          </div>

          <span className="contact__email">{contact.email}</span>
          <span className="contact__phoneNumber">{contact.phoneNumber}</span>
        </div>

        <FontAwesomeIcon className="contact__icon" icon={faCircleXmark} />
      </IndividualContactStyled>
    </li>
  );
};

export default IndividualContact;
