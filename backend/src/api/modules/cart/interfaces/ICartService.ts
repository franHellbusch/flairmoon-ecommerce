import ICreateCartDTO from "../dtos/ICreateCartDTO";
import IDBCart, { ICartProductVariant } from "./IDBCart";

interface ICartService {
  createCart(userId: string, cartData?: ICreateCartDTO): Promise<IDBCart>;
  getCartById(id: string): Promise<IDBCart>;
  addOneProductToCart(
    id: string,
    productId: string,
    variant?: ICartProductVariant
  ): Promise<IDBCart>;
  deleteOneProductToCart(
    id: string,
    productId: string,
    variant?: ICartProductVariant
  ): Promise<IDBCart>;
  deleteAllFromCart(id: string): Promise<IDBCart>;
  deleteCartById(id: string): Promise<void>;
}

export default ICartService;
