export enum PROVIDER {
  GOOGLE = "google",
  FACEBOOK = "facebook",
  LOCAL = "local",
}

export enum ROLES {
  USER = "user",
  ADMIN = "admin",
}

interface IDBCredential {
  id: string;
  email: string;
  password: string | null;
  provider: PROVIDER;
  createdAt: Date;
  updatedAt: Date;
  role: ROLES;
}

export default IDBCredential;
