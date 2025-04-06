import "dotenv/config";
import { envStrictZodSchema } from "../schemas/envZodSchema";

/**
 * Centralized configuration for the application, parsed from environment variables.
 * * Uses Zod for strict validation of environment variables.
 */
const parsedEnv = envStrictZodSchema.parse(process.env);

const config = {
  globals: {
    ENV: parsedEnv.NODE_ENV,
    PORT: Number(parsedEnv.PORT),
  },
  cors: {
    origin: parsedEnv.CLIENT_URL,
    credentials: true,
  },
  server: {
    gretting: () =>
      `Server up and running on ${parsedEnv.API_URL || "http://localhost:8080"} in ${
        parsedEnv.NODE_ENV || "development"
      } environment`,
    API_URL: parsedEnv.API_URL || "http://localhost:8080",
    apiVersion: process.env.API_VERSION || "/api/v1",
  },
  morgan: {
    format: parsedEnv.NODE_ENV == "development" ? "dev" : "combined",
  },
  mongo: {
    URI: parsedEnv.MONGO_URI || "127.0.0.1:27017",
    DB_NAME: `${parsedEnv.MONGO_DB_NAME}_${parsedEnv.NODE_ENV}` || `todolist_${parsedEnv.NODE_ENV}`,
    USER: parsedEnv.MONGO_USER,
    PASSWORD: parsedEnv.MONGO_PASSWORD,
    HOST: parsedEnv.MONGO_HOST,
    QUERY: parsedEnv.MONGO_QUERY,
  },
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID || "",
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    callbackUrl: process.env.GOOGLE_CALLBACK_URL || "",
  },
  facebook: {
    clientId: process.env.FACEBOOK_CLIENT_ID || "",
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET || "",
    callbackUrl: process.env.FACEBOOK_CALLBACK_URL || "",
  },
  jwt: {
    secret: process.env.JWT_SECRET || "jwtSecret",
  },
};

export default config;
