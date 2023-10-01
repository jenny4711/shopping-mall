import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userReducer";
import productReducer from "./productReducer";
import cartReducer from "./cartReducer";
import commonUiReducer from "./commonUIReducer";
import orderReducer from "./orderReducer";
import requestReducer from './requestReducer';
import discountReducer from './discountReducer';
const store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
    cart: cartReducer,
    ui: commonUiReducer,
    order: orderReducer,
    reqItem:requestReducer,
    discount:discountReducer,
  },
});
export default store;
