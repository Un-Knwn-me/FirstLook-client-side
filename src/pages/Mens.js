import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import banner from "../assets/images/mens.jpg";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";
import { Checkbox, Input, List, ListItem, ListItemPrefix, Option, Select, Typography } from "@material-tailwind/react";
import axios from "axios";
import { Backend_URL, token } from "../App";
import SizeCheckbox from "../components/SizeCheckbox";

const Mens = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState();
  const [maxPrice, setMaxPrice] = useState();
  const [sortBy, setSortBy] = useState("");
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");

  useEffect(() => {
    fetchProducts();
  }, [sortBy]);

  const handleFilterChange = () => {
    fetchProducts();
  };

  const fetchProducts = async () => {
    try {
      const queryParams = {
        category,
        minPrice,
        maxPrice,
        sortBy,
        color,
        size,
      };

      // Get products
      const response = await axios.get(`${Backend_URL}/product/list`, {
        params: queryParams,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const [selectedSizes, setSelectedSizes] = useState([]);

  const handleSizeChange = (size, isChecked) => {
    if (isChecked) {
      setSelectedSizes((prevSelectedSizes) => [...prevSelectedSizes, size]);
    } else {
      setSelectedSizes((prevSelectedSizes) =>
        prevSelectedSizes.filter((selectedSize) => selectedSize !== size)
      );
    }
  };

  return (
    <>
      <Navbar title={"Men"} />
      {/* Banner */}
      <div
        className="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32"
        id="catBanner"
      >
        <img
          src={banner}
          alt="Men"
          className="absolute inset-0 -z-10 h-full w-full object-cover object-right md:object-center"
        />
      </div>

      {/* Content */}

      <div className="flex justify-center antialiased my-10">
        <p className="text-2xl font-semibold">Apparel for Mens</p>
      </div>

      <div className="grid grid-cols-12 gap-6 mx-10">
        {/* Left column for filter */}
        <div className="h-fit col-span-0 p-5 md:col-span-3">
          <Typography variant="h6" className="mb-5">
            Filter:-
          </Typography>
          
          <div className="bg-gray-200 p-5">
            {/* Category */}
            <div>
            <Typography color="blue-gray" variant="lead" className="text-base font-medium">
              Category:
            </Typography>
          <List>
        <ListItem className="p-0">
          <label
            htmlFor="vertical-list-react"
            className="flex w-full cursor-pointer items-center px-3 py-2"
          >
            <ListItemPrefix className="mr-3">
              <Checkbox
                id="vertical-list-react"
                ripple={false}
                className="hover:before:opacity-0"
                containerProps={{
                  className: "p-0",
                }}
              />
            </ListItemPrefix>
            <Typography color="blue-gray" variant="paragraph" className="text-base">
              T-Shirt
            </Typography>
          </label>
        </ListItem>
        <ListItem className="p-0">
          <label
            htmlFor="vertical-list-vue"
            className="flex w-full cursor-pointer items-center px-3 py-2"
          >
            <ListItemPrefix className="mr-3">
              <Checkbox
                id="vertical-list-vue"
                ripple={false}
                className="hover:before:opacity-0"
                containerProps={{
                  className: "p-0",
                }}
              />
            </ListItemPrefix>
            <Typography color="blue-gray" variant="paragraph" className="text-base">
              Shirt
            </Typography>
          </label>
        </ListItem>
        <ListItem className="p-0">
          <label
            htmlFor="vertical-list-svelte"
            className="flex w-full cursor-pointer items-center px-3 py-2"
          >
            <ListItemPrefix className="mr-3">
              <Checkbox
                id="vertical-list-svelte"
                ripple={false}
                className="hover:before:opacity-0"
                containerProps={{
                  className: "p-0",
                }}
              />
            </ListItemPrefix>
            <Typography color="blue-gray" variant="paragraph" className="text-base">
              Pant
            </Typography>
          </label>
        </ListItem>
      </List>
            </div>

            {/* Color */}
            <div>
            <Typography color="blue-gray" variant="lead" className="text-base font-medium">
              Category:
            </Typography>
          <List>
        <ListItem className="p-0">
          <label
            htmlFor="vertical-list-react"
            className="flex w-full cursor-pointer items-center px-3 py-2"
          >
            <ListItemPrefix className="mr-3">
              <Checkbox
                id="vertical-list-react"
                ripple={false}
                className="hover:before:opacity-0"
                containerProps={{
                  className: "p-0",
                }}
              />
            </ListItemPrefix>
            <Typography color="blue-gray" variant="paragraph" className="text-base">
              T-Shirt
            </Typography>
          </label>
        </ListItem>
        <ListItem className="p-0">
          <label
            htmlFor="vertical-list-vue"
            className="flex w-full cursor-pointer items-center px-3 py-2"
          >
            <ListItemPrefix className="mr-3">
              <Checkbox
                id="vertical-list-vue"
                ripple={false}
                className="hover:before:opacity-0"
                containerProps={{
                  className: "p-0",
                }}
              />
            </ListItemPrefix>
            <Typography color="blue-gray" variant="paragraph" className="text-base">
              Shirt
            </Typography>
          </label>
        </ListItem>
        <ListItem className="p-0">
          <label
            htmlFor="vertical-list-svelte"
            className="flex w-full cursor-pointer items-center px-3 py-2"
          >
            <ListItemPrefix className="mr-3">
              <Checkbox
                id="vertical-list-svelte"
                ripple={false}
                className="hover:before:opacity-0"
                containerProps={{
                  className: "p-0",
                }}
              />
            </ListItemPrefix>
            <Typography color="blue-gray" variant="paragraph" className="text-base">
              Pant
            </Typography>
          </label>
        </ListItem>
      </List>
            </div>

{/* Price */}
<div>
            <Typography color="blue-gray" variant="lead" className="text-base font-medium mb-4">
              Price:
            </Typography>
            <div className="grid grid-cols-12 gap-3">
  <div className="col-span-6">
    <Input
      label="Min Price"
      type="number"
      min="0"
      className="w-full sm:w-1/2"
    />
  </div>
  
  <div className="col-span-6">
    <Input
      label="Max Price"
      type="number"
      min="100"
      className="w-full sm:w-1/2"
    />
  </div>
</div>

          
            </div>

            {/* Size */}
            <div>
            <Typography color="blue-gray" variant="lead" className="text-base font-medium mb-4">
              Price:
            </Typography>
            <div className="flex space-x-4">
      <SizeCheckbox size="M" isChecked={selectedSizes.includes("M")} onChange={handleSizeChange} />
      <SizeCheckbox size="L" isChecked={selectedSizes.includes("L")} onChange={handleSizeChange} />
      <SizeCheckbox size="XL" isChecked={selectedSizes.includes("XL")} onChange={handleSizeChange} />

      <div className="mt-4">
        <Typography variant="body1">Selected Sizes: {selectedSizes.join(", ")}</Typography>
      </div>
    </div>
          
            </div>

          </div>


        </div>

        {/* Right column with product listing */}
        <div className="h-fit mb-20 col-span-12 md:col-span-9">
          <div className="flex items-center justify-between mt-5 mb-10">
            <Typography variant="h6">Mad Monkeyz Premium</Typography>
            {/* sort */}
            <div className="flex items-center gap-4">
  <Typography variant="small" color="blue-gray" className="font-medium">
    Sort By
  </Typography>
  <div className="w-full">
    <Select
      placeholder="Sort By"
      name="sortBy"
      id="sortBy"
      autoComplete="off"
      labelProps={{
        className: "before:content-none after:content-none",
      }}
      className="border-t border-blue-gray-200 focus:border-gray-600 focus-visible:border-gray-600 w-full"
      required
      value={sortBy}
      onChange={(value) => setSortBy(value)}
    >
      <Option sortBy="" className="flex items-center gap-2">
        None
      </Option>
      <Option sortBy="createdAt" className="flex items-center gap-2">
        Newest
      </Option>
      <Option value="L" className="flex items-center gap-2">
        Oldest
      </Option>
      <Option value="XL" className="flex items-center gap-2">
        Price: High to Low
      </Option>
      <Option value="2XL" className="flex items-center gap-2">
        Price: Low to High
      </Option>
    </Select>
  </div>
</div>

          </div>
          
          {products && products.length === 0 ? (
            <Loader />
          ) : (
            <div className="grid grid-cols-12 gap-6">
              {products.map((product) => (
                <ProductCard product={product} />
              ))}
            </div>
          )}
          
        </div>
      </div>
    </>
  );
};

export default Mens;
