import IProduct from "@/interfaces/IProduct";

type IncludedProperties = "title";

type IProductFilterDTO = Pick<Partial<IProduct>, IncludedProperties>;

export default IProductFilterDTO;
