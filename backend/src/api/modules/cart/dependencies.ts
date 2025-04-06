import { Container } from "inversify";
import CART_TYPES from "./types/cartTypes";
import CartRouter from "./routes/cartRouter";
import CartController from "./controllers/cartController";
import ICartRepository from "./interfaces/ICartRepository";
import ICartService from "./interfaces/ICartService";
import CartMongoRepository from "./repositories/cartMongoRepository";
import CartService from "./services/cartService";
import PRODUCT_TYPES from "../product/types/productTypes";
import ProductMongoRepository from "../product/repositories/productMongoRepository";
import IProductRepository from "../product/interfaces/IProductRepository";
import { userServiceContainer } from "../user/dependencies";

export const cartServiceContainer = new Container();
cartServiceContainer.bind<ICartRepository>(CART_TYPES.CartRepository).to(CartMongoRepository);
cartServiceContainer
  .bind<IProductRepository>(PRODUCT_TYPES.ProductRepository)
  .to(ProductMongoRepository);
cartServiceContainer.bind<ICartService>(CART_TYPES.CartService).to(CartService);

const container = new Container();

container.bind<CartController>(CART_TYPES.CartController).to(CartController);
container.bind<CartRouter>(CART_TYPES.CartRouter).to(CartRouter);

const cartContainer = Container.merge(cartServiceContainer, userServiceContainer, container);

const cartRouter = cartContainer.get<CartRouter>(CART_TYPES.CartRouter);

export default cartRouter;
