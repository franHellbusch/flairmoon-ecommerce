import ICreateProductDTO from "../dtos/ICreateProductDTO";
import IProductFilterDTO from "../dtos/IProductFilterDTO";
import IUpdateProductDTO from "../dtos/IUpdateProductDTO";
import IDBProduct from "./IDBProduct";

interface IProductRepository {
  createOne(data: ICreateProductDTO): Promise<IDBProduct>;
  getAllBy(params?: IProductFilterDTO): Promise<IDBProduct[]>;
  getOneById(id: string): Promise<IDBProduct | null>;
  updateOneById(id: string, updatedInfo: IUpdateProductDTO): Promise<IDBProduct>;
  deleteOneById(id: string): Promise<void>;
}

export default IProductRepository;
