import IDBProduct from "../interfaces/IDBProduct";

type ExcludedProperties = "createdAt" | "updatedAt" | "id";

interface IUpdateProductDTO extends Omit<Partial<IDBProduct>, ExcludedProperties> {}

export default IUpdateProductDTO;
