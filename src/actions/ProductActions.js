import { ERROR, IDLE, LOADING, Product_ERROR, Product_IDLE, Product_LOADING } from "../constants/ProductConstants";
import axios from "axios";

export const listProducts = () => async (dispatch) => {
  try {
    dispatch({ type: LOADING });

    const { data } = await axios.get(`http://localhost:8080/product/list`);

    dispatch({
      type: IDLE,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};


export const listProductDetails = (id) => async (dispatch) => {
    try {
      dispatch({ type: Product_LOADING });
  
      const { data } = await axios.get(`http://localhost:8080/product/${id}`);
  
      dispatch({
        type: Product_IDLE,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: Product_ERROR,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };