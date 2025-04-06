import { inject, injectable } from "inversify";
import IAuthService from "../interfaces/IAuthService";
import AUTH_TYPES from "../types/authTypes";
import ICredentialService from "../interfaces/ICredentialService";
import IDBCredential, { PROVIDER } from "../interfaces/IDBCredential";
import { createCustomError } from "../../../shared/helpers/createCustomError";
import { ErrorNames } from "../../../shared/helpers/errorNames";
import USER_TYPES from "../../user/types/userTypes";
import IUserService from "../../user/interfaces/IUserService";
import IRegisterUserDTO from "../dtos/IRegisterUserDTO";
import {
  RegisterUserPartialZodSchema,
  RegisterUserStrictZodSchema,
} from "../schemas/registerUserZodSchema";

@injectable()
class AuthService implements IAuthService {
  constructor(
    @inject(AUTH_TYPES.CredentialService)
    private readonly credentialService: ICredentialService,
    @inject(USER_TYPES.UserService)
    private readonly userService: IUserService
  ) {}

  async login(email: string, password: string): Promise<IDBCredential> {
    return await this.credentialService.validateCredential({
      email,
      password,
    });
  }

  async register(data: IRegisterUserDTO): Promise<IDBCredential> {
    const { email, name, surName, password, provider, phone } =
      RegisterUserStrictZodSchema.parse(data);
    const newCredential = await this.credentialService.createCredential({
      email,
      password,
      provider,
    });
    await this.userService.createUser({
      email,
      name,
      surName,
      phone,
    });

    return newCredential;
  }

  async google({
    email,
    name,
    surName,
    password,
    provider,
    phone,
  }: IRegisterUserDTO): Promise<IDBCredential> {
    try {
      RegisterUserPartialZodSchema.parse({ email, name, surName, password, provider, phone });
      const newCredential = await this.credentialService.createCredential({
        email,
        password,
        provider,
      });
      await this.userService.createUser({
        email,
        name,
        surName,
        phone,
      });
      return newCredential;
    } catch (err: any) {
      if (err.name == ErrorNames.auth.DUPLICATE_EMAIL) {
        const credential = await this.credentialService.getCredentialByEmail(email);
        if (credential.provider != PROVIDER.GOOGLE)
          throw createCustomError(ErrorNames.auth.DUPLICATE_EMAIL);
        return credential;
      } else {
        throw err;
      }
    }
  }

  async facebook({
    email,
    name,
    surName,
    password,
    provider,
    phone,
  }: IRegisterUserDTO): Promise<IDBCredential> {
    try {
      RegisterUserPartialZodSchema.parse({ email, name, surName, password, provider, phone });
      const newCredential = await this.credentialService.createCredential({
        email,
        password,
        provider,
      });
      await this.userService.createUser({
        email,
        name,
        surName,
        phone,
      });
      return newCredential;
    } catch (err: any) {
      if (err.name == ErrorNames.auth.DUPLICATE_EMAIL) {
        const credential = await this.credentialService.getCredentialByEmail(email);
        if (credential.provider != PROVIDER.FACEBOOK)
          createCustomError(ErrorNames.auth.DUPLICATE_EMAIL);
        return credential;
      } else {
        throw err;
      }
    }
  }
}

export default AuthService;
