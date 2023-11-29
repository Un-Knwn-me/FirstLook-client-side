import { Button, FormControl, MenuItem, Select } from "@mui/material";
import React, { useState } from "react";

const CartItemCard = ({ item, updateCartItem }) => {
  const [quantity, setQuantity] = useState(item.quantity);
  const [salesPrice, setSalesPrice] = useState(item.product.salesPrice);
  const [price, setPrice] = useState(item.product.price);

  const handleChange = (event) => {
    const newQuantity = parseInt(event.target.value, 10);

    // Ensure the new quantity is within the allowed stock
    if (newQuantity <= item.product.stock) {
      setQuantity(newQuantity);
      setSalesPrice(item.product.salesPrice * newQuantity);
      setPrice(item.product.price * newQuantity);

      // Update the cart item in the backend
      updateCartItem(item._id, newQuantity);
    } else {
      // Handle the case where the new quantity exceeds stock (e.g., show a message)
      console.log("Quantity exceeds stock");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-md p-5 backdrop-blur-md shadow-md mb-10 md:my-3 overflow-hidden md:max-w-2xl">
      <div className="md:flex">
        {/* item image */}
        <div className="md:shrink-0">
          <img
            className="h-48 w-full rounded-md object-cover md:w-48"
            src={item.product.images[0]}
            alt={item.product.brandName}
          />
        </div>
        {/* item details */}
        <div className="md:flex md:justify-between gap-6 md:px-6 p-2 md:pt-0">
          <div className="">
            <p className="text-base">
              {item.product.brandName} - {item.product.productName}
            </p>
            <p className="text-xs text-gray-700">
              {item.product.productType} - {item.product.category}
            </p>
            <p className="text-sm font-semibold mt-2">
              Color:{" "}
              <span className="text-sm font-normal">{item.product.color}</span>
            </p>
            <p className="text-sm font-semibold mt-2">
              Size:{" "}
              <span className="text-sm font-normal">{item.product.size}</span>
            </p>

            {/* Quantity dropdown */}
            <div>
              <p className="text-sm font-semibold mt-2">
                Quantity:
                <span>
                  <FormControl
                    variant="standard"
                    sx={{ ml: 1, mt: -1 }}
                    size="small"
                  >
                    <Select
                      id="quantity"
                      value={quantity}
                      onChange={handleChange}
                      autoWidth
                    >
                      {/* [...Array] - it creates the new array equals to (item.product.stock), _ - it denotes no values*/}
                      {[...Array(item.product.stock)].map((_, index) => (
                        <MenuItem key={index + 1} value={index + 1}>
                          {index + 1}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </span>
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-md font-normal text-right text-gray-900">
              ₹ {salesPrice}{" "}
              <span className="text-md ml-3 line-through font-medium text-gray-500">
                ₹ {price}{" "}
              </span>
            </p>
            <p className="font-light text-xs text-right text-gray-600">
              Includes all taxes & GST
            </p>
          </div>
        </div>
      </div>

      <div
        className="my-5"
        style={{ width: "100%", height: "100%", border: "1px black solid" }}
      />
      <div className="flex justify-center">
        <Button
          variant="text"
          sx={{ color: "#000000" }}
          //   onClick={() => removeItem(item._id)}
        >
          Remove
        </Button>
      </div>
    </div>
  );
};

export default CartItemCard;
