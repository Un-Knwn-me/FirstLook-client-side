import { Add_Item, Get_Item, Remove_Item } from "../constants/CartConstants";

const initialState = {
  cartItems: [],
  userAddress: [],
};

export const CartReducer = (state = initialState, action) => {
  switch (action.type) {
    case Get_Item:
      return {
        cartItems: action.payload.cart,
        userAddress: action.payload.userAddress
      }
    case Add_Item:
      return {
        cartItems: action.payload.cart,
        userAddress: action.payload.userAddress
      };
    case Remove_Item:
      return {
        cartItems: action.payload.cart,
      }
    default:
      return state;
  }
};
