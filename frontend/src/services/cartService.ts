import config from "@/config/config";
import ICart, { ICartProductVariant } from "@/interfaces/ICart";
import axios from "axios";

// Fetches a specific cart by its ID from the API.
export const getCartById = async (id: string): Promise<ICart> => {
  const response = await axios.get(`${config.apiUrl}/carts/${id}`);
  return response.data.payload;
};

// Creates a new cart and sends it to the API.
export const createCartEmpty = async (): Promise<ICart> => {
  const response = await axios.post(`${config.apiUrl}/carts`);
  return response.data.payload;
};

// Push a product by id and sents it to a cart selected by id.
export const addOneProductToCart = async (
  id: string,
  productId: string,
  variant?: ICartProductVariant
): Promise<ICart> => {
  const response = await axios.post(`${config.apiUrl}/carts/${id}/products/${productId}`, variant);
  return response.data.payload;
};

// Remove a product by id from a cart selected by id.
export const deleteOneProductToCart = async (
  id: string,
  productId: string,
  variant?: ICartProductVariant
): Promise<ICart> => {
  const response = await axios.delete(`${config.apiUrl}/carts/${id}/products/${productId}`, {
    data: variant,
  });
  return response.data.payload;
};

// Remove all products from cart by id.
export const deleteAllFromCart = async (id: string): Promise<ICart> => {
  const response = await axios.delete(`${config.apiUrl}/carts/${id}/products`);
  return response.data.payload;
};

// Deletes a product from the API.
export const deleteCart = async (id: string): Promise<void> => {
  await axios.delete(`${config.apiUrl}/carts/${id}`);
};
