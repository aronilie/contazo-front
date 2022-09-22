import { SyntheticEvent } from "react";
import { ContactDataInitialState } from "../../utils/initialStates";
import Button from "../Button/Button";

interface fieldStatus {
  email: string;
  phoneNumber: string;
  passwd: string;
  repeatPassword: string;
}

interface failStatus {
  email: string;
  phoneNumber: string;
  passwd: string;
  button: string;
  file: string;
}

interface ContactFormProps {
  handleSubmit: (event: SyntheticEvent) => Promise<void>;
  onChangeData: (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => void;
  onChangeFile: (event: React.ChangeEvent<HTMLInputElement>) => void;
  contactData: ContactDataInitialState;
  fieldStatus: fieldStatus;
  failStatus: failStatus;
  successStatus: string;
  hasEmptyFields: boolean;
  buttonText: string;
}

const ContactForm = ({
  handleSubmit,
  onChangeData,
  onChangeFile,
  contactData,
  fieldStatus,
  failStatus,
  successStatus,
  hasEmptyFields,
  buttonText,
}: ContactFormProps): JSX.Element => {
  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="form-half">
        <div className="form__group">
          <div className="form__label-container">
            <label htmlFor="name" className="form__label">
              Name
            </label>
          </div>
          <input
            type="text"
            className="form__input"
            id="name"
            autoComplete="off"
            value={contactData.name}
            onChange={onChangeData}
          />
        </div>
        <div className="form__group">
          <div className="form__label-container">
            <label htmlFor="surname" className="form__label">
              Surname
            </label>
          </div>
          <input
            type="text"
            className="form__input"
            id="surname"
            autoComplete="off"
            value={contactData.surname}
            onChange={onChangeData}
          />
        </div>
      </div>
      <div className="form-half">
        <div className="form__group">
          <div className="form__label-container">
            <label htmlFor="email" className="form__label">
              Email address
            </label>
          </div>
          <input
            type="text"
            className={`form__input ${fieldStatus.email}`}
            id="email"
            autoComplete="off"
            value={contactData.email}
            onChange={onChangeData}
          />
        </div>
        <div className="form__group">
          <div className="form__label-container">
            <label htmlFor="phoneNumber" className="form__label">
              Phone number *
            </label>
          </div>
          <input
            type="number"
            className={`form__input ${fieldStatus.phoneNumber}`}
            id="phoneNumber"
            autoComplete="off"
            value={contactData.phoneNumber.toString()}
            onChange={onChangeData}
          />
        </div>
      </div>
      <div className="form-third">
        <span className="file-text">Profile picture</span>

        <div className="file-container">
          <div className="file-content">
            <label
              htmlFor="image"
              data-testid="upload-file"
              className="file-image"
            >
              Upload picture
            </label>
          </div>
          {failStatus.file === "form__file" && (
            <span className="file-uploaded">Successfully uploaded</span>
          )}
        </div>

        <input
          type="file"
          id="image"
          onChange={onChangeFile}
          className="file-upload"
        />
      </div>

      {fieldStatus.email === "form__input--wrong" && (
        <div className={`form-email form-email__error--active`}>
          <span className="form-email__error">Invalid email address.</span>
        </div>
      )}
      {fieldStatus.phoneNumber === "form__input--wrong" && (
        <div className={`form-phone form-phone__error--active`}>
          <span className="form-phone__error">Invalid phone number.</span>
        </div>
      )}
      {successStatus === "form-check__success--active" && (
        <div className={`form-check form-check__success--active`}>
          <span className="form-check__success">
            Contact successfully created.
          </span>
        </div>
      )}

      <Button
        className={`form__button ${failStatus.button}`}
        type="submit"
        disabled={hasEmptyFields}
        text={buttonText}
      />
    </form>
  );
};

export default ContactForm;
