import React, { SyntheticEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import useContactsApi from "../../features/contacts/hooks/useContactsApi";
import { fieldStatusInitialState } from "../../utils/initialStates";
import Button from "../Button/Button";
import CreateContactStyled from "./CreateContactStyled";

const CreateContact = (): JSX.Element => {
  const user = useAppSelector((state) => state.user);

  const formDataInitialState = {
    name: "",
    surname: "",
    email: "",
    phoneNumber: "",
    owner: user.id,
  };

  const failStatusInitialState = {
    email: "",
    phoneNumber: "",
    passwd: "",
    button: "",
  };

  const navigate = useNavigate();
  const { createContact } = useContactsApi();

  const [formData, setFormData] = useState(formDataInitialState);
  const [fieldStatus, setFieldStatus] = useState(fieldStatusInitialState);
  const [failStatus, setFailStatus] = useState(failStatusInitialState);
  const [successStatus, setSuccessStatus] = useState("");

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    setFailStatus(failStatusInitialState);

    if (formData.email.search("@") < 1) {
      setFieldStatus({ ...fieldStatus, email: "form__input--wrong" });
      setFailStatus({ ...failStatus, email: "form-email__error--active" });
    } else if (formData.phoneNumber.length < 9) {
      setFieldStatus({ ...fieldStatus, phoneNumber: "form__input--wrong" });
      setFailStatus({
        ...failStatus,
        phoneNumber: "form-phone__error--active",
      });
    } else {
      try {
        await createContact(formData);

        setSuccessStatus("form-check__success--active");
        setFormData(formDataInitialState);
        setTimeout(() => {
          navigate("/home");
        }, 2500);
      } catch (error) {}
    }
  };

  const onChangeData = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFieldStatus(fieldStatusInitialState);
    setFormData({ ...formData, [event.target.id]: event.target.value });

    if (hasEmptyFields) {
      setFailStatus({ ...failStatus, button: "form-button__error--active" });
    }

    if (!hasEmptyFields) {
      setFailStatus({ ...failStatus, button: "" });
    }
  };

  const hasEmptyFields = formData.phoneNumber.length < 1;
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
                value={formData.name}
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
                value={formData.surname}
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
                value={formData.email}
                onChange={onChangeData}
              />
            </div>
            <div className="form__group">
              <div className="form__label-container">
                <label htmlFor="phoneNumber" className="form__label">
                  Phone number
                </label>
              </div>
              <input
                type="number"
                className={`form__input ${fieldStatus.phoneNumber}`}
                id="phoneNumber"
                autoComplete="off"
                value={formData.phoneNumber.toString()}
                onChange={onChangeData}
              />
            </div>
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
