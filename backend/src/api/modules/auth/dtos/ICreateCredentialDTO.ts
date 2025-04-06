import IDBCredential from "../interfaces/IDBCredential";

type ExcludedProperties = "createdAt" | "updatedAt" | "id" | "role";

interface ICreateCredentialDTO extends Omit<IDBCredential, ExcludedProperties> {}

export default ICreateCredentialDTO;
