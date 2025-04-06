export enum ROLES {
  USER = "user",
  ADMIN = "admin",
}

interface IUser {
  id: string;
  email: string;
  name?: string | null;
  surName?: string | null;
  phone?: string | null;
  role: ROLES;
}

export default IUser;
