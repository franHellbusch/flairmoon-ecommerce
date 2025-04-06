import ICart, { ICartProduct } from "@/interfaces/ICart";

type ExcludedProperties = "id" | "products";

interface ICreateCartProductDTO extends Omit<ICartProduct, "product"> {
  product: string;
}

interface ICreateCartDTO extends Omit<ICart, ExcludedProperties> {
  products: ICreateCartProductDTO[];
}

export default ICreateCartDTO;
