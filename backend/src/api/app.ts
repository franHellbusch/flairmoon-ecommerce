import express, { Application, ErrorRequestHandler, RequestHandler, Router } from "express";
import { createServer } from "http";
import { Server } from "http";
import config from "./shared/config/config";
import { logger } from "./shared/utils/logger";

/**
 * This class represents the main application instance.
 * It encapsulates the Express application object, the HTTP server,
 * and the error handler function.
 */
class App {
  private readonly _app: Application;
  private readonly _server: Server;
  private readonly _errorHandler: ErrorRequestHandler;

  constructor(appInit: {
    middlewares: RequestHandler[];
    errorHandler: ErrorRequestHandler;
    routes: Router[];
  }) {
    this._app = express();
    this._server = createServer(this._app);
    this._errorHandler = appInit.errorHandler;

    this.setMiddlewares(appInit.middlewares);
    this.setRoutes(appInit.routes);
    this.setErrorHandler();
  }

  get app() {
    return this._app;
  }

  get server() {
    return this._server;
  }

  public listen() {
    this._server.listen(config.globals.PORT, () => {
      logger.info(config.server.gretting());
    });
  }

  public stop() {
    this._server.close();
  }

  setRoutes(routers: Router[]) {
    routers.forEach((router) => {
      this.app.use(config.server.apiVersion, router);
    });
  }

  private setMiddlewares(middlewares: RequestHandler[]) {
    middlewares.forEach((middleware) => {
      this._app.use(middleware);
    });
  }

  private setErrorHandler() {
    this._app.use(this._errorHandler);
  }
}

export default App;
