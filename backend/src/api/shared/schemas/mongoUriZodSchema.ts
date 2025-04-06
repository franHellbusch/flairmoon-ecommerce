import { z } from "zod";

/**
 * Defines the Zod schema for validating MongoDB configuration environment variables.
 */
export const mongoUriZodSchema = z.object({
  MONGO_URI: z.string(),
  MONGO_DB_NAME: z.string(),
  MONGO_USER: z.string().optional(),
  MONGO_PASSWORD: z.string().optional(),
  MONGO_HOST: z.string().optional(),
  MONGO_QUERY: z.string().optional(),
});
