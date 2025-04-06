import { inject, injectable } from "inversify";
import ICredentialService from "../interfaces/ICredentialService";
import CREDENTIAL_TYPES from "../types/authTypes";
import ICredentialRepository from "../interfaces/ICredentialRepository";
import IHashService from "../interfaces/IHashService";
import ICreateCredentialDTO from "../dtos/ICreateCredentialDTO";
import IDBCredential, { ROLES } from "../interfaces/IDBCredential";
import {
  CredentialPartialZodSchema,
  CredentialStrictZodSchema,
} from "../schemas/credentialZodSchema";
import ICreateCredentialRequestDTO from "../dtos/ICreateCredentialRequestDTO";
import { createCustomError } from "../../../shared/helpers/createCustomError";
import { ErrorNames } from "../../../shared/helpers/errorNames";

@injectable()
class CredentialService implements ICredentialService {
  constructor(
    @inject(CREDENTIAL_TYPES.CredentialRepository)
    private readonly credentialRepository: ICredentialRepository,
    @inject(CREDENTIAL_TYPES.HashService)
    private readonly hashService: IHashService
  ) {}

  async createCredential({
    provider,
    email,
    password,
  }: ICreateCredentialDTO): Promise<IDBCredential> {
    if (password != null) {
      CredentialStrictZodSchema.parse({ email, password, provider });
    } else {
      CredentialPartialZodSchema.parse({ email, provider });
    }

    const findCredential = await this.credentialRepository.getByEmail(email);

    if (findCredential) {
      throw createCustomError(ErrorNames.auth.DUPLICATE_EMAIL);
    }

    const hashedPassword = !password ? null : await this.hashService.hashPassword(password);

    const newCredential = await this.credentialRepository.createOne({
      provider,
      email,
      password: hashedPassword,
    });

    return newCredential;
  }

  async validateCredential({
    email,
    password,
  }: ICreateCredentialRequestDTO): Promise<IDBCredential> {
    CredentialPartialZodSchema.parse({ email, password });

    const credential = await this.credentialRepository.getByEmail(email);

    if (!credential) {
      throw createCustomError(ErrorNames.auth.INVALID_CREDENTIALS);
    }

    if (password && credential.password) {
      const verifyPassword = await this.hashService.comparePassword(password, credential.password);

      if (!verifyPassword) {
        throw createCustomError(ErrorNames.auth.INVALID_CREDENTIALS);
      }
    }

    return credential;
  }

  async getCredentialByEmail(email: string): Promise<IDBCredential> {
    const credential = await this.credentialRepository.getByEmail(email);

    if (!credential) {
      throw createCustomError(ErrorNames.auth.CREDENTIAL_NOT_FOUND);
    }

    return credential;
  }

  async updateEmail(email: string, newEmail: string): Promise<IDBCredential> {
    // Validate new email format
    CredentialPartialZodSchema.parse({ email: newEmail });

    if (!(await this.credentialRepository.getByEmail(email)))
      throw createCustomError(ErrorNames.auth.CREDENTIAL_NOT_FOUND);

    if (await this.credentialRepository.getByEmail(newEmail))
      throw createCustomError(ErrorNames.auth.DUPLICATE_EMAIL);

    const updatedCredential = await this.credentialRepository.updateOneByEmail(email, {
      email: newEmail,
    });
    return updatedCredential;
  }
}

export default CredentialService;
