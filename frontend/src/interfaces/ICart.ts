import IProduct from "./IProduct";

export interface ICartProductVariant {
  color?: string | null;
  tone?: string | null;
}

export interface ICartProduct {
  product: IProduct;
  quantity: number;
  subtotal: number;
  variant?: ICartProductVariant;
}

interface ICart {
  id: string;
  products: ICartProduct[];
  total: number;
}

export default ICart;
