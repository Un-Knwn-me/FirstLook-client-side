import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import banner from "../assets/images/mens.jpg";
import ProductCard from "../components/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/ProductActions";
import Loader from "../components/Loader";
import Alertbar from "../components/Alertbar";

const Mens = () => {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

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

      <div className="flex my-2 mx-10">
        <div className="w-1/4 bg-gray-200 p-4">
          filterzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz
        </div>

        {/* product card */}
        <div className="grid grid-col-4 gap-5 w-3/4 p-4">
          {loading ? (
            <Loader />
          ) : error ? (
            <Alertbar severity="info">{error}</Alertbar>
          ) : (
            <div>
              {products.map((product, key) => (
                <ProductCard product={product} key={key} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Mens;
