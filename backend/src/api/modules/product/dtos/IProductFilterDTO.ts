import IDBProduct from "../interfaces/IDBProduct";

type IncludedProperties = "title";

interface IProductFilterDTO extends Pick<Partial<IDBProduct>, IncludedProperties> {}

export default IProductFilterDTO;
