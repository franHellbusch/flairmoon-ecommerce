import { IFieldValidationError } from "../interfaces/IFieldValidationError";
import { CustomError } from "./customError";
import { ErrorMessages } from "./errorMessages";

/**
 * Creates a new CustomError instance based on the provided error name.
 *
 * @param {string} name - The name of the error (e.g., 'DUPLICATE_KEY', 'MISSING_PATHS').
 * @param {IFieldValidationError[]} fields - An optional array of field validation errors.
 * @returns {CustomError} A new CustomError instance.
 */
export const createCustomError = (name: string, fields?: IFieldValidationError[]): CustomError => {
  const { message, status } = ErrorMessages[name];
  const customError = CustomError.create({ message, status, name, fields });

  return customError;
};
