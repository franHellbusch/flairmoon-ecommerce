import { NextFunction, Response, Request } from "express";
import { inject, injectable } from "inversify";
import PRODUCT_TYPES from "../types/productTypes";
import IProductService from "../interfaces/IProductService";
import ProductResponseDTOMapper from "../dtos/ProductResponseDTOMapper";

@injectable()
class ProductController {
  constructor(
    @inject(PRODUCT_TYPES.ProductService) private readonly productService: IProductService
  ) {}

  async createProduct(req: Request, res: Response, _next: NextFunction) {
    const product = await this.productService.createProduct(req.body);

    res.status(200).json({
      success: true,
      payload: ProductResponseDTOMapper.toDTO(product),
    });
  }

  async getAllProductsBy(req: Request, res: Response, _next: NextFunction) {
    const params = req.query;
    const products = await this.productService.getAllProductsBy(params);

    res.status(200).json({
      success: true,
      payload: ProductResponseDTOMapper.toListDTO(products),
    });
  }

  async getProductById(req: Request, res: Response, _next: NextFunction) {
    const { id } = req.params;
    const product = await this.productService.getProductById(id);

    res.status(200).json({
      success: true,
      payload: ProductResponseDTOMapper.toDTO(product),
    });
  }

  async updateProduct(req: Request, res: Response, _next: NextFunction) {
    const { id } = req.params;
    const product = await this.productService.updateProduct(id, req.body);

    res.status(200).json({
      success: true,
      payload: ProductResponseDTOMapper.toDTO(product),
    });
  }

  async deleteProduct(req: Request, res: Response, _next: NextFunction) {
    const { id } = req.params;
    await this.productService.deleteProduct(id);

    res.status(200).json({
      success: true,
      payload: {
        message: `Product with id ${id} deleted successfully`,
      },
    });
  }
}

export default ProductController;
