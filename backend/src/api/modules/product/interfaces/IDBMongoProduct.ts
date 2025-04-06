import { Document } from "mongoose";
import IDBProduct from "./IDBProduct";

/**
 * Interface representing a Product document in MongoDB.
 * * Extends the IDBProduct interface with Mongoose Document properties.
 */
export type IDBMongoProduct = IDBProduct & Document;
