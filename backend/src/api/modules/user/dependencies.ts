import { Container } from "inversify";
import IUserRepository from "./interfaces/IUserRepository";
import UserMongoRepository from "./repositories/userMongoRepository";
import USER_TYPES from "./types/userTypes";
import IUserService from "./interfaces/IUserService";
import UserService from "./services/userService";
import UserController from "./controllers/userController";
import UserRouter from "./routes/userRouter";

export const userServiceContainer = new Container();
userServiceContainer.bind<IUserRepository>(USER_TYPES.UserRepository).to(UserMongoRepository);
userServiceContainer.bind<IUserService>(USER_TYPES.UserService).to(UserService);

const container = new Container();

container.bind<UserController>(USER_TYPES.UserController).to(UserController);
container.bind<UserRouter>(USER_TYPES.UserRouter).to(UserRouter);

const userContainer = Container.merge(userServiceContainer, container);

const userRouter = userContainer.get<UserRouter>(USER_TYPES.UserRouter);

export default userRouter;
