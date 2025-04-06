import ICreateProductDTO from "../dtos/ICreateProductDTO";
import IProductFilterDTO from "../dtos/IProductFilterDTO";
import IUpdateProductDTO from "../dtos/IUpdateProductDTO";
import IDBProduct from "./IDBProduct";

interface IProductService {
  createProduct(data: ICreateProductDTO): Promise<IDBProduct>;
  getAllProductsBy(params: IProductFilterDTO): Promise<IDBProduct[]>;
  getProductById(id: string): Promise<IDBProduct>;
  updateProduct(id: string, updatedInfo: IUpdateProductDTO): Promise<IDBProduct>;
  deleteProduct(id: string): Promise<void>;
}

export default IProductService;
