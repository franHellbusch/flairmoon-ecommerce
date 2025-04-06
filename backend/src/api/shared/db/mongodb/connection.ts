import mongoose from "mongoose";
import { logger } from "../../utils/logger";
import config from "../../config/config";

/**
 * Generates the MongoDB connection URL based on configuration.
 * @returns {string} The MongoDB connection URL.
 */
export const getMongoUrl = () => {
  if (!config.mongo.USER) {
    return `mongodb://${config.mongo.URI}/${config.mongo.DB_NAME}`;
  } else {
    return `mongodb+srv://${config.mongo.USER}:${config.mongo.PASSWORD}@${config.mongo.HOST}/${config.mongo.DB_NAME}?${config.mongo.QUERY}`;
  }
};

/**
 * Connects to the MongoDB database using the configured URL.
 */
export const MongoConnect = async () => {
  await mongoose.set("strictQuery", false);

  await mongoose.connect(getMongoUrl());
  logger.info("MongoDB connection established");
};
