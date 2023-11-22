import { Login_Fail, Login_Request, Login_Success } from "../constants/UserConstants";
import axios from 'axios';
import { Backend_URL, token } from '../App';

export const login = ( userVerify, password ) => async(dispatch) => {
try {
    dispatch({
        type: Login_Request
    })

    const config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
    }

    const {data} = await axios.post(`${Backend_URL}/users/signin`, { userVerify, password }, config);

    dispatch({
        type: Login_Success,
        payload: data
    })

    localStorage.setItem('userInfo', JSON.stringify(data))

} catch (error) {
    dispatch({
        type: Login_Fail,
        payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
}
}