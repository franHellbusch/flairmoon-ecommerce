import { inject, injectable } from "inversify";
import BaseRouter from "../../../shared/routes/baseRouter";
import { AccessPolicy } from "../../auth/interfaces/AccessPolicy";
import CART_TYPES from "../types/cartTypes";
import CartController from "../controllers/cartController";

@injectable()
class CartRouter extends BaseRouter {
  constructor(@inject(CART_TYPES.CartController) private readonly cartController: CartController) {
    super();
  }

  initRoutes(): void {
    this.post("/carts/:userId", [AccessPolicy.AUTH], (...params) =>
      this.cartController.createCart(...params)
    );
    this.get("/carts/:id", [AccessPolicy.AUTH], (...params) =>
      this.cartController.getCartById(...params)
    );
    this.post("/carts/:id/products/:productId", [AccessPolicy.AUTH], (...params) =>
      this.cartController.addOneProductToCart(...params)
    );
    this.delete("/carts/:id/products/:productId", [AccessPolicy.AUTH], (...params) =>
      this.cartController.deleteOneProductToCart(...params)
    );
    this.delete("/carts/:id/products", [AccessPolicy.AUTH], (...params) =>
      this.cartController.deleteAllFromCart(...params)
    );
    this.delete("/carts/:id", [AccessPolicy.AUTH], (...params) =>
      this.cartController.deleteCartById(...params)
    );
  }
}

export default CartRouter;
