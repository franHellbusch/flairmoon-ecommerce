import { Document, Model, RootFilterQuery, UpdateQuery } from "mongoose";
import { catchAndCreateMongoError } from "../helpers/catchAndCreateMongoError";

/**
 * Base class for Mongoose repositories.
 * This class provides basic CRUD (Create, Read, Update, Delete) operations for MongoDB documents using the Mongoose ODM.
 * @template T - The type of the mongoose document model.
 */
export class BaseMongoRepository<T extends Document> {
  constructor(private readonly model: Model<T>) {}

  getAll = async (params: RootFilterQuery<T> = {}) => {
    try {
      return await this.model.find(params);
    } catch (err) {
      throw catchAndCreateMongoError(err);
    }
  };

  getById = async (id: string) => {
    try {
      return await this.model.findById(id);
    } catch (err) {
      throw catchAndCreateMongoError(err);
    }
  };

  getBy = async (filter: RootFilterQuery<T> = {}) => {
    try {
      return await this.model.findOne(filter);
    } catch (err) {
      throw catchAndCreateMongoError(err);
    }
  };

  create = async (object: unknown) => {
    try {
      const data = new this.model(object);
      return await data.save();
    } catch (err) {
      throw catchAndCreateMongoError(err);
    }
  };

  updateById = async (id: string, object: UpdateQuery<T>) => {
    try {
      const data = await this.model.findByIdAndUpdate(id, object, {
        new: true,
        upsert: true,
      });

      return data;
    } catch (err) {
      throw catchAndCreateMongoError(err);
    }
  };

  updateBy = async (filter: RootFilterQuery<T> = {}, object: UpdateQuery<T>) => {
    try {
      const data = await this.model.findOneAndUpdate(filter, object, {
        new: true,
        upsert: true,
      });

      return data;
    } catch (err) {
      throw catchAndCreateMongoError(err);
    }
  };

  deleteById = async (id: string) => {
    try {
      await this.model.findByIdAndDelete(id);
    } catch (err) {
      throw catchAndCreateMongoError(err);
    }
  };

  deleteBy = async (filter: RootFilterQuery<T> = {}) => {
    try {
      await this.model.findOneAndDelete(filter);
    } catch (err) {
      throw catchAndCreateMongoError(err);
    }
  };
}
