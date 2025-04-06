import { PROVIDER, ROLES } from "./IDBCredential";

interface IRequestUser {
  email: string;
  provider: PROVIDER;
  role: ROLES;
}

export default IRequestUser;
