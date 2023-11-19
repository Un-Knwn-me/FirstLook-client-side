import React, { useState } from 'react';
import Navbar from "../components/Navbar";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CloseIcon from '@mui/icons-material/Close';
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { addToCart } from '../actions/CartActions';

const Cart = ({ location, history }) => {
    const id = useParams();
    const qty = location.search ? Number(location.search.split('=')[1]) : 1
    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)
    const { cartItems } = cart;

    useEffect((id) => {
      dispatch(addToCart(id, qty))
    },[dispatch, id, qty])

  const [setCartItems] = useState([
    { id: 1, name: 'Product 1', price: 50, quantity: 2 },
    { id: 2, name: 'Product 2', price: 30, quantity: 1 }
    // Add more items as needed
  ]);

  const removeItem = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
  };

  const increaseQuantity = (id) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updatedCart);
  };

  const decreaseQuantity = (id) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    );
    setCartItems(updatedCart);
  };

  const calculateTotal = () => {
    const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const shippingCharges = 10; // You can adjust this based on your logic
    const discount = 5; // You can adjust this based on your logic
    const totalBillingPrice = totalPrice + shippingCharges - discount;

    return {
      totalPrice,
      shippingCharges,
      discount,
      totalBillingPrice,
    };
  };

  const { totalPrice, shippingCharges, discount, totalBillingPrice } = calculateTotal();

  return (
    <>
    <Navbar />
    

    {/* demo */}
    <div className="flex justify-center mt-8 space-x-9">
      {/* Left Grid - Cart Items */}
      <div className="flex-grow max-w-md border-r pr-4">
        <h2 className="text-2xl font-semibold mb-4 flex items-center">
          <ShoppingCartIcon className="w-8 h-8 mr-2" />
          Your Cart
        </h2>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div>
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <CloseIcon
                    className="h-6 w-6 cursor-pointer text-red-500"
                    onClick={() => removeItem(item.id)}
                  />
                  <div>
                    <p className="text-lg font-medium">{item.name}</p>
                    <p className="text-gray-500">${item.price}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => decreaseQuantity(item.id)}
                    className="px-2 py-1 bg-gray-200 text-gray-700 rounded"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => increaseQuantity(item.id)}
                    className="px-2 py-1 bg-gray-200 text-gray-700 rounded"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Right Grid - Total and Checkout */}
      <div className="flex-shrink max-w-sm">
        <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
        <div className="flex justify-between mb-2">
          <span>Total:</span>
          <span>${totalPrice}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Shipping Charges:</span>
          <span>${shippingCharges}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Discount:</span>
          <span>-${discount}</span>
        </div>
        <hr className="my-2" />
        <div className="flex justify-between mt-2">
          <span className="text-xl font-semibold">Total Billing:</span>
          <span className="text-xl">${totalBillingPrice}</span>
        </div>
        <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
          Proceed to Pay
        </button>
      </div>
    </div>
    </>
  );
};

export default Cart;
