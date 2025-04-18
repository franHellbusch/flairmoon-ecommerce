/**
 * Enum containing predefined error names.
 */
export const ErrorNames = {
  INTERNAL_SERVER_ERROR: "INTERNAL_SERVER_ERROR",
  UNAUTHORIZED: "UNAUTHORIZED",
  MISSING_PATHS: "MISSING_PATHS",
  INVALID_FIELDS: "INVALID_FIELDS",
  NOT_FOUND: "NOT_FOUND",
  DUPLICATE_KEY: "DUPLICATE_KEY",
  WRONG_ID_FORMAT: "WRONG_ID_FORMAT",
  INVALID_ENVIRONMENT_VARIABLES: "INVALID_ENVIRONMENT_VARIABLES",
  FORBIDDEN: "FORBIDDEN",
  auth: {
    INVALID_CREDENTIALS: "INVALID_CREDENTIALS",
    MISSING_CREDENTIALS: "MISSING_CREDENTIALS",
    DUPLICATE_EMAIL: "DUPLICATE_EMAIL",
    CREDENTIAL_NOT_FOUND: "CREDENTIAL_NOT_FOUND",
    NO_AUTH_REQUIRED: "UNAUTHORIZED_NO_AUTH_REQUIRED",
  },
  cart: {
    PRODUCT_NOT_FOUND_IN_CART: "PRODUCT_NOT_FOUND_IN_CART",
    INSUFFICIENT_GENERAL_STOCK: "INSUFFICIENT_GENERAL_STOCK",
    INSUFFICIENT_VARIANT_STOCK: "INSUFFICIENT_VARIANT_STOCK",
    INVALID_VARIANT: "INVALID_VARIANT",
    CART_MODIFICATION_FAILED: "CART_MODIFICATION_FAILED",
  },
};
