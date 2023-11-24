import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import banner from "../assets/images/mens.jpg";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";
import { Button, Option, Select, Typography } from "@material-tailwind/react";
import axios from "axios";
import { Backend_URL, token } from "../App";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup,
} from "@mui/material";
import BpRadio from "../components/SizeCheckbox";

const Mens = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState();
  const [maxPrice, setMaxPrice] = useState();
  const [sortBy, setSortBy] = useState("");
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  const handleFilterChange = () => {
    const newFilteredProducts = products.filter((item) => {
      return (
        (item.category === category || category === "") &&
        (item.color === color || color === "") &&
        (item.size === size || size === "") &&
        item.salesPrice >= (minPrice || 0) &&
        item.salesPrice <= (maxPrice || Infinity)
      );
    });
    setFilteredProducts(newFilteredProducts);
    console.log(minPrice);
  };

  useEffect(() => {
    fetchProducts();
  }, [sortBy]);

  const fetchProducts = async () => {
    try {
      // Get products
      const response = await axios.get(`${Backend_URL}/product/list`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProducts(response.data);
      setFilteredProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
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
        <div className="h-fit col-span-3 p-5 hidden md:block">
          <div className="flex justify-between">
            <Typography variant="h6" className="mb-5">
              Filter:-
            </Typography>
            <div>
              <Button size="sm" onClick={handleFilterChange}>
                Apply
              </Button>
            </div>
          </div>

          <div className="bg-gray-200 p-5">
            {/* Category */}
            <div>
              <FormControl>
                <FormLabel id="demo-customized-radios" className="mb-2">
                  Category
                </FormLabel>
                <RadioGroup
                  aria-labelledby="demo-customized-radios"
                  name="customized-radios"
                  className="ml-6"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <FormControlLabel
                    value=""
                    control={<BpRadio />}
                    label="All"
                  />
                  <FormControlLabel
                    value="T-shirts"
                    control={<BpRadio />}
                    label="T-Shirts"
                  />
                  <FormControlLabel
                    value="Shirt"
                    control={<BpRadio />}
                    label="Shirt"
                  />
                  <FormControlLabel
                    value="Pant"
                    control={<BpRadio />}
                    label="Pant"
                  />
                </RadioGroup>
              </FormControl>
            </div>

            {/* Color */}
            <div>
              <FormControl>
                <FormLabel id="demo-customized-radios" className="mb-2">
                  Color
                </FormLabel>
                <RadioGroup
                  aria-labelledby="demo-customized-radios"
                  name="customized-radios"
                  className="ml-6"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                >
                  <FormControlLabel
                    value=""
                    control={<BpRadio />}
                    label="All"
                  />
                  <FormControlLabel
                    value="Black"
                    control={<BpRadio />}
                    label="Black"
                  />
                  <FormControlLabel
                    value="White"
                    control={<BpRadio />}
                    label="White"
                  />
                  <FormControlLabel
                    value="Blue"
                    control={<BpRadio />}
                    label="Blue"
                  />
                </RadioGroup>
              </FormControl>
            </div>

            {/* Price */}
            <div>
              <Typography
                color="blue-gray"
                variant="lead"
                className="text-base font-medium mb-4"
              >
                Price:
              </Typography>
              <div className="grid grid-cols-12 gap-3">
                <div className="col-span-6">
                  <input
                    type="number"
                    name="minPrice"
                    min={0}
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    id="price"
                    className="block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                    placeholder="Min"
                  />
                </div>

                <div className="col-span-6">
                  <input
                    type="number"
                    name="maxPrice"
                    min={100}
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    id="price"
                    className="block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                    placeholder="Max"
                  />
                </div>
              </div>
            </div>

            {/* Size */}
            <div className="my-5">
              <FormControl>
                <FormLabel id="demo-customized-radios" className="mb-2">
                  Size
                </FormLabel>
                <RadioGroup
                  aria-labelledby="demo-customized-radios"
                  name="customized-radios"
                  className="ml-6"
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                >
                  <FormControlLabel
                    value=""
                    control={<BpRadio />}
                    label="All"
                  />
                  <FormControlLabel value="S" control={<BpRadio />} label="S" />
                  <FormControlLabel value="M" control={<BpRadio />} label="M" />
                  <FormControlLabel value="L" control={<BpRadio />} label="L" />
                  <FormControlLabel
                    value="XL"
                    control={<BpRadio />}
                    label="XL"
                  />
                  <FormControlLabel
                    value="2XL"
                    control={<BpRadio />}
                    label="2XL"
                  />
                  <FormControlLabel
                    value="3XL"
                    control={<BpRadio />}
                    label="3XL"
                  />
                  <FormControlLabel
                    value="4XL"
                    control={<BpRadio />}
                    label="4XL"
                  />
                </RadioGroup>
              </FormControl>
            </div>
          </div>
        </div>

        {/* Right column with product listing */}
        <div className="h-fit mb-20 col-span-12 md:col-span-9">
          <div className="flex items-center justify-between mt-5 mb-20">
            <Typography variant="h6" className="mt-5">
              Mad Monkeyz Premium
            </Typography>
            {/* sort */}
            <div className="flex items-left gap-4">
              <div className="w-full">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-medium mb-1"
                >
                  Sort-by
                </Typography>
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
                  selectSize="sm"
                  value={sortBy}
                  onChange={(value) => setSortBy(value)}
                >
                  <Option sortBy="" className="flex items-center gap-2">
                    None
                  </Option>
                  <Option
                    sortBy="createdAt"
                    className="flex items-center gap-2"
                  >
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mx-auto">
              {filteredProducts.map((product) => (
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
