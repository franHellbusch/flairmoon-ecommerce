import { BaseMongoRepository } from "../../../shared/repositories/baseMongoRepository";
import { IDBMongoProduct } from "../interfaces/IDBMongoProduct";
import IDBProduct from "../interfaces/IDBProduct";
import IProductRepository from "../interfaces/IProductRepository";
import { productModel } from "../models/productModel";
import IProductFilterDTO from "../dtos/IProductFilterDTO";
import ICreateProductDTO from "../dtos/ICreateProductDTO";
import IUpdateProductDTO from "../dtos/IUpdateProductDTO";

/**
 * Mongoose repository for managing task-related data.
 * Extends the BaseMongoRepository to provide CRUD operations for task documents.
 */
class ProductMongoRepository
  extends BaseMongoRepository<IDBMongoProduct>
  implements IProductRepository
{
  constructor() {
    super(productModel);
  }

  async createOne(data: ICreateProductDTO): Promise<IDBProduct> {
    return await this.create(data);
  }

  async getAllBy(params?: IProductFilterDTO): Promise<IDBProduct[]> {
    return this.getAll(params);
  }

  async getOneById(id: string): Promise<IDBProduct | null> {
    return await this.getById(id);
  }

  async updateOneById(id: string, updatedInfo: IUpdateProductDTO): Promise<IDBProduct> {
    return await this.updateById(id, updatedInfo);
  }

  async deleteOneById(id: string): Promise<void> {
    await this.deleteById(id);
  }
}

export default ProductMongoRepository;
