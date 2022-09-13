export const registerFormDataInitialState = {
  name: "",
  surname: "",
  email: "",
  phoneNumber: "",
  password: "",
  repeatPassword: "",
};

export const fieldStatusInitialState = {
  email: "",
  phoneNumber: "",
  passwd: "",
  repeatPassword: "",
};

export const registerFailStatusInitialState = {
  email: "",
  phoneNumber: "",
  passwd: "",
  repeatPassword: "",
  button: "",
};

export const loginFailStatusInitialState = {
  check: "",
  button: "",
};

export const loginFormDataInitialState = {
  phoneNumber: "",
  password: "",
};

export interface ContactDataInitialState {
  name: string;
  surname: string;
  email: string;
  phoneNumber: string;
  image: string | File;
  owner: string;
}
