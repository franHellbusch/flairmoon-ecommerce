import { inject, injectable } from "inversify";
import BaseRouter from "../../../shared/routes/baseRouter";
import AUTH_TYPES from "../types/authTypes";
import AuthController from "../controllers/authController";
import { AuthStrategyMiddleware } from "../middlewares/authStrategyMiddleware";
import { AccessPolicy } from "../interfaces/AccessPolicy";

@injectable()
class AuthRouter extends BaseRouter {
  constructor(@inject(AUTH_TYPES.AuthController) private readonly authController: AuthController) {
    super();
  }

  initRoutes(): void {
    this.post("/auth/login", [AccessPolicy.NO_AUTH], AuthStrategyMiddleware("login"), (...params) =>
      this.authController.login(...params)
    );
    this.post(
      "/auth/register",
      [AccessPolicy.NO_AUTH],
      AuthStrategyMiddleware("register"),
      (...params) => this.authController.register(...params)
    );
    this.get("/auth/google", [AccessPolicy.NO_AUTH], AuthStrategyMiddleware("google"));
    this.get(
      "/auth/google/callback",
      [AccessPolicy.NO_AUTH],
      AuthStrategyMiddleware("google"),
      (...params) => this.authController.googleCallback(...params)
    );
    this.get("/auth/facebook", [AccessPolicy.NO_AUTH], AuthStrategyMiddleware("facebook"));
    this.get(
      "/auth/facebook/callback",
      [AccessPolicy.NO_AUTH],
      AuthStrategyMiddleware("facebook"),
      (...params) => this.authController.facebookCallback(...params)
    );
    this.put("/auth/credential/update-email", [AccessPolicy.AUTH], (...params) =>
      this.authController.updateEmail(...params)
    );
    this.put("/auth/refresh-cookie", [AccessPolicy.AUTH], (...params) =>
      this.authController.refreshCookie(...params)
    );
    this.post("/auth/logout", [AccessPolicy.AUTH], (...params) =>
      this.authController.logout(...params)
    );
  }
}

export default AuthRouter;
