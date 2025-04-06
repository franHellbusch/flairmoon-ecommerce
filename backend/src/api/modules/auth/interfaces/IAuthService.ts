import IRegisterUserDTO from "../dtos/IRegisterUserDTO";
import IDBCredential from "./IDBCredential";

interface IAuthService {
  login(email: string, password: string): Promise<IDBCredential>;
  register(data: IRegisterUserDTO): Promise<IDBCredential>;
  google(data: IRegisterUserDTO): Promise<IDBCredential>;
  facebook(data: IRegisterUserDTO): Promise<IDBCredential>;
}

export default IAuthService;
