import ICreateUserDTO from "../dtos/ICreateUserDTO";
import IUpdateUserDTO from "../dtos/IUpdateUserDTO";
import IDBUser from "./IDBUser";

interface IUserService {
  getUserByEmail(email: string): Promise<IDBUser>;
  createUser(data: ICreateUserDTO): Promise<IDBUser>;
  updateUser(id: string, updatedInfo: IUpdateUserDTO): Promise<IDBUser>;
}

export default IUserService;
