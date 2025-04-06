import { inject, injectable } from "inversify";
import { createCustomError } from "../../../shared/helpers/createCustomError";
import { ErrorNames } from "../../../shared/helpers/errorNames";
import PRODUCT_TYPES from "../types/productTypes";
import IDBProduct from "../interfaces/IDBProduct";
import IProductService from "../interfaces/IProductService";
import IProductRepository from "../interfaces/IProductRepository";
import ICreateProductDTO from "../dtos/ICreateProductDTO";
import { ProductPartialZodSchema, ProductStrictZodSchema } from "../schemas/productZodSchema";
import IProductFilterDTO from "../dtos/IProductFilterDTO";
import IUpdateProductDTO from "../dtos/IUpdateProductDTO";

@injectable()
class ProductService implements IProductService {
  constructor(
    @inject(PRODUCT_TYPES.ProductRepository)
    private readonly productRepository: IProductRepository
  ) {}

  async createProduct(data: ICreateProductDTO): Promise<IDBProduct> {
    const parsedProductData = ProductStrictZodSchema.parse(data);

    return await this.productRepository.createOne(parsedProductData);
  }

  async getAllProductsBy(params: IProductFilterDTO): Promise<IDBProduct[]> {
    return await this.productRepository.getAllBy(params);
  }

  async getProductById(id: string): Promise<IDBProduct> {
    const product = await this.productRepository.getOneById(id);

    if (!product) {
      throw createCustomError(ErrorNames.NOT_FOUND);
    }

    return product;
  }

  async updateProduct(id: string, updatedInfo: IUpdateProductDTO): Promise<IDBProduct> {
    const parseUpdatedInfo = ProductPartialZodSchema.parse(updatedInfo);

    const product = await this.productRepository.getOneById(id);

    if (!product) {
      throw createCustomError(ErrorNames.NOT_FOUND);
    }

    const updatedProduct = await this.productRepository.updateOneById(id, parseUpdatedInfo);

    return updatedProduct;
  }

  async deleteProduct(id: string): Promise<void> {
    const product = await this.productRepository.getOneById(id);

    if (!product) {
      throw createCustomError(ErrorNames.NOT_FOUND);
    }

    await this.productRepository.deleteOneById(id);
  }
}

export default ProductService;
