export interface UserData {
  name?: string;
  surname?: string;
  email?: string;
  phoneNumber: string;
  password: string;
}

export interface RegisterUserData {
  phoneNumber: string;
  id: string;
}

export interface LoginUserData {
  phoneNumber: string;
  token: string;
  id: string;
}

export interface UserToken {
  user: {
    token: string;
  };
}
