import { Add_Item } from "../constants/CartConstants";
import axios from 'axios';
import { Backend_URL, token } from '../App';

export const getCart = () => async(dispatch, getState) => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
        };
    
        const { data } = await axios.get(`${Backend_URL}/cart/getProducts`,
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