import ICreateCredentialDTO from "../dtos/ICreateCredentialDTO";
import ICreateCredentialRequestDTO from "../dtos/ICreateCredentialRequestDTO";
import IDBCredential, { ROLES } from "./IDBCredential";

interface ICredentialService {
  createCredential(data: ICreateCredentialDTO): Promise<IDBCredential>;
  validateCredential(data: ICreateCredentialRequestDTO): Promise<IDBCredential>;
  getCredentialByEmail(email: string): Promise<IDBCredential>;
  updateEmail(email: string, newEmail: string): Promise<IDBCredential>;
}

export default ICredentialService;
