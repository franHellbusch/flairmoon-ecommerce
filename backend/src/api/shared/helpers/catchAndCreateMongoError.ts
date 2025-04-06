import { createCustomError } from "./createCustomError";
import { CustomError } from "./customError";
import { ErrorNames } from "./errorNames";

/**
 * This function catches MongoDB errors and creates custom errors based on the error code or name.
 *
 * @param {Error} err - The error object to handle.
 * @returns {CustomError} A custom error object with a specific error name.
 */
export const catchAndCreateMongoError = (err: any): CustomError => {
  switch (true) {
    case err.code === 11000:
      return createCustomError(ErrorNames.DUPLICATE_KEY);
    case err.name === "ValidationError":
      return createCustomError(ErrorNames.MISSING_PATHS);
    case err.name === "CastError" && err.path == "_id":
      return createCustomError(ErrorNames.WRONG_ID_FORMAT);
    default:
      return CustomError.create(err);
  }
};
