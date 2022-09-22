import React, { SyntheticEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import useContactsApi from "../../features/contacts/hooks/useContactsApi";
import {
  ContactDataInitialState,
  fieldStatusInitialState,
} from "../../utils/initialStates";
import ContactForm from "../ContactForm/ContactForm";
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

        <ContactForm
          handleSubmit={handleSubmit}
          onChangeData={onChangeData}
          onChangeFile={onChangeFile}
          contactData={contactData}
          fieldStatus={fieldStatus}
          failStatus={failStatus}
          successStatus={successStatus}
          hasEmptyFields={hasEmptyFields}
          buttonText="Create contact"
        />
      </div>
    </CreateContactStyled>
  );
};

export default CreateContact;
