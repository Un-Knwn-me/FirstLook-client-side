import { applyMiddleware, combineReducers, legacy_createStore as createStore } from "redux";
import { composeWithDevTools } from '@redux-devtools/extension';
import thunk from "redux-thunk";
import { ProductDetailsReducer, ProductListReducer } from "./reducers/ProductReducers";
import { CartReducer } from "./reducers/CartReducer";
import { UserLoginReducer } from "./reducers/UserReducer";

const reducer = combineReducers({
    productList: ProductListReducer,
    productDetails: ProductDetailsReducer,
    cart: CartReducer,
    userLogin: UserLoginReducer,
})

const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

const initialState = { cart: { cartItems: cartItemsFromStorage}, userLogin: {userInfo: userInfoFromStorage} }

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware),))

export default store