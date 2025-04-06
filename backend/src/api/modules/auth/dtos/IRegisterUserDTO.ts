import IDBUser from "../../user/interfaces/IDBUser";
import IDBCredential from "../interfaces/IDBCredential";

type ExcludedProperties = "createdAt" | "updatedAt" | "id" | "role";

type CombinedCredentialAndUser = IDBCredential & IDBUser;

interface IRegisterUserDTO extends Omit<CombinedCredentialAndUser, ExcludedProperties> {}

export default IRegisterUserDTO;
