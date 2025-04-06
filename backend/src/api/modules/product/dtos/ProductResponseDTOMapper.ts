import IDBProduct from "../interfaces/IDBProduct";

type ExcludedProperties = "createdAt" | "updatedAt";

export interface IResponseProductDTO extends Omit<IDBProduct, ExcludedProperties> {}

class ProductResponseDTOMapper {
  static toDTO(product: IDBProduct): IResponseProductDTO {
    const productData: IResponseProductDTO = {
      id: product.id,
      title: product.title,
      price: product.price,
      description: product.description,
      images: product.images,
      stock: product.stock,
      offers: product.offers,
      variants: product.variants,
    };

    return productData;
  }
  static toListDTO(products: IDBProduct[]): IResponseProductDTO[] {
    return products.map((product) => ProductResponseDTOMapper.toDTO(product));
  }
}

export default ProductResponseDTOMapper;
