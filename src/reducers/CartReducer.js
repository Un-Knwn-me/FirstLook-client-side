import { Add_Item } from "../constants/CartConstants";

export const CartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case Add_Item:
      return {
        ...state,
        cartItems: action.payload,
      };
    default:
      return state;
  }
};
