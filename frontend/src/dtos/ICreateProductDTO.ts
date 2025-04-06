import IProduct from "@/interfaces/IProduct";

type ExcludedProperties = "id";

type ICreateProductDTO = Omit<IProduct, ExcludedProperties>;

export default ICreateProductDTO;
