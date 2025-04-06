import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./states/auth";
import cartReducer from "./states/cart";
import productsReducer from "./states/products";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    products: productsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
