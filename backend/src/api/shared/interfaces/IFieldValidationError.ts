/**
 * Interface representing a single field validation error.
 */
export interface IFieldValidationError {
  field: string | number;
  messages: string[];
}
