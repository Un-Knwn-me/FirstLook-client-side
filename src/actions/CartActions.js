import { Add_Item } from "../constants/CartConstants";
import axios from 'axios';
import { Backend_URL, token } from '../App';

export const addToCart = (productId, quantity) => async(dispatch, getState) => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
        };
    
        const { data } = await axios.post(`${Backend_URL}/cart/addcart`,
          { productId, quantity },
          config
        );
    
        dispatch({
          type: Add_Item,
          payload: data.cart,
        });
      } catch (error) {
        console.error('Error adding item to cart:', error);
      }

}