import config from "@/config/config";
import ICreateProductDTO from "@/dtos/ICreateProductDTO";
import IProductFilterDTO from "@/dtos/IProductFilterDTO";
import IUpdateProductDTO from "@/dtos/IUpdateProductDTO";
import IProduct from "@/interfaces/IProduct";
import axios from "axios";
import qs from "qs";

// Fetches all products from the API.
export const getAllProducts = async (filters?: IProductFilterDTO): Promise<IProduct[]> => {
  let queryParams = "";

  if (filters) {
    queryParams = qs.stringify(filters, { arrayFormat: "brackets" });
  }

  const response = await axios.get(
    `${config.apiUrl}/products${queryParams ? `?${queryParams}` : ""}`
  );
  return response.data.payload;
};

// Fetches a specific product by its ID from the API.
export const getProductById = async (id: string): Promise<IProduct> => {
  const response = await axios.get(`${config.apiUrl}/products/${id}`);
  return response.data.payload;
};

// Creates a new product and sends it to the API.
export const createProduct = async (product: ICreateProductDTO): Promise<IProduct> => {
  const response = await axios.post(`${config.apiUrl}/products`, product);
  return response.data.payload;
};

// Updates an existing product in the API.
export const updateProduct = async (
  id: string,
  updatedInfo: IUpdateProductDTO
): Promise<IProduct> => {
  const response = await axios.put(`${config.apiUrl}/products/${id}`, updatedInfo);
  return response.data.payload;
};

// Deletes a product from the API.
export const deleteProduct = async (id: string): Promise<void> => {
  await axios.delete(`${config.apiUrl}/products/${id}`);
};
