import IDBProduct from "../interfaces/IDBProduct";

type ExcludedProperties = "createdAt" | "updatedAt" | "id";

interface ICreateProductDTO extends Omit<IDBProduct, ExcludedProperties> {}

export default ICreateProductDTO;
