import IDBCart, { ICartProduct } from "../interfaces/IDBCart";

type ExcludedProperties = "createdAt" | "updatedAt" | "id" | "products";

interface ICreateCartProductDTO extends Omit<ICartProduct, "product"> {
  product: string;
}

interface ICreateCartDTO extends Omit<IDBCart, ExcludedProperties> {
  products: ICreateCartProductDTO[];
}

export default ICreateCartDTO;
