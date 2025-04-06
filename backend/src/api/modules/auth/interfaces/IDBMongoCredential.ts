import { Document } from "mongoose";
import IDBCredential from "./IDBCredential";

/**
 * Interface representing a Credential document in MongoDB.
 * * Extends the IDBCredential interface with Mongoose Document properties.
 */
export type IDBMongoCredential = IDBCredential & Document;
