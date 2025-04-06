import ICart, { ICartProduct } from "@/interfaces/ICart";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: ICart = {
  id: "",
  products: [],
  total: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (_state, action: PayloadAction<ICart>) => action.payload,
    addProduct: (state, action: PayloadAction<ICartProduct>) => {
      const existingProduct = state.products.find(
        (product) => product.product.id === action.payload.product.id
      );
      if (existingProduct) {
        existingProduct.quantity += action.payload.quantity;
        existingProduct.subtotal = action.payload.product.price * action.payload.quantity;
      } else {
        state.products.push(action.payload);
      }
      state.total += action.payload.subtotal;
    },
    removeProduct: (state, action: PayloadAction<string>) => {
      const productToRemove = state.products.find(
        (product) => product.product.id === action.payload
      );
      if (productToRemove) {
        state.total -= productToRemove.subtotal;
        state.products = state.products.filter((product) => product.product.id !== action.payload);
      }
    },
    clearCart: () => initialState,
  },
});

export const { setCart, addProduct, removeProduct, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
