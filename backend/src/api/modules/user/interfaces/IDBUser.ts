import { ROLES } from "../../auth/interfaces/IDBCredential";

interface IDBUser {
  id: string;
  email: string;
  name?: string | null;
  surName?: string | null;
  phone?: string | null;
  role: ROLES;
  cartId?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export default IDBUser;
