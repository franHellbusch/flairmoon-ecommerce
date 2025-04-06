import ProductResponseDTOMapper, {
  IResponseProductDTO,
} from "../../product/dtos/ProductResponseDTOMapper";
import IDBCart from "../interfaces/IDBCart";

type ExcludedProperties = "createdAt" | "updatedAt" | "products";

export interface IResponseCartDTO extends Omit<IDBCart, ExcludedProperties> {
  products: { quantity: number; product: IResponseProductDTO; subtotal: number }[];
}

class CartResponseDTOMapper {
  static toDTO(cart: IDBCart): IResponseCartDTO {
    const cartData: IResponseCartDTO = {
      id: cart.id,
      products: cart.products.map(({ quantity, product, subtotal }) => ({
        quantity,
        product: ProductResponseDTOMapper.toDTO(product),
        subtotal,
      })),
      total: cart.total,
    };

    return cartData;
  }
}

export default CartResponseDTOMapper;
