import { inject, injectable } from "inversify";
import IUserService from "../interfaces/IUserService";
import USER_TYPES from "../types/userTypes";
import IUserRepository from "../interfaces/IUserRepository";
import IDBUser from "../interfaces/IDBUser";
import IUpdateUserDTO from "../dtos/IUpdateUserDTO";
import { createCustomError } from "../../../shared/helpers/createCustomError";
import { ErrorNames } from "../../../shared/helpers/errorNames";
import { UserPartialZodSchema, UserStrictZodSchema } from "../schemas/userZodSchema";
import ICreateUserDTO from "../dtos/ICreateUserDTO";

@injectable()
class UserService implements IUserService {
  constructor(
    @inject(USER_TYPES.UserRepository)
    private readonly userRepository: IUserRepository
  ) {}

  async getUserByEmail(email: string): Promise<IDBUser> {
    const user = await this.userRepository.getByEmail(email);

    if (!user) {
      throw createCustomError(ErrorNames.NOT_FOUND);
    }

    return user;
  }

  async createUser(data: ICreateUserDTO): Promise<IDBUser> {
    const parsedUserData = UserStrictZodSchema.parse(data);

    const findUser = await this.userRepository.getByEmail(parsedUserData.email);

    if (findUser) {
      throw createCustomError(ErrorNames.auth.DUPLICATE_EMAIL);
    }

    return await this.userRepository.createOne(parsedUserData);
  }

  async updateUser(id: string, updatedInfo: IUpdateUserDTO): Promise<IDBUser> {
    const parseUpdatedInfo = UserPartialZodSchema.parse(updatedInfo);

    const user = await this.userRepository.getOneById(id);

    if (!user) {
      throw createCustomError(ErrorNames.NOT_FOUND);
    }

    const updatedUser = await this.userRepository.updateOneById(id, parseUpdatedInfo);

    return updatedUser;
  }
}

export default UserService;
