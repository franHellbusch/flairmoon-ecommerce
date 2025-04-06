import IDBUser from "../interfaces/IDBUser";

type ExcludedProperties = "createdAt" | "updatedAt" | "id" | "role";

interface IUpdateUserDTO extends Omit<Partial<IDBUser>, ExcludedProperties> {}

export default IUpdateUserDTO;
