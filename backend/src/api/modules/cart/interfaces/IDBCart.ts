import IDBProduct from "../../product/interfaces/IDBProduct";

export interface ICartProductVariant {
  color?: string | null;
  tone?: string | null;
}

export interface ICartProduct {
  product: IDBProduct;
  quantity: number;
  subtotal: number;
  variant?: ICartProductVariant;
}

interface IDBCart {
  id: string;
  products: ICartProduct[];
  total: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export default IDBCart;
