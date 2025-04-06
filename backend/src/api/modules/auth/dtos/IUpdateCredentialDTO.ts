import IDBCredential from "../interfaces/IDBCredential";

type ExcludedProperties = "createdAt" | "updatedAt" | "id";

interface IUpdateCredentialDTO extends Omit<Partial<IDBCredential>, ExcludedProperties> {}

export default IUpdateCredentialDTO;
