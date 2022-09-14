import { SyntheticEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useUserApi from "../../features/users/hooks/useUserApi";
import LinkContainerStyled from "../../utils/components-utils/LinkContainerStyled";
import Button from "../Button/Button";
import RegisterStyled from "./RegisterStyled";

const Register = (): JSX.Element => {
  const formDataInitialState = {
    name: "",
    surname: "",
    email: "",
    phoneNumber: "",
    password: "",
    repeatPassword: "",
  };

  const fieldStatusInitialState = {
    email: "",
    phoneNumber: "",
    passwd: "",
    repeatPassword: "",
    user: "",
  };

  const failStatusInitialState = {
    email: "",
    phoneNumber: "",
    passwd: "",
    repeatPassword: "",
    button: "",
    user: "",
  };

  const { register } = useUserApi();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(formDataInitialState);
  const [fieldStatus, setFieldStatus] = useState(fieldStatusInitialState);
  const [failStatus, setFailStatus] = useState(failStatusInitialState);
  const [successStatus, setSuccessStatus] = useState("");

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();

    if (formData.email.search("@") < 1) {
      setFieldStatus({ ...fieldStatus, email: "form__input--wrong" });
      setFailStatus({ ...failStatus, email: "form-email__error--active" });
    } else if (formData.password.length < 8) {
      setFieldStatus({ ...fieldStatus, passwd: "form__input--wrong" });
      setFailStatus({
        ...failStatus,
        passwd: "form-password__error--active",
      });
    } else if (formData.phoneNumber.length < 9) {
      setFieldStatus({ ...fieldStatus, phoneNumber: "form__input--wrong" });
      setFailStatus({
        ...failStatus,
        phoneNumber: "form-phone__error--active",
      });
    } else if (formData.password !== formData.repeatPassword) {
      setFieldStatus({ ...fieldStatus, repeatPassword: "form__input--wrong" });
      setFailStatus({
        ...failStatus,
        repeatPassword: "form-check__error--active",
      });
    } else {
      try {
        await register({
          name: formData.name,
          surname: formData.surname,
          email: formData.email,
          phoneNumber: formData.phoneNumber,
          password: formData.password,
        });

        setSuccessStatus("form-check__success--active");
        setFormData(formDataInitialState);
        setTimeout(() => {
          navigate("/login");
        }, 1900);
      } catch (error) {
        setFieldStatus({ ...fieldStatus, user: "form__input--wrong" });
        setFailStatus({
          ...failStatus,
          user: "form-user__error--active",
        });
      }
    }
  };

  const hasEmptyFields =
    formData.name.length < 1 ||
    formData.surname.length < 1 ||
    formData.email.length < 1 ||
    formData.phoneNumber.length < 1 ||
    formData.password.length < 1 ||
    formData.repeatPassword.length < 1;

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

  return (
    <RegisterStyled>
      <form onSubmit={handleSubmit} className="form">
        <div className="form__heading-container">
          <h1 className="form__heading">Register</h1>
        </div>
        <div className="form__groups">
          <div className="form__group">
            <div className="form__label-container">
              <label className="form__label" htmlFor="name">
                Name
              </label>
            </div>
            <input
              id="name"
              className="form__input"
              autoComplete="off"
              required
              onChange={onChangeData}
              value={formData.name}
            />
          </div>
          <div className="form__group">
            <div className="form__label-container">
              <label className="form__label" htmlFor="surname">
                Surname
              </label>
            </div>
            <input
              id="surname"
              className="form__input"
              autoComplete="off"
              required
              onChange={onChangeData}
              value={formData.surname}
            />
          </div>
          <div className="form__group">
            <div className="form__label-container">
              <label className="form__label" htmlFor="email">
                Email address
              </label>
            </div>
            <input
              id="email"
              className={`form__input ${fieldStatus.email}`}
              autoComplete="off"
              required
              onChange={onChangeData}
              value={formData.email}
            />
          </div>
          <div className="form__group">
            <div className="form__label-container">
              <label className="form__label" htmlFor="phoneNumber">
                Phone number
              </label>
            </div>
            <input
              type="number"
              id="phoneNumber"
              className={`form__input ${fieldStatus.phoneNumber} ${fieldStatus.user}`}
              autoComplete="off"
              required
              onChange={onChangeData}
              value={formData.phoneNumber.toString()}
            />
          </div>
          <div className="form__group">
            <div className="form__label-container">
              <label className="form__label" htmlFor="password">
                Password
              </label>
            </div>
            <input
              id="password"
              className={`form__input ${fieldStatus.repeatPassword} ${fieldStatus.passwd}`}
              type="password"
              autoComplete="off"
              required
              onChange={onChangeData}
              value={formData.password}
            />
          </div>
          <div className="form__group">
            <div className="form__label-container">
              <label className="form__label" htmlFor="repeatPassword">
                Repeat password
              </label>
            </div>
            <input
              id="repeatPassword"
              className={`form__input ${fieldStatus.repeatPassword}`}
              type="password"
              autoComplete="off"
              required
              onChange={onChangeData}
              value={formData.repeatPassword}
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
        {fieldStatus.passwd === "form__input--wrong" && (
          <div className={`form-password form-password__error--active`}>
            <span className="form-password__error">
              Your password must have 8 characters.
            </span>
          </div>
        )}
        {fieldStatus.repeatPassword === "form__input--wrong" && (
          <div className={`form-check form-check__error--active`}>
            <span className="form-check__error">Passwords don't match.</span>
          </div>
        )}
        {fieldStatus.user === "form__input--wrong" && (
          <div className={`form-user form-user__error--active`}>
            <span className="form-user__error">
              This phone number is already taken.
            </span>
          </div>
        )}
        {successStatus === "form-check__success--active" && (
          <div className={`form-check form-check__success--active`}>
            <span className="form-check__success">
              You have successfully registered.
            </span>
          </div>
        )}

        <Button
          className={`form__button ${failStatus.button}`}
          type="submit"
          disabled={hasEmptyFields}
          text="Register"
        ></Button>
        <LinkContainerStyled className="link">
          <span>
            {" "}
            Already have an account?
            <Link to={`/login`}>
              <span className="link__sign">Login</span>
            </Link>
          </span>
        </LinkContainerStyled>
      </form>
    </RegisterStyled>
  );
};

export default Register;
