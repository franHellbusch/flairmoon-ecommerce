import { BaseMongoRepository } from "../../../shared/repositories/baseMongoRepository";
import ICreateUserDTO from "../dtos/ICreateUserDTO";
import IUpdateUserDTO from "../dtos/IUpdateUserDTO";
import { IDBMongoUser } from "../interfaces/IDBMongoUser";
import IDBUser from "../interfaces/IDBUser";
import IUserRepository from "../interfaces/IUserRepository";
import { userModel } from "../models/userModel";

/**
 * Mongoose repository for managing task-related data.
 * Extends the BaseMongoRepository to provide CRUD operations for task documents.
 */
class UserMongoRepository extends BaseMongoRepository<IDBMongoUser> implements IUserRepository {
  constructor() {
    super(userModel);
  }

  async getByEmail(email: string): Promise<IDBUser | null> {
    return await this.getBy({ email });
  }

  async getOneById(id: string): Promise<IDBUser | null> {
    return await this.getById(id);
  }

  async createOne(data: ICreateUserDTO): Promise<IDBUser> {
    return await this.create(data);
  }

  async updateOneById(id: string, updatedInfo: IUpdateUserDTO): Promise<IDBUser> {
    return await this.updateById(id, updatedInfo);
  }
}

export default UserMongoRepository;
