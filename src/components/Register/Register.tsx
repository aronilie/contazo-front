import { SyntheticEvent, useState } from "react";
import useUserApi from "../../store/features/users/hooks/UserApi/useUserApi";
import RegisterStyled from "./RegisterStyled";

const Register = (): JSX.Element => {
  const initialState = {
    name: "",
    surname: "",
    email: "",
    phoneNumber: "",
    password: "",
    repeatPassword: "",
  };

  const { register } = useUserApi();

  const [formData, setFormData] = useState(initialState);
  const [fieldStatus, setFieldStatus] = useState("");
  const [failStatus, setFailStatus] = useState("");
  const [successStatus, setSuccessStatus] = useState("");

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    if (formData.password !== formData.repeatPassword) {
      setFieldStatus("form__input--wrong");
      setFailStatus("form-check__error--active");
    } else {
      register({
        name: formData.name,
        surname: formData.surname,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        password: formData.password,
      });
      setFailStatus("");
      setSuccessStatus("form-check__success--active");
      setFormData(initialState);
    }
  };

  const onChangeData = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFieldStatus("");
    setFormData({ ...formData, [event.target.id]: event.target.value });
  };

  const hasEmptyFields =
    formData.phoneNumber.length < 5 ||
    formData.password.length < 5 ||
    formData.repeatPassword.length < 5;

  return (
    <RegisterStyled>
      <form onSubmit={handleSubmit} className="form">
        <div className="form__heading-container">
          <span className="form__heading">Register</span>
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
              className="form__input"
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
              id="phoneNumber"
              className="form__input"
              autoComplete="off"
              required
              onChange={onChangeData}
              value={formData.phoneNumber}
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
              className={`form__input ${fieldStatus}`}
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
              className={`form__input ${fieldStatus}`}
              type="password"
              autoComplete="off"
              required
              onChange={onChangeData}
              value={formData.repeatPassword}
            />
          </div>
        </div>
        <div className={`form-check ${failStatus}`}>
          <span className="form-check__error">Passwords don't match.</span>
        </div>
        <div className={`form-check ${successStatus}`}>
          <span className="form-check__success">
            You have successfully registered.
          </span>
        </div>

        <button
          className="form__button"
          type="submit"
          disabled={hasEmptyFields}
        >
          Register
        </button>
      </form>
    </RegisterStyled>
  );
};

export default Register;
