import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { SyntheticEvent, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useContactsApi from "../../features/contacts/hooks/useContactsApi";
import { Contact } from "../../features/contacts/models/Contact";
import {
  ContactDataInitialState,
  fieldStatusInitialState,
} from "../../utils/initialStates";
import CreateContactStyled from "../CreateContact/CreateContactStyled";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import ContactForm from "../ContactForm/ContactForm";

interface UpdateContactProps {
  contact: Contact;
}

const UpdateContact = ({ contact }: UpdateContactProps): JSX.Element => {
  const contactDataInitialState: ContactDataInitialState = {
    name: "",
    surname: "",
    email: "",
    phoneNumber: "",
    image: "",
    owner: "",
  };

  const contactDataDefaultState: ContactDataInitialState = {
    name: contact.name,
    surname: contact.surname,
    email: contact.email,
    phoneNumber: contact.phoneNumber,
    image: "",
    owner: contact.owner,
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
  const { id } = useParams();
  const { updateContact } = useContactsApi();

  const [contactData, setContactData] = useState(contactDataDefaultState);
  const [fieldStatus, setFieldStatus] = useState(fieldStatusInitialState);
  const [failStatus, setFailStatus] = useState(failStatusInitialState);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [fileStatus, setFileStatus] = useState(formDataInitialState);

  const [successStatus, setSuccessStatus] = useState("");

  setTimeout(() => {
    if (contactData.name === "") {
      setContactData(contactDataDefaultState);
    }
  }, 100);

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
        await updateContact(id as string, fileStatus);

        setSuccessStatus("form-check__success--active");
        setContactData(contactDataInitialState);
        navigate(`/contact/${contactData.phoneNumber}`);
      } catch (error) {}
    }
  };

  const hasEmptyFields = contactData.phoneNumber.length === 0;
  return (
    <CreateContactStyled>
      <div className="container">
        <div className="header">
          <FontAwesomeIcon
            icon={faArrowLeft}
            size="2x"
            onClick={() => navigate(`/contact/${contactData.phoneNumber}`)}
            className="header__icon"
            data-testid="return-icon"
          />
          <h1 className="title">Edit contact</h1>
        </div>

        <ContactForm
          handleSubmit={handleSubmit}
          onChangeData={onChangeData}
          onChangeFile={onChangeFile}
          contactData={contactData}
          fieldStatus={fieldStatus}
          failStatus={failStatus}
          successStatus={successStatus}
          hasEmptyFields={hasEmptyFields}
          buttonText="Save"
        />
      </div>
    </CreateContactStyled>
  );
};

export default UpdateContact;
