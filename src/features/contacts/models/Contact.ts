export interface Contact {
  name: string;
  surname: string;
  email: string;
  phoneNumber: string;
  backupImage?: string;
  owner: string;
}

export interface Contacts {
  contacts: Contact[];
}
