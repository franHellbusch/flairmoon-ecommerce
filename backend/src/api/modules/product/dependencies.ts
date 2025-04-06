import { Container } from "inversify";
import PRODUCT_TYPES from "./types/productTypes";
import IProductRepository from "./interfaces/IProductRepository";
import ProductMongoRepository from "./repositories/productMongoRepository";
import IProductService from "./interfaces/IProductService";
import ProductService from "./services/productService";
import ProductController from "./controllers/productController";
import ProductRouter from "./routes/productRouter";

export const productServiceContainer = new Container();
productServiceContainer
  .bind<IProductRepository>(PRODUCT_TYPES.ProductRepository)
  .to(ProductMongoRepository);
productServiceContainer.bind<IProductService>(PRODUCT_TYPES.ProductService).to(ProductService);

const container = new Container();

container.bind<ProductController>(PRODUCT_TYPES.ProductController).to(ProductController);
container.bind<ProductRouter>(PRODUCT_TYPES.ProductRouter).to(ProductRouter);

const productContainer = Container.merge(productServiceContainer, container);

const productRouter = productContainer.get<ProductRouter>(PRODUCT_TYPES.ProductRouter);

export default productRouter;
