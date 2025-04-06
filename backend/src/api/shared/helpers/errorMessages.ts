import { ErrorNames } from "./errorNames";
import httpStatus from "http-status";

/**
 * Object containing predefined error messages and their corresponding HTTP status codes.
 */
export const ErrorMessages = {
  [ErrorNames.INTERNAL_SERVER_ERROR]: {
    message: "Internal Server Error",
    status: httpStatus.INTERNAL_SERVER_ERROR,
  },
  [ErrorNames.UNAUTHORIZED]: {
    message: "Unauthorized Access: Access Denied. Please log in or contact the administrator",
    status: httpStatus.UNAUTHORIZED,
  },
  [ErrorNames.MISSING_PATHS]: {
    message: "Bad Request: Some required fields are missing",
    status: httpStatus.BAD_REQUEST,
  },
  [ErrorNames.INVALID_FIELDS]: {
    message: "Bad Request: There are some invalid fields",
    status: httpStatus.BAD_REQUEST,
  },
  [ErrorNames.NOT_FOUND]: {
    message: "Bad Request: Not found",
    status: httpStatus.NOT_FOUND,
  },
  [ErrorNames.DUPLICATE_KEY]: {
    message: "Some field with a unique value are in use",
    status: httpStatus.CONFLICT,
  },
  [ErrorNames.WRONG_ID_FORMAT]: {
    message: "Bad Request: The provided ID format is invalid",
    status: httpStatus.BAD_REQUEST,
  },
  [ErrorNames.INVALID_ENVIRONMENT_VARIABLES]: {
    message: "Invalid Environment Variables",
    status: httpStatus.BAD_REQUEST,
  },
  [ErrorNames.FORBIDDEN]: {
    message: "Forbidden: You do not have permission to access this resource",
    status: httpStatus.FORBIDDEN,
  },
  // AUTH
  [ErrorNames.auth.INVALID_CREDENTIALS]: {
    message: "Unauthorized Access: Access Denied. Invalid Credentials",
    status: httpStatus.UNAUTHORIZED,
  },
  [ErrorNames.auth.MISSING_CREDENTIALS]: {
    message: "Bad Request: Missing credentials",
    status: httpStatus.BAD_REQUEST,
  },
  [ErrorNames.auth.DUPLICATE_EMAIL]: {
    message: "Email address is already in use. Please choose a different one",
    status: httpStatus.CONFLICT,
  },
  [ErrorNames.auth.CREDENTIAL_NOT_FOUND]: {
    message: "Not Found: Credential not found",
    status: httpStatus.NOT_FOUND,
  },
  [ErrorNames.auth.NO_AUTH_REQUIRED]: {
    message: "Unauthorized: No authentication required to access this resource",
    status: httpStatus.UNAUTHORIZED,
  },
  // CART
  [ErrorNames.cart.PRODUCT_NOT_FOUND_IN_CART]: {
    message: "Product not found in the cart",
    status: httpStatus.NOT_FOUND,
  },
  [ErrorNames.cart.INSUFFICIENT_GENERAL_STOCK]: {
    message: "Insufficient general stock available for this product",
    status: httpStatus.CONFLICT,
  },
  [ErrorNames.cart.INSUFFICIENT_VARIANT_STOCK]: {
    message: "Insufficient stock available for the selected variant",
    status: httpStatus.CONFLICT,
  },
  [ErrorNames.cart.INVALID_VARIANT]: {
    message: "Invalid variant selected",
    status: httpStatus.BAD_REQUEST,
  },
  [ErrorNames.cart.CART_MODIFICATION_FAILED]: {
    message: "Failed to modify the cart",
    status: httpStatus.INTERNAL_SERVER_ERROR,
  },
};
