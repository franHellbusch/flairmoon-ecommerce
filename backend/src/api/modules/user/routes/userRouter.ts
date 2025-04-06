import { inject, injectable } from "inversify";
import BaseRouter from "../../../shared/routes/baseRouter";
import USER_TYPES from "../types/userTypes";
import UserController from "../controllers/userController";
import { AccessPolicy } from "../../auth/interfaces/AccessPolicy";

@injectable()
class UserRouter extends BaseRouter {
  constructor(@inject(USER_TYPES.UserController) private readonly userController: UserController) {
    super();
  }

  initRoutes(): void {
    this.get("/users/current", [AccessPolicy.USER], (...params) =>
      this.userController.getCurrentUser(...params)
    );
    this.put("/users/:id", [AccessPolicy.USER], (...params) =>
      this.userController.updateOne(...params)
    );
  }
}

export default UserRouter;
