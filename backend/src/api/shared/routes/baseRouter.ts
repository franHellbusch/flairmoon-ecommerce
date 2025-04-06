import { Request, Response, NextFunction, Router, Handler } from "express";
import { AccessPolicy } from "../../modules/auth/interfaces/AccessPolicy";
import { authMiddleware } from "../../modules/auth/middlewares/authMiddleware";

/**
 * Base class for creating reusable Express routers.
 *
 * This class provides a foundation for defining routes with common functionalities like error handling.
 * Subclasses should override the `initRoutes` method to define specific routes for their needs.
 */
class BaseRouter {
  private readonly router: Router;

  constructor() {
    this.router = Router();
    this.initRoutes();
  }

  initRoutes(): void {}

  getRouter() {
    return this.router;
  }

  get(path: string, policies: AccessPolicy[], ...callbacks: Handler[]) {
    this.router.get(path, authMiddleware(policies), this.applyCallbacks(callbacks));
  }

  post(path: string, policies: AccessPolicy[], ...callbacks: Handler[]) {
    this.router.post(path, authMiddleware(policies), this.applyCallbacks(callbacks));
  }

  put(path: string, policies: AccessPolicy[], ...callbacks: Handler[]) {
    this.router.put(path, authMiddleware(policies), this.applyCallbacks(callbacks));
  }

  delete(path: string, policies: AccessPolicy[], ...callbacks: Handler[]) {
    this.router.delete(path, authMiddleware(policies), this.applyCallbacks(callbacks));
  }

  private applyCallbacks(callbacks: Handler[]): Handler[] {
    return callbacks.map((callback) => async (...params: [Request, Response, NextFunction]) => {
      try {
        await callback.apply(this, [...params]); // Ejecuta el callback en el contexto de la clase
      } catch (error) {
        (params[2] as NextFunction)(error); // Pasa el error al siguiente middleware
      }
    });
  }
}

export default BaseRouter;
