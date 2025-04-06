import { Document } from "mongoose";
import IDBUser from "./IDBUser";

/**
 * Interface representing a User document in MongoDB.
 * * Extends the IDBUser interface with Mongoose Document properties.
 */
export type IDBMongoUser = IDBUser & Document;
