import { ERROR, IDLE, LOADING, Product_ERROR, Product_IDLE, Product_LOADING } from "../constants/ProductConstants";


export const ProductListReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case LOADING:
            return { loading: true, products: [] }
        case IDLE:
            return { loading: false, products: action.payload }
        case ERROR:
            return { loading: false, erro: action.payload }
        default:
            return state
    }
}

export const ProductDetailsReducer = (state = { product: { images: [], reviews: [] } }, action) => {
    switch (action.type) {
        case Product_LOADING:
            return { loading: true, ...state }
        case Product_IDLE:
            return { loading: false, product: action.payload.product }
        case Product_ERROR:
            return { loading: false, error: action.payload.error }
        default:
            return state
    }
}