import { Contact } from "../../features/contacts/models/Contact";
import { defaultContactImage } from "../../utils/components-utils/defaultObjects";
import {
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
  let contactImage = contact.image;

  if (!contact.image) {
    contactImage = defaultContactImage;
  }

  return (
    <DetailContactStyled>
      <div className="container">
        <div className="header">
          <img
            src={contactImage}
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
                <img
                  src={mobileIcon}
                  alt="Mobile icon"
                  className="icon__element"
                />
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
                <img
                  src={mailIcon}
                  alt="Email icon"
                  className="icon__element"
                />
              </div>
            </div>
          </div>
          <div className="section">
            <span className="section__title">Social</span>
            <div className="feature">
              <span className="feature__information-main">Telegram</span>
              <div className="icon">
                <img
                  src={telegramIcon}
                  alt="Mobile icon"
                  className="icon__element"
                />
              </div>
            </div>
            <div className="feature">
              <span className="feature__information-main">Whatsapp</span>
              <div className="icon">
                <img
                  src={whatsAppIcon}
                  alt="Email icon"
                  className="icon__element"
                />
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
            <Button
              className="buttons__default"
              text="Edit contact"
              type="submit"
              disabled={false}
            />
          </div>

          <Button
            className="buttons__bad"
            text="Delete contact"
            type="submit"
            disabled={false}
          />
        </div>
      </div>
    </DetailContactStyled>
  );
};

export default DetailContact;
