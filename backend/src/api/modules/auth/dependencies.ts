import { Container } from "inversify";
import AUTH_TYPES from "./types/authTypes";
import CredentialService from "./services/credentialService";
import ICredentialRepository from "./interfaces/ICredentialRepository";
import AuthRouter from "./routes/authRouter";
import AuthController from "./controllers/authController";
import AuthService from "./services/authService";
import IAuthService from "./interfaces/IAuthService";
import ICredentialService from "./interfaces/ICredentialService";
import PassportStrategyInstance from "./config/passport/passportStrategyRegister";
import IHashService from "./interfaces/IHashService";
import HashService from "./services/hashService";
import CredentialMongoRepository from "./repositories/credentialMongoRepository";
import { userServiceContainer } from "../user/dependencies";

// Global container
const container = new Container();
container
  .bind<ICredentialRepository>(AUTH_TYPES.CredentialRepository)
  .to(CredentialMongoRepository);
container.bind<IHashService>(AUTH_TYPES.HashService).to(HashService);
container.bind<ICredentialService>(AUTH_TYPES.CredentialService).to(CredentialService);
container.bind<IAuthService>(AUTH_TYPES.AuthService).to(AuthService);
container.bind<AuthController>(AUTH_TYPES.AuthController).to(AuthController);
container.bind<AuthRouter>(AUTH_TYPES.AuthRouter).to(AuthRouter);
container
  .bind<PassportStrategyInstance>(AUTH_TYPES.PassportStrategyInstance)
  .to(PassportStrategyInstance);

const authContainer = Container.merge(userServiceContainer, container);

authContainer.get<PassportStrategyInstance>(AUTH_TYPES.PassportStrategyInstance);
const authRouter = authContainer.get<AuthRouter>(AUTH_TYPES.AuthRouter);

export default authRouter;
