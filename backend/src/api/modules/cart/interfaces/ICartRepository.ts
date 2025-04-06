import IDBProduct from "../../product/interfaces/IDBProduct";
import ICreateCartDTO from "../dtos/ICreateCartDTO";
import IDBCart, { ICartProductVariant } from "./IDBCart";

interface ICartRepository {
  createOne(cartData?: ICreateCartDTO): Promise<IDBCart>;
  getOneById(id: string): Promise<IDBCart | null>;
  addOneProduct(
    id: string,
    product: IDBProduct,
    variant?: ICartProductVariant
  ): Promise<IDBCart | null>;
  deleteOneProduct(
    id: string,
    product: IDBProduct,
    variant?: ICartProductVariant
  ): Promise<IDBCart | null>;
  deleteAllFromCart(id: string): Promise<IDBCart | null>;
  deleteOneById(id: string): Promise<void>;
}

export default ICartRepository;
