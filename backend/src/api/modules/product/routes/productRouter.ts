import { inject, injectable } from "inversify";
import BaseRouter from "../../../shared/routes/baseRouter";
import { AccessPolicy } from "../../auth/interfaces/AccessPolicy";
import PRODUCT_TYPES from "../types/productTypes";
import ProductController from "../controllers/productController";

@injectable()
class ProductRouter extends BaseRouter {
  constructor(
    @inject(PRODUCT_TYPES.ProductController) private readonly productController: ProductController
  ) {
    super();
  }

  initRoutes(): void {
    this.post("/products", [AccessPolicy.AUTH], (...params) =>
      this.productController.createProduct(...params)
    );
    this.get("/products", [AccessPolicy.AUTH], (...params) =>
      this.productController.getAllProductsBy(...params)
    );
    this.get("/products/:id", [AccessPolicy.AUTH], (...params) =>
      this.productController.getProductById(...params)
    );
    this.put("/products/:id", [AccessPolicy.ADMIN], (...params) =>
      this.productController.updateProduct(...params)
    );
    this.delete("/products/:id", [AccessPolicy.ADMIN], (...params) =>
      this.productController.deleteProduct(...params)
    );
  }
}

export default ProductRouter;
