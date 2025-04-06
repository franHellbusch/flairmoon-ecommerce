import IDBUser from "../interfaces/IDBUser";

type ExcludedProperties = "createdAt" | "updatedAt" | "id" | "role";

interface ICreateUserDTO extends Omit<IDBUser, ExcludedProperties> {}

export default ICreateUserDTO;
