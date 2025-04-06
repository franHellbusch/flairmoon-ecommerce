import { BaseMongoRepository } from "../../../shared/repositories/baseMongoRepository";
import ICreateCredentialDTO from "../dtos/ICreateCredentialDTO";
import IUpdateCredentialDTO from "../dtos/IUpdateCredentialDTO";
import ICredentialRepository from "../interfaces/ICredentialRepository";
import IDBCredential from "../interfaces/IDBCredential";
import { IDBMongoCredential } from "../interfaces/IDBMongoCredential";
import { credentialModel } from "../models/credentialModel";

/**
 * Mongoose repository for managing task-related data.
 * Extends the BaseMongoRepository to provide CRUD operations for task documents.
 */
class CredentialMongoRepository
  extends BaseMongoRepository<IDBMongoCredential>
  implements ICredentialRepository
{
  constructor() {
    super(credentialModel);
  }

  async getByEmail(email: string): Promise<IDBCredential | null> {
    return await this.getBy({ email });
  }

  async createOne(data: ICreateCredentialDTO): Promise<IDBCredential> {
    return await this.create(data);
  }

  async updateOneByEmail(email: string, updatedInfo: IUpdateCredentialDTO): Promise<IDBCredential> {
    return await this.updateBy({ email }, updatedInfo);
  }
}

export default CredentialMongoRepository;
