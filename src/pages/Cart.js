import React, { useState } from 'react';
import Navbar from "../components/Navbar";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CloseIcon from '@mui/icons-material/Close';
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { Button, FormControl, FormControlLabel, InputAdornment, RadioGroup, TextField, Typography } from '@mui/material';
import BpRadio from '../components/SizeCheckbox';
// import { Button, Input } from '@material-tailwind/react';
import SearchIcon from '@mui/icons-material/Search';
// import { useEffect } from 'react';
// import RemoveIcon from "@mui/icons-material/Remove";
// import AddIcon from "@mui/icons-material/Add";
// import { addToCart } from '../actions/CartActions';
// import { Button, } from "@material-tailwind/react";

const Cart = ({ location, history }) => {
    const { id, qty } = useParams();
    const [shipping, setShipping] = useState('Standard Delivery');
    const [pincode, setPincode] = useState();
    // const qty = location.search ? Number(location.search.split('=')[1]) : 1
    const dispatch = useDispatch()

    console.log(dispatch, id, qty)

    const cart = useSelector(state => state.cart)
    const { cartItems } = cart;

    // useEffect((id) => {
    //   dispatch(addToCart(id, qty))
    // },[dispatch, id, qty])

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
<div className='bg-gray-200 mb-5'>
    <div className="grid grid-cols-12 gap-6 mx-5 md:mx-20">
      
    <div className="h-fit col-span-12 p-5 md:col-span-8">
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
<p className='text-md mb-5 mt-10'>Items (1)</p>
<div className="rounded-lg bg-white py-1 md:py-5 md:px-8 shadow-lg backdrop-blur-md max-sm:px-8">
    
    {/* list */}
    <div className="max-w-md mx-auto bg-white rounded-md shadow-md overflow-hidden md:max-w-2xl">

  <div className="md:flex">
    <div className="md:shrink-0">
      <img className="h-48 w-full object-cover md:w-48" src="https://images.pexels.com/photos/13484361/pexels-photo-13484361.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt="Modern building architecture"/>
    </div>
    <div className="md:flex md:justify-between gap-6 px-6 py-3">
      <div className=''>
        <p className='text-base'>Mad Monkeyz Premium</p>
        <p className='text-xs text-gray-700'>Solid cotton Men's Black T-shirt</p>
        <p className='text-sm font-semibold mt-2'>Color: <span className='text-sm font-normal'>Black</span></p>
        <p className='text-sm font-semibold mt-2'>Size: <span className='text-sm font-normal'>Medium</span></p>
        <p className='text-sm font-semibold mt-2'>Quantity:</p>
      </div>
      <div className='text-right'>
      <p className="text-md font-normal text-right text-gray-900">
         ₹ 400 <span className="text-md ml-3 line-through font-medium text-gray-500">₹ 600 </span>
         </p>
        <p className="font-light text-xs text-right text-gray-600">
                      Includes all taxes & GST
        </p>
      </div>
    </div>

  </div>

  <div className='my-5' style={{width: '100%', height: '100%', border: '1px black solid'}}></div>
<div className='flex justify-center mb-3 md:my-3'>
<Button variant="text" sx={{ color: '#000000' }}>Remove</Button>
</div>

  
</div>
</div>

    </div>
    <div className="h-fit col-span-12 md:my-7 md:col-span-4">
      {/* Promo */}
      <div className="rounded-lg mt-5 md:mt-10 bg-white py-5 px-8 shadow-lg backdrop-blur-md max-sm:px-8">
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
    </div>
    </div>





{/* <div>
<body class="bg-gray-100">
  <div class="container mx-auto mt-10">
    <div class="flex shadow-md my-10">
      <div class="w-3/4 bg-white px-10 py-10">
        <div class="flex justify-between border-b pb-8">
          <h1 class="font-semibold text-2xl">Shopping Cart</h1>
          <h2 class="font-semibold text-2xl">3 Items</h2>
        </div>
        <div class="flex mt-10 mb-5">
          <h3 class="font-semibold text-gray-600 text-xs uppercase w-2/5">Product Details</h3>
          <h3 class="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">Quantity</h3>
          <h3 class="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">Price</h3>
          <h3 class="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">Total</h3>
        </div>
        <div class="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
          <div class="flex w-2/5"> 
            <div class="w-20">
              <img class="h-24" src="https://storage.cloud.google.com/firstlook-ecommerce/WhatsApp Image 2023-10-28 at 8.57.00 AM.jpeg" alt=""/>
            </div>
            <div class="flex flex-col justify-between ml-4 flex-grow">
              <span class="font-bold text-sm">Loop Knit Premium T-shirt</span>
              <span class="text-red-500 text-xs">Tommy Hilfiger</span>
              <Link to="#" class="font-semibold hover:text-red-500 text-gray-500 text-xs">Remove</Link>
            </div>
          </div>
          <div class="flex justify-center w-1/5">
            <svg class="fill-current text-gray-600 w-3" viewBox="0 0 448 512"><path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"/>
            </svg>
            <input class="mx-2 border text-center w-8" type="text" value="1"/>

            <svg class="fill-current text-gray-600 w-3" viewBox="0 0 448 512">
              <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"/>
            </svg>
          </div>
          <span class="text-center w-1/5 font-semibold text-sm">₹ 335.00</span>
          <span class="text-center w-1/5 font-semibold text-sm">₹ 335.00</span>
        </div>


        <Link to="/men" class="flex font-semibold text-indigo-600 text-sm mt-10">
      
          <svg class="fill-current mr-2 text-indigo-600 w-4" viewBox="0 0 448 512"><path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z"/></svg>
          Continue Shopping
        </Link>
      </div>

      <div id="summary" class="w-1/4 px-8 py-10">
        {/* PROMO */}
        {/* <div class="pb-10">
          <label for="promo" class="font-semibold inline-block mb-3 text-sm uppercase">Promo Code</label>
          <input type="text" id="promo" placeholder="Enter your code" class="p-2 text-sm w-full"/>
          <button class="bg-red-500 hover:bg-red-600 mt-4 px-5 py-2 text-sm text-white uppercase">Apply</button>
        </div> */}
        
        
        {/* <h1 class="font-semibold text-2xl border-b">Order Summary</h1>
        <div class="flex justify-between mt-10 mb-5">
          <span class="font-semibold text-sm uppercase">Total Item Price:</span>
          <span class="font-semibold text-sm">₹ 335</span>
        </div>
        <div class="flex justify-between mb-5">
          <span class="font-semibold text-sm uppercase">Discount:</span>
          <span class="font-semibold text-sm">₹ 0</span>
        </div> */}
        {/* <div>
          <label class="font-medium inline-block mb-3 text-sm uppercase">Shipping</label>
          <select class="block p-2 text-gray-600 w-full text-sm">
            <option>Standard shipping - ₹ 40.00</option>
          </select>
        </div> */}

        {/* <div class="border-t mt-8">
          <div class="flex font-semibold justify-between py-6 text-sm uppercase">
            <span>Total cost</span>
            <span>₹ 335</span>
          </div>
          <button class="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full">Checkout</button>
        </div>
      </div>

    </div>
  </div>
</body>
</div> */}

    {/* demo */}
    {/* <div className="flex justify-center mt-8 space-x-9"> */}
      {/* Left Grid - Cart Items */}
      {/* <div className="flex-grow max-w-md border-r pr-4">
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
    {/* </div> */}

    <div className='flex justify-center my-5'>
    <Button variant="outlined" sx={{ color: '#000000', borderColor: '#000000', '&:hover': { borderColor: '#000000', color: '#000000', backgroundColor: '#FFFFFF',},}} size="small">
          Back
    </Button>
</div>
</div>
    </>
  );
};

export default Cart;