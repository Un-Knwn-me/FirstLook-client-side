import { Login_Fail, Login_Request, Login_Success, Logout_Success } from "../constants/UserConstants"

export const UserLoginReducer = (state = {}, action) => {
    switch (action.type) {
        case Login_Request:
            return { loading: true }
        case Login_Success:
            return { loading: false, userInfo: action.payload }
        case Login_Fail:
            return { loading: false, erro: action.payload }
        case Logout_Success:
                return {}
        default:
            return state
    }
}