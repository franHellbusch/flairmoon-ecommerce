import { z } from "zod";
import { IFieldValidationError } from "../interfaces/IFieldValidationError";

/**
 * Formats Zod validation errors into an array of IFieldValidationError objects.
 *
 * @param {z.ZodError} error - The ZodError object to be formatted.
 * @returns {IFieldValidationError[]} An array of formatted field validation errors.
 */
export function formatZodErrors(error: z.ZodError): IFieldValidationError[] {
  const formattedErrors: IFieldValidationError[] = [];

  error.errors.forEach((issue) => {
    const field = issue.path[0];

    // Find existing error for the field
    const existingError = formattedErrors.find((error) => error.field === field);

    if (existingError) {
      existingError.messages.push(issue.message);
    } else {
      formattedErrors.push({
        field,
        messages: [issue.message],
      });
    }
  });

  return formattedErrors;
}
