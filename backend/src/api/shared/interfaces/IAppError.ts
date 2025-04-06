import { IFieldValidationError } from "./IFieldValidationError";

/**
 * Interface representing a generic application error.
 */
export interface IAppError {
  message: string;
  name: string;
  status: number;
  fields?: IFieldValidationError[];
}
