import React, { createContext } from 'react'

export const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  return (
    <div>ProductContext</div>
  )
}

export default ProductContext