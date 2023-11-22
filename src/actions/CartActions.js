import { Add_Item } from "../constants/CartConstants";
import axios from 'axios';
import { Backend_URL, token } from '../App';

export const addToCart = (id, qty) => async(dispatch, getState) => {
    const { data } = await axios.get(`${Backend_URL}/product/${id}`);

    dispatch({
        type: Add_Item,
        payload: {
            product: data._id,
            productName: data.productName,
            brandName: data.brandName,
            sku: data.sku,
            Images: data.images[0],
            price: data.price,
            salesPrice: data.salesPrice,
            category: data.category,
            size: data.size,
            color: data.color,
            stock: data.stock,
            publish: data.publish,
            qty
        }
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}