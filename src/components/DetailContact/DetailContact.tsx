import { Link, useNavigate } from "react-router-dom";
import useContactsApi from "../../features/contacts/hooks/useContactsApi";
import { Contact } from "../../features/contacts/models/Contact";
import {
  defaultContactImage,
  mailIcon,
  mobileIcon,
  telegramIcon,
  whatsAppIcon,
} from "../../utils/components-utils/images";
import Button from "../Button/Button";
import DetailContactStyled from "./DetailContactStyled";

interface DetailContactProps {
  contact: Contact;
}

const DetailContact = ({ contact }: DetailContactProps): JSX.Element => {
  const { deleteContact } = useContactsApi();
  const navigate = useNavigate();

  let contactImage = contact.backupImage;

  if (!contact.backupImage) {
    contactImage = defaultContactImage;
  }

  const deleteUserContact = () => {
    deleteContact(contact.phoneNumber);
  };

  return (
    <DetailContactStyled>
      <div className="container">
        <div className="header">
          <img
            src={contactImage as string}
            alt="Contact presentation"
            className="header__image"
          />
          <div className="header__fullname">
            <span className="header__fullname-name">{contact.name}</span>
            <span className="header__fullname-name">{contact.surname}</span>
          </div>
        </div>
        <div className="line"></div>
        <div className="information">
          <div className="section">
            <span className="section__title">Personal data</span>
            <div className="feature">
              <div className="feature__information">
                <span className="feature__information-main">
                  {contact.phoneNumber}
                </span>
                <span className="feature__information-text">Mobile</span>
              </div>
              <div className="icon">
                <a href={`tel:${contact.phoneNumber}`}>
                  <img
                    src={mobileIcon}
                    alt="Mobile icon"
                    className="icon__element"
                  />
                </a>
              </div>
            </div>
            <div className="feature">
              <div className="feature__information">
                <span className="feature__information-main">
                  {contact.email}
                </span>
                <span className="feature__information-text">Email</span>
              </div>
              <div className="icon">
                <a href={`mailto:${contact.email}`}>
                  <img
                    src={mailIcon}
                    alt="Email icon"
                    className="icon__element"
                  />
                </a>
              </div>
            </div>
          </div>
          <div className="section">
            <span className="section__title">Social</span>
            <div className="feature">
              <span className="feature__information-main">Whatsapp</span>
              <div className="icon">
                <a href={`https://wa.me/${contact.phoneNumber}`}>
                  <img
                    src={whatsAppIcon}
                    alt="Email icon"
                    className="icon__element"
                  />
                </a>
              </div>
            </div>
            <div className="feature">
              <span className="feature__information-main">Telegram</span>
              <div className="icon">
                <a href={`https://t.me/${contact.name}${contact.surname}`}>
                  <img
                    src={telegramIcon}
                    alt="Mobile icon"
                    className="icon__element"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="buttons">
          <div className="buttons__container">
            <Button
              className="buttons__default"
              text="Add to favourites"
              type="submit"
              disabled={false}
            />
            <Link
              className="buttons__link"
              to={`/update/${contact.phoneNumber}`}
            >
              <Button
                className="buttons__default"
                text="Edit contact"
                type="submit"
                disabled={false}
              />
            </Link>
          </div>

          <div onClick={deleteUserContact}>
            <div onClick={() => navigate("/contacts")}>
              <Button
                className="buttons__bad"
                text="Delete contact"
                type="submit"
                disabled={false}
              />
            </div>
          </div>
        </div>
      </div>
    </DetailContactStyled>
  );
};

export default DetailContact;
