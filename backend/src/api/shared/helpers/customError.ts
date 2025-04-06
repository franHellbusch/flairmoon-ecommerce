import { IAppError } from "../interfaces/IAppError";
import { IFieldValidationError } from "../interfaces/IFieldValidationError";
import { ErrorMessages } from "./errorMessages";
import { ErrorNames } from "./errorNames";

/**
 * CustomError class for consistent error handling throughout the application.
 */
export class CustomError extends Error {
  readonly status: number;
  readonly fields: IFieldValidationError[];

  constructor(message: string, name: string, status: number, fields?: IFieldValidationError[]) {
    super(message);
    this.name = name;
    this.status = status;

    if (fields) {
      this.fields = fields;
    }
  }

  /**
   * Creates a new CustomError instance from an existing error object.
   * Handles potential missing properties and provides defaults.
   *
   * @param {IAppError} err - The error object to convert to a CustomError.
   * @returns {CustomError} A new CustomError instance.
   */
  static create = (err: IAppError): CustomError => {
    if (err instanceof CustomError) return err;

    const status = err.status || ErrorMessages[ErrorNames.INTERNAL_SERVER_ERROR].status;
    const name = err.name || ErrorNames.INTERNAL_SERVER_ERROR;
    const message = err.message || ErrorMessages[ErrorNames.INTERNAL_SERVER_ERROR].message;
    const fields = err.fields;

    return new CustomError(message, name, status, fields);
  };
}
