import { Response, Request, ErrorRequestHandler, NextFunction } from "express";
import { logger } from "../utils/logger";
import { CustomError } from "../helpers/customError";
import { IAppError } from "../interfaces/IAppError";
import { createCustomError } from "../helpers/createCustomError";
import { ErrorNames } from "../helpers/errorNames";

/**
 * Error handler middleware for Express applications.
 * This middleware intercepts any errors that occur during request handling and formats a consistent error response.
 */
export const errorHandlerMiddleware: ErrorRequestHandler = (
  err: IAppError | any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  // Determine if the error should be logged
  const shouldLog = err.status && err.status >= 500;

  if (shouldLog) {
    logger.error(err);
  }

  // Handle specific error types (e.g., authentication errors)
  const { message, status, name, fields } =
    err.name == "UnauthorizedError" || err.name == "InvalidTokenError"
      ? createCustomError(ErrorNames.UNAUTHORIZED)
      : CustomError.create(err); // Use the default CustomError creation logic for other errors

  res.status(status).json({
    success: false,
    error: { name, message, status, fields },
  });
};
