import { SyntheticEvent, useState } from "react";
import useUserApi from "../../store/features/users/hooks/UserApi/useUserApi";

const Register = (): JSX.Element => {
  const initialState = {
    phoneNumber: "",
    password: "",
    repeatPassword: "",
  };

  const { register } = useUserApi();
  const [formData, setFormData] = useState(initialState);
  const [fieldStatus, setFieldStatus] = useState("");

  const onSubmitData = async (event: SyntheticEvent) => {
    event.preventDefault();
    if (formData.password !== formData.repeatPassword) {
      setFieldStatus("form__input--wrong");
    } else {
      register({
        phoneNumber: formData.phoneNumber,
        password: formData.password,
      });
    }

    setFormData(initialState);
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
    <form onSubmit={onSubmitData}>
      <span className="form__heading">Create your account</span>
      <div className="form__group">
        <label className="form__label" htmlFor="username">
          Phone number
        </label>
        <input
          id="phoneNumber"
          type="number"
          className="form__input"
          autoComplete="off"
          placeholder="Enter your username"
          required
          onChange={onChangeData}
          value={formData.phoneNumber}
        />
      </div>
      <div className="form__group">
        <label className="form__label" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          className={`form__input ${fieldStatus}`}
          type="password"
          placeholder="Enter your password"
          autoComplete="off"
          required
          onChange={onChangeData}
          value={formData.password}
        />
      </div>
      <div className="form__group">
        <label className="form__label" htmlFor="password">
          Repeat password
        </label>
        <input
          id="repeatPassword"
          className={`form__input ${fieldStatus}`}
          type="password"
          autoComplete="off"
          placeholder="Repeat you password"
          required
          onChange={onChangeData}
          value={formData.repeatPassword}
        />
      </div>
      <button className="form__button" type="submit" disabled={hasEmptyFields}>
        Register
      </button>
    </form>
  );
};

export default Register;
