import React, { useState } from 'react';
import Navbar from "../components/Navbar";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { Button, FormControl, FormControlLabel, InputAdornment, RadioGroup, TextField, Typography } from '@mui/material';
import BpRadio from '../components/SizeCheckbox';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect } from 'react';
import { getCart } from '../actions/CartActions';
import CartItemCard from '../components/CartItemCard';

const Cart = () => {
    const [shipping, setShipping] = useState('Standard Delivery');
    const [pincode, setPincode] = useState();
    const dispatch = useDispatch()

    console.log(dispatch)

    const cart = useSelector(state => state.cart)
    const { cartItems } = cart;

    useEffect((id) => {
      dispatch(getCart())
    },[dispatch])

    const updateCartItem = (itemId, newQuantity) => {
      // api call
      console.log(`Update item with ID ${itemId} to new quantity ${newQuantity}`);
    };

  // const [setCartItems] = useState([
  //   { id: 1, name: 'Product 1', price: 50, quantity: 2 },
  //   { id: 2, name: 'Product 2', price: 30, quantity: 1 }
  // ]);

  // const removeItem = (id) => {
  //   const updatedCart = cartItems.filter((item) => item.id !== id);
  //   setCartItems(updatedCart);
  // };

  // const increaseQuantity = (id) => {
  //   const updatedCart = cartItems.map((item) =>
  //     item.id === id ? { ...item, quantity: item.quantity + 1 } : item
  //   );
  //   setCartItems(updatedCart);
  // };

  // const decreaseQuantity = (id) => {
  //   const updatedCart = cartItems.map((item) =>
  //     item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
  //   );
  //   setCartItems(updatedCart);
  // };

  // const calculateTotal = () => {
  //   const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  //   const shippingCharges = 10; // You can adjust this based on your logic
  //   const discount = 5; // You can adjust this based on your logic
  //   const totalBillingPrice = totalPrice + shippingCharges - discount;

  //   return {
  //     totalPrice,
  //     shippingCharges,
  //     discount,
  //     totalBillingPrice,
  //   };
  // };

  // const { totalPrice, shippingCharges, discount, totalBillingPrice } = calculateTotal();

  return (
    <>
    <Navbar />
<div className='bg-gray-200 mb-5'>
    <div className="grid grid-cols-12 gap-6 mx-5 md:mx-20">
      
    <div className="h-fit col-span-12 py-5 md:col-span-8">
    <p className='text-md mb-5'>My Bag</p>
    {/* pincode & delivery selection */}
    <div className="rounded-lg bg-white py-5 px-8 shadow-lg md:flex md:justify-between backdrop-blur-md max-sm:px-8">
      
      <div>
      <p className='text-base'>Delivery options:</p>
        <div className="m-5">
        <FormControl>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        value={shipping}
        onChange={(e) => setShipping(e.target.value)}
      >
        <FormControlLabel value="Standard Delivery" control={<BpRadio />} label={<Typography variant="body2">Standard Delivery</Typography>} />
        <FormControlLabel
          value="disabled"
          disabled
          control={<BpRadio />}
          label={<Typography variant="body2">Express Delivery</Typography>}
        />
      </RadioGroup>
      </FormControl>
        </div>
      </div>
     
      <div>
        
<form>   
<FormControl sx={{ width: '15ch' }}>
<TextField
        required
        id="pincode"
        label="Enter pincode"
        size="small"
        type='number'
        value={pincode}
        onChange={(e) => setPincode(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        variant="standard"
      />
      </FormControl>
      <Button variant="outlined" sx={{ color: '#000000', borderColor: '#000000', '&:hover': { borderColor: '#000000', color: '#000000', backgroundColor: '#FFFFFF',}, mt:2, ml:1 }} size="small">
          Check
        </Button>
</form>

      </div>
      
    </div>

{/* List Cart Products */}
<div>
<p className='text-md mb-5 mt-10'><ShoppingCartIcon /> Items ({cartItems.length})</p>   
    {/* list */} 
    {cartItems && cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
    <div >
      {cartItems.map((item, key) => (
        <CartItemCard item={item} key={item.product._id} updateCartItem={updateCartItem} />
 ))}
 </div>
)}
</div>

    </div>
    <div className="h-fit col-span-12 md:my-7 md:col-span-4">
      {/* Promo */}
      <div className="rounded-lg -mt-10 md:mt-10 bg-white py-5 px-8 shadow-lg backdrop-blur-md max-sm:px-8">
  <label htmlFor="promoCode" className="block text-sm font-medium leading-6 text-gray-900">
    Promo code:
  </label>
  <div className="relative mt-2 rounded-md shadow-sm">
    <input
      type="text"
      name="promoCode"
      id="promoCode"
      className="w-full md:w-48 rounded-md border-0 py-1.5 pl-2 pr-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
      placeholder="Enter Promo/Coupon code"
    />
    <Button variant="outlined" sx={{ color: '#000000', borderColor: '#000000', '&:hover': { borderColor: '#000000', color: '#000000', backgroundColor: '#FFFFFF',}, m:1 }} size="small">
          Apply
        </Button>
  </div>
      </div>

{/* Order summary */}
      <div className="rounded-lg mt-10 bg-white py-5 px-8 shadow-lg backdrop-blur-md max-sm:px-8">
      <h1 class="font-medium text-md">Order Summary</h1>
      <div className='flex justify-between mt-6'>
        <p className='text-left text-sm'>Sub total</p>
        <p className='text-right text-sm'>₹ 400</p>
      </div>
      <div className='flex justify-between mt-3'>
        <p className='text-left text-sm'>Shipping Charges</p>
        <p className='text-right text-sm'>₹ 40</p>
      </div>
      <div className='flex justify-between mt-3'>
        <p className='text-left text-sm'>Discount</p>
        <p className='text-right text-sm'>- ₹ 0</p>
      </div>
      <div className='flex justify-between mt-3'>
        <p className='text-left text-sm'>Total Saving</p>
        <p className='text-right text-sm text-green-600'>₹ 200</p>
      </div>
      <div className='my-5' style={{width: '100%', height: '100%', border: '1px black solid'}}></div>
      <div className='flex justify-between mt-3'>
        <p className='text-left text-lg font-semibold'>Total Price</p>
        <p className='text-right text-lg font-semibold'>₹ 2000</p>
      </div>
      </div>
      <button type="button" class="mt-10 bg-black text-white text-sm leading-6 font-medium py-2 px-3 rounded-md w-full">Place Order</button>
    </div>
    </div>



 

    {/* demo */}
    <div className="flex justify-center mt-8 space-x-9">
      {/* Left Grid - Cart Items */}
       {/* <div className="flex-grow max-w-md border-r pr-4">
        <h2 className="text-2xl font-semibold mb-4 flex items-center">
          <ShoppingCartIcon className="w-8 h-8 mr-2" />
          Your Cart
        </h2>
      </div> */}

      {/* Right Grid - Total and Checkout */}
       {/* <div className="flex-shrink max-w-sm">
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
      </div> */}
     </div>

    <div className='flex justify-center my-5'>
    <Link to="/men">
    <Button variant="outlined" sx={{ color: '#000000', borderColor: '#000000', '&:hover': { borderColor: '#000000', color: '#000000', backgroundColor: '#FFFFFF',},}} size="small">
          Back
    </Button>
    </Link>
</div>
</div>
    </>
  );
};

export default Cart;