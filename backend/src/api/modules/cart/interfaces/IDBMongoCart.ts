import { Document } from "mongoose";
import IDBCart from "./IDBCart";

/**
 * Interface representing a Cart document in MongoDB.
 * * Extends the IDBCart interface with Mongoose Document properties.
 */
export type IDBMongoCart = IDBCart & Document;
