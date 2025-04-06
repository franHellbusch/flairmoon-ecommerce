import ICreateCredentialDTO from "../dtos/ICreateCredentialDTO";
import IUpdateCredentialDTO from "../dtos/IUpdateCredentialDTO";
import IDBCredential from "./IDBCredential";

interface ICredentialRepository {
  createOne(data: ICreateCredentialDTO): Promise<IDBCredential>;
  getByEmail(email: string): Promise<IDBCredential | null>;
  updateOneByEmail(email: string, updatedInfo: IUpdateCredentialDTO): Promise<IDBCredential>;
}

export default ICredentialRepository;
