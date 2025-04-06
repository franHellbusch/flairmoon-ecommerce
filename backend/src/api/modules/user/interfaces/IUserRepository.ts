import ICreateUserDTO from "../dtos/ICreateUserDTO";
import IUpdateUserDTO from "../dtos/IUpdateUserDTO";
import IDBUser from "./IDBUser";

interface IUserRepository {
  createOne(data: ICreateUserDTO): Promise<IDBUser>;
  getByEmail(email: string): Promise<IDBUser | null>;
  getOneById(id: string): Promise<IDBUser | null>;
  updateOneById(id: string, updatedInfo: IUpdateUserDTO): Promise<IDBUser>;
}

export default IUserRepository;
