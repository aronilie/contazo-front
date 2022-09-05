import { SyntheticEvent, useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import useUserApi from "../../store/features/users/hooks/UserApi/useUserApi";
import {
  loginFailStatusInitialState,
  loginFormDataInitialState,
} from "../../utils/initialStates";
import LoginStyled from "./LoginStyled";

const Login = (): JSX.Element => {
  const { login } = useUserApi();

  const [formData, setFormData] = useState(loginFormDataInitialState);
  const [failStatus, setFailStatus] = useState(loginFailStatusInitialState);

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    setFailStatus(loginFailStatusInitialState);

    try {
      await login({
        phoneNumber: formData.phoneNumber,
        password: formData.password,
      });
      setFormData(loginFormDataInitialState);
      setFailStatus({
        ...failStatus,
        check: "form-check__success--active",
      });
    } catch {
      setFailStatus({
        ...failStatus,
        check: "form-check__error--active",
      });
    }
  };

  const hasEmptyFields =
    formData.phoneNumber.length < 1 || formData.password.length < 1;

  const onChangeData = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFailStatus(loginFailStatusInitialState);
    setFormData({ ...formData, [event.target.id]: event.target.value });

    if (hasEmptyFields) {
      setFailStatus({ ...failStatus, button: "form-button__error--active" });
    }

    if (!hasEmptyFields) {
      setFailStatus({ ...failStatus, button: "" });
    }
  };

  return (
    <LoginStyled>
      <form onSubmit={handleSubmit} className="form">
        <div className="form__heading-container">
          <h1 className="form__heading">Login</h1>
        </div>
        <div className="form__groups">
          <div className="form__group">
            <div className="form__label-container">
              <label className="form__label" htmlFor="phoneNumber">
                Phone number
              </label>
            </div>
            <input
              type="number"
              id="phoneNumber"
              className="form__input"
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
              className="form__input"
              type="password"
              autoComplete="off"
              required
              onChange={onChangeData}
              value={formData.password}
            />
          </div>
        </div>
        {failStatus.check === "form-check__error--active" && (
          <div className={`form-check form-check__error--active`}>
            <span className="form-check__error">
              Invalid phone number or password.
            </span>
          </div>
        )}
        {failStatus.check === "form-check__success--active" && (
          <div className={`form-check form-check__success--active`}>
            <span className="form-check__error">Successfully logged in.</span>
          </div>
        )}

        <button
          className={`form__button ${failStatus.button}`}
          type="submit"
          disabled={hasEmptyFields}
        >
          Login
        </button>
      </form>
    </LoginStyled>
  );
};

export default Login;
