import { applyMiddleware, combineReducers, legacy_createStore as createStore } from "redux";
import { composeWithDevTools } from '@redux-devtools/extension';
import thunk from "redux-thunk";
import { ProductDetailsReducer, ProductListReducer } from "./reducers/ProductReducers";
import { CartReducer } from "./reducers/CartReducer";

const reducer = combineReducers({
    productList: ProductListReducer,
    productDetails: ProductDetailsReducer,
    cart: CartReducer
})

const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []

const initialState = { cart: { cartItems: cartItemsFromStorage} }

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware),))

export default store