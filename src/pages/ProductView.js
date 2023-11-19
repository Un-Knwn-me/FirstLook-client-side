import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Breadcrumbs,
  Button,
  Carousel,
  Chip,
  Tooltip,
} from "@material-tailwind/react";
import { RadioGroup } from "@headlessui/react";
import Rating from "../components/Rating";
import { useDispatch, useSelector } from "react-redux";
import { listProductDetails } from "../actions/ProductActions";
import Loader from "../components/Loader";
import Alertbar from "../components/Alertbar";
import FavoriteIcon from "@mui/icons-material/Favorite";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

const ProductView = (history) => {
  const { id } = useParams();
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [showAlert, setShowAlert] = useState(false);
  // const [severity, setSeverity] = useState('');
  // const [alertMessage, setAlertMessage] = useState('');

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const increaseQuantity = (productId) => {
    if (qty < product.stock) {
      setQty(qty + 1);
    }
  };

  const decreaseQuantity = (productId) => {
    if (qty > 1) {
      setQty(qty - 1);
    }
  };

  useEffect(() => {
    dispatch(listProductDetails(id));
  }, [dispatch, id]);

  const handleAddToCart = async() => {
    try {
      navigate(`/cart/${id}?qty=${qty}`);
      // setSeverity('success');
      // setAlertMessage('Added to cart');
      // setShowAlert(true);
      await console.log('working');
    } catch (error) {
      console.log(error)
      // setSeverity('error');
      // setAlertMessage(`Error: ${error.message}`);
      // setShowAlert(true);
    }
  };

  return (
    <>
      <Navbar />

      {/* <Alertbar severity={severity} onClose={() => setShowAlert(false)}>
        {alertMessage}
      </Alertbar> */}

      {loading ? (
        <Loader />
      ) : error ? (
        <Alertbar severity="error">{`Error: ${error}`}</Alertbar>
      ) : (
        <div>
          {/* navigation */}
          <div className="m-2 mx-10 md:m-5">
            <Breadcrumbs>
              <Link to="/" className="opacity-60 m-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="inherit"
                >
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
              </Link>
              <Link to="/men" className="opacity-60 m-2">
                <span className="text-base">Men</span>
              </Link>
              <span className="m-2 text-base">{product.productName}</span>
            </Breadcrumbs>
          </div>

          <div className="mx-20">
            <div className="mx-auto mt-6 sm:px-6">
              <div className="grid grid-cols-12 gap-6">
                {/* Left column with product image */}
                <div className="h-fit col-span-12 md:col-span-6">
                  {/* Image gallery */}
                  <Carousel className="rounded-xl md:max-h-screen">
                    {product.images.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`Product${index + 1}`}
                        className="h-full w-full object-cover"
                      />
                    ))}
                  </Carousel>
                </div>

                {/* Right column with product name */}
                <div className="col-span-12 md:col-span-6">
                  <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                    {product.brandName} - {product.productName}
                  </h1>

                  <p className="m-2 text-gray-600">
                    {product.productType} {product.category}
                  </p>

                  {/* Reviews */}
                  <div className="mt-3 mx-2">
                    <h3 className="sr-only">Reviews</h3>
                    <Rating
                      value={product.ratings}
                      text={`${product.numOfReviews} reviews`}
                    />
                  </div>

                  {/* Price */}
                  <div className="m-5">
                    <h1 className="text-xl font-medium text-gray-900">
                      <span className='"text-xl font-normal text-gray-900"'>
                        Price:
                      </span>{" "}
                      ₹ {product.salesPrice}{" "}
                      <span className="text-xl mx-3 line-through font-medium text-gray-500">
                        ₹ {product.price}
                      </span>
                    </h1>
                    <p className="font-light text-xs text-gray-600">
                      Includes all taxes & GST
                    </p>
                  </div>

                  {/* Colors */}
                  <div className="mt-5 mx-5">
                    <h3 className="text-md font-medium text-gray-900">
                      Color:
                    </h3>
                    <div
                      className={`w-10 h-10 m-2 bg-${product.color} rounded-full border-2 border-${product.color}`}
                    />
                  </div>

                  {/* Sizes */}
                  <div className="m-5">
                    <div className="flex items-center justify-between">
                      <h3 className="text-md font-medium text-gray-900">
                        Size:
                      </h3>
                      <Link
                        to="#"
                        className="text-sm font-medium mr-80 text-indigo-600 hover:text-indigo-500"
                      >
                        Size guide
                      </Link>
                    </div>
                    <div className="w-[50px] mt-3 h-10 px-4 bg-black rounded border border-black flex-col justify-center items-center inline-flex">
                      <div className="text-white text-xl font-medium font-['Red Hat Display'] leading-10 tracking-tight">
                        {product.size}
                      </div>
                    </div>
                  </div>

                  {/* status */}
                  <div className="mt-8 mx-5">
                    <div className="flex items-center justify-start">
                      <h3 className="text-md font-medium text-gray-900">
                        Status:
                      </h3>
                      <div className="inline-block ml-3">
                        <Chip
                          variant="gradient"
                          color={product.stock > 0 ? "green" : "red"}
                          value={
                            product.stock > 0 ? "In Stock" : "Out of Stock"
                          }
                        />
                      </div>
                    </div>
                  </div>

                  {/* Quantity */}
                  <div className="mt-8 mx-5">
                    <div className="flex items-center justify-start">
                      <h3 className="text-md font-medium text-gray-900">
                        Quantity:
                      </h3>
                    </div>
                    <div className="flex items-center m-3 space-x-4">
                      <Button
                        size="sm"
                        onClick={() => decreaseQuantity(product._id)}
                        className="px-2 py-1 bg-gray-200 text-gray-900 rounded"
                      >
                        <RemoveIcon />
                      </Button>
                      <span>{qty}</span>
                      <Button
                        size="sm"
                        onClick={() => increaseQuantity(product._id)}
                        className="px-2 py-1 bg-gray-200 text-gray-900 rounded"
                      >
                        <AddIcon />
                      </Button>
                    </div>
                  </div>

                  <p className="font-light text-xs mt-10 text-gray-600 text-center">
                    2days return & replace policy applicable to this product
                  </p>

                  {/* Add to cart */}
                  <div className="mt-3 mx-5 grid grid-cols-12 gap-3">
                    {/* Left column with product image */}
                    <div className="h-fit col-span-2">
                      <div className="group inline-flex flex-wrap items-center gap-3">
                        <Tooltip content="Whislist">
                          <span className="cursor-pointer rounded-full border border-gray-900/5 bg-gray-900/5 p-3 text-gray-900 transition-colors hover:border-gray-900/10 hover:bg-gray-900/10 hover:!opacity-100 group-hover:opacity-70">
                            <FavoriteIcon className="text-red-800" />
                          </span>
                        </Tooltip>
                      </div>
                    </div>
                    <div className="h-fit col-span-10">
                      <Button
                        onClick={handleAddToCart}
                        type="button"
                        disabled={product.stock === 0}
                        className="flex w-full items-center justify-center rounded-md border border-transparent bg-gray-900 px-8 py-3 text-base font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        Add to bag
                      </Button>
                    </div>
                  </div>

                  {/* ... (rest of your product information) */}
                </div>
              </div>
            </div>

            {/* Product info */}
            <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
              <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                  {product.productName}
                </h1>
              </div>

              {/* Options */}
              <div className="mt-4 lg:row-span-3 lg:mt-0">
                <h2 className="sr-only">Product information</h2>
                <p className="text-3xl tracking-tight text-gray-900">
                  Rs. {product.salesPrice}
                </p>

                {/* Reviews */}
                <div className="mt-6">
                  <h3 className="sr-only">Reviews</h3>
                  <Rating
                    value={product.ratings}
                    text={`${product.numOfReviews} reviews`}
                  />
                </div>

                <form className="mt-10">
                  {/* Colors */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Color</h3>

                    <RadioGroup value={"black"} className="mt-4">
                      <RadioGroup.Label className="sr-only">
                        Choose a color
                      </RadioGroup.Label>
                      <div className="flex items-center space-x-3">
                        <RadioGroup.Option
                          value={"black"}
                          className="relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none"
                        >
                          <RadioGroup.Label as="span" className="sr-only">
                            Black
                          </RadioGroup.Label>
                          <span
                            aria-hidden="true"
                            className={
                              "h-8 w-8 rounded-full border border-black border-opacity-10"
                            }
                          />
                        </RadioGroup.Option>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Sizes */}
                  <div className="mt-10">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-gray-900">
                        Size
                      </h3>
                      <Link
                        to="#"
                        className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Size guide
                      </Link>
                    </div>

                    <RadioGroup value={"XL"} className="mt-4">
                      <RadioGroup.Label className="sr-only">
                        Choose a size
                      </RadioGroup.Label>
                      <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                        <RadioGroup.Option
                          value={"XL"}
                          className={
                            "group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6"
                          }
                        >
                          <>
                            <RadioGroup.Label as="span">XL</RadioGroup.Label>
                            <span
                              className="pointer-events-none absolute -inset-px rounded-md"
                              aria-hidden="true"
                            />
                            <span
                              aria-hidden="true"
                              className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                            >
                              <svg
                                className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                                viewBox="0 0 100 100"
                                preserveAspectRatio="none"
                                stroke="currentColor"
                              >
                                <line
                                  x1={0}
                                  y1={100}
                                  x2={100}
                                  y2={0}
                                  vectorEffect="non-scaling-stroke"
                                />
                              </svg>
                            </span>
                          </>
                        </RadioGroup.Option>
                      </div>
                    </RadioGroup>
                  </div>

                  <button
                    type="submit"
                    className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Add to bag
                  </button>
                </form>
              </div>

              <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
                {/* Description and details */}
                <div>
                  <h3 className="sr-only">Description</h3>

                  <div className="space-y-6">
                    <p className="text-base text-gray-900">
                      {product.description}
                    </p>
                  </div>
                </div>

                <div className="mt-10">
                  <h3 className="text-sm font-medium text-gray-900">
                    Highlights
                  </h3>

                  {/* <div className="mt-4">
                    <ul
                      role="list"
                      className="list-disc space-y-2 pl-4 text-sm"
                    >
                      <li className="text-gray-400">
                        <span className="text-gray-600">
                          jighlight highlights
                        </span>
                      </li>
                    </ul>
                  </div> */}
                </div>

                <div className="mt-10">
                  <h2 className="text-sm font-medium text-gray-900">Details</h2>

                  <div className="mt-4 space-y-6">
                    <p className="text-sm text-gray-600">details default</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductView;
