import { Add_Item, Remove_Item } from "../constants/CartConstants";

const initialState = {
  cartItems: [],
  userAddress: [],
};

export const CartReducer = (state = initialState, action) => {
  switch (action.type) {
    case Add_Item:
      return {
        cartItems: action.payload.cart,
        userAddress: action.payload.userAddress
      };
    case Remove_Item:
      return {
        ...state,
        cartItems: state.cartItems.filter(item => item.id !== action.payload),
      }
    default:
      return state;
  }
};
