import { z } from "zod";
import { ErrorNames } from "../helpers/errorNames";
import { formatZodErrors } from "../utils/formatZodErrors";
import { mongoUriZodSchema } from "./mongoUriZodSchema";
import { createCustomError } from "../helpers/createCustomError";

/**
 * Defines the schema for validating environment variables using Zod.
 */
const envBaseZodSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]),
  PORT: z.preprocess((val) => Number(val), z.number().min(1)),
  CLIENT_URL: z.string().url(),
  API_URL: z.string().url(),
  API_VERSION: z.string(),
});

const envCombinedZodSchema = envBaseZodSchema.merge(mongoUriZodSchema);

/**
 * Throws a custom error if any validation fails.
 */
export const envStrictZodSchema = envCombinedZodSchema.catch((def) => {
  throw createCustomError(ErrorNames.INVALID_ENVIRONMENT_VARIABLES, formatZodErrors(def.error));
});
