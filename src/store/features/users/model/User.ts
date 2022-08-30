export interface ProtoUser {
  name?: string;
  surname?: string;
  phoneNumber: string;
  password: string;
}

export interface User {
  id: string;
  phoneNumber: string;
  token: string;
  name?: string;
  surname?: string;
}
