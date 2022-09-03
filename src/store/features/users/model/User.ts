export interface RegisterUserData {
  phoneNumber: string;
  password: string;
  name: string;
  surname: string;
  email: string;
}

export interface LoginUserData {
  phoneNumber: string;
  token: string;
  id: string;
}
