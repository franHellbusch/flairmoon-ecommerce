import cors from "cors";
import config from "./shared/config/config";
import express from "express";
import App from "./app";
import morgan from "morgan";
import { errorHandlerMiddleware } from "./shared/middlewares/errorHandlerMiddleware";
import healthRouter from "./modules/health/dependencies";
import authRouter from "./modules/auth/dependencies";
import passport from "passport";
import cookieParser from "cookie-parser";
import userRouter from "./modules/user/dependencies";
import productRouter from "./modules/product/dependencies";
import cartRouter from "./modules/cart/dependencies";

/**
 * Initializes the application by creating an instance of the App class
 * and configuring it with necessary middlewares, routes, and the error handler.
 *
 * @returns An instance of the initialized App class.
 */
const appInit = () => {
  return new App({
    routes: [
      healthRouter.getRouter(),
      authRouter.getRouter(),
      userRouter.getRouter(),
      productRouter.getRouter(),
      cartRouter.getRouter(),
    ],
    middlewares: [
      cors(config.cors),
      express.json(),
      express.urlencoded({ extended: true }),
      morgan(config.morgan.format),
      passport.initialize(),
      cookieParser(),
    ],
    errorHandler: errorHandlerMiddleware,
  });
};

export default appInit();
