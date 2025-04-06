import IProduct from "@/interfaces/IProduct";

type ExcludedProperties = "id";

type IUpdateProductDTO = Omit<Partial<IProduct>, ExcludedProperties>;

export default IUpdateProductDTO;
