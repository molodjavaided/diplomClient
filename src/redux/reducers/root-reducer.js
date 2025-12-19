import { combineReducers } from "redux";
import { productsReducer } from "./products-reducer";
import { cartReducer } from "./cart-reducer";
import { authReducer } from "./auth-reducer";
import { uiReducer } from "./ui-reducer";

export const rootReducer = combineReducers({
    products: productsReducer,
    cart: cartReducer,
    auth: authReducer,
    ui: uiReducer
})