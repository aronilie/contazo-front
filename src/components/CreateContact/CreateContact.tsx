import React, { SyntheticEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import useContactsApi from "../../features/contacts/hooks/useContactsApi";
import {
  ContactDataInitialState,
  fieldStatusInitialState,
} from "../../utils/initialStates";
import Button from "../Button/Button";
import CreateContactStyled from "./CreateContactStyled";

const CreateContact = (): JSX.Element => {
  const user = useAppSelector((state) => state.user);

  const contactDataInitialState: ContactDataInitialState = {
    name: "",
    surname: "",
    email: "",
    phoneNumber: "",
    image: "",
    owner: user.id,
  };

  const failStatusInitialState = {
    email: "",
    phoneNumber: "",
    passwd: "",
    button: "",
    file: "",
  };

  const formDataInitialState = new FormData();

  const navigate = useNavigate();
  const { createContact } = useContactsApi();

  const [contactData, setContactData] = useState(contactDataInitialState);
  const [fieldStatus, setFieldStatus] = useState(fieldStatusInitialState);
  const [failStatus, setFailStatus] = useState(failStatusInitialState);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [fileStatus, setFileStatus] = useState(formDataInitialState);

  const [successStatus, setSuccessStatus] = useState("");

  const onChangeData = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    setFieldStatus(fieldStatusInitialState);
    setContactData({ ...contactData, [event.target.id]: event.target.value });

    if (!hasEmptyFields) {
      setFailStatus({ ...failStatus, button: "form-button--active" });
    }

    if (hasEmptyFields) {
      setFailStatus({ ...failStatus, button: "" });
    }
  };

  const onChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFailStatus({ ...failStatus, file: "form__file" });
    const file = event.target.files![0];
    fileStatus.append("file", file);
  };

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();

    if (contactData.email.search("@") < 1 && contactData.email.length > 0) {
      setFieldStatus({ ...fieldStatus, email: "form__input--wrong" });
      setFailStatus({ ...failStatus, email: "form-email__error--active" });
    } else if (
      contactData.phoneNumber.length < 9 ||
      contactData.phoneNumber.length === 0
    ) {
      setFieldStatus({ ...fieldStatus, phoneNumber: "form__input--wrong" });
      setFailStatus({
        ...failStatus,
        phoneNumber: "form-phone__error--active",
      });
    } else {
      if (contactData.name === "" && contactData.surname === "") {
        fileStatus.append("name", contactData.phoneNumber);
      } else {
        fileStatus.append("name", contactData.name);
      }
      fileStatus.append("surname", contactData.surname);
      fileStatus.append("email", contactData.email);
      fileStatus.append("phoneNumber", contactData.phoneNumber);
      fileStatus.append("owner", contactData.owner);
      fileStatus.append("file", contactData.image as File);
      try {
        await createContact(fileStatus);

        setSuccessStatus("form-check__success--active");
        setContactData(contactDataInitialState);
        navigate("/home");
      } catch (error) {}
    }
  };

  const hasEmptyFields = contactData.phoneNumber.length === 0;
  return (
    <CreateContactStyled>
      <div className="container">
        <h1 className="title">Create contact</h1>
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
            text="Create contact"
          />
        </form>
      </div>
    </CreateContactStyled>
  );
};

export default CreateContact;
