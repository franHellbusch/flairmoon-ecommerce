import IProduct from "@/interfaces/IProduct";
import { createSlice } from "@reduxjs/toolkit";

const initialState: IProduct[] = [];

export const productssSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (_state, action) => action.payload,
    addProduct: (state, action) => {
      state.push(action.payload);
    },
    updateOneProduct: (state, action) => {
      const { id, ...updatedData } = action.payload;
      return state.map((product) => (product.id === id ? { ...product, ...updatedData } : product));
    },
    deleteOneProduct: (state, action) => state.filter((product) => product.id != action.payload),
  },
});

export const { setProducts, addProduct, updateOneProduct, deleteOneProduct } =
  productssSlice.actions;
export default productssSlice.reducer;
