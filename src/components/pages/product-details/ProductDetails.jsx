import { useState } from "react";
import ReactStars from "react-rating-stars-component";
import { motion } from "framer-motion";
import img from "../../../assets/product-details/image.png";
import { useEffect } from "react";
import CustomerReviews from "./CustomerReviews";
import { Link, useParams } from "react-router-dom";
import SidebarCart from "./SidebarCart";
import Swal from "sweetalert2";
import unavailableImage from "../../../assets/logo/No_image.svg";
import useProducts from "../../hooks/useProducts";

const ProductDetails = () => {
  const { id } = useParams();
  const { selectedProduct } = useProducts({ id });
  const [currentImages, setCurrentImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState();
  console.log(selectedProduct);

  if (!selectedProduct) {
    return <span className="loading loading-ring loading-lg"></span>;
  }

  // Handle color selection
  const handleColorClick = (images) => {
    setCurrentImages(images || []);
  };

  const handleDivClick = (images) => {
    console.log(images);
    
    setSelectedImage(images);
  };

  const reviews = [
    {
      id: "1",
      username: "John Doe",
      userImage: "https://i.pravatar.cc/50?img=1",
      text: "Amazing product! Totally worth the price.",
      date: new Date("2024-11-30"),
      likes: 3,
      replies: [
        {
          text: "I agree! The quality is excellent.",
          date: new Date("2024-11-30T15:00:00"),
        },
        {
          text: "What size did you buy?",
          date: new Date("2024-12-01T10:00:00"),
        },
      ],
    },
    {
      id: "2",
      username: "Jane Smith",
      userImage: "https://i.pravatar.cc/50?img=2",
      text: "Delivery was fast, and the packaging was great. The product met all my expectations.",
      date: new Date("2024-12-01"),
      likes: 5,
      replies: [
        {
          text: "How long did it take to arrive?",
          date: new Date("2024-12-01T17:30:00"),
        },
      ],
    },
    {
      id: "3",
      username: "Alice Brown",
      userImage: "https://i.pravatar.cc/50?img=3",
      text: "Not satisfied with the customer support. The product is decent, though.",
      date: new Date("2024-12-02"),
      likes: 1,
      replies: [
        {
          text: "What issue did you face with support?",
          date: new Date("2024-12-02T08:00:00"),
        },
      ],
    },
    {
      id: "4",
      username: "Michael Lee",
      userImage: "https://i.pravatar.cc/50?img=4",
      text: "Great experience! Will definitely purchase again.",
      date: new Date("2024-12-01"),
      likes: 8,
      replies: [],
    },
    {
      id: "5",
      username: "Emma Watson",
      userImage: "https://i.pravatar.cc/50?img=5",
      text: "The product broke within a week. Disappointed.",
      date: new Date("2024-11-29"),
      likes: 0,
      replies: [
        {
          text: "Did you try contacting the seller?",
          date: new Date("2024-11-29T19:45:00"),
        },
      ],
    },
  ];

  const totalAvailableQuantity = selectedProduct?.product_inventory?.reduce(
    (acc, item) => acc + (item.show_available_quantity || 0),
    0
  );

  const handleAddToCart = (selectedProduct) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProduct = cart.find((item) => item.id === selectedProduct.id);

    if (!existingProduct) {
      Swal.fire({
        title: "Are you sure?",
        text: "You want to add this item into your cart?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
      }).then((result) => {
        if (result.isConfirmed) {
          cart.push({
            _id: selectedProduct?.id,
            name: selectedProduct?.name,
            price: selectedProduct?.price,
            quantity: 1,
          });
          localStorage.setItem("cart", JSON.stringify(cart));
          Swal.fire({
            title: "Added to your cart!",
            text: "This product has been added to your cart!",
            icon: "success",
          });
        }
      });
    } else {
      Swal.fire({
        title: "Confirm Action",
        text: "Do you want to add one more item to your cart?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Add it",
      }).then((result) => {
        if (result.isConfirmed) {
          existingProduct.quantity += 1;
          localStorage.setItem("cart", JSON.stringify(cart));
          Swal.fire({
            title: "Item Added",
            text: "1 more item has been added to your cart.",
            icon: "success",
          });
        }
      });
    }
  };

  const discountedPrice =
    selectedProduct?.selling_price *
    (1 + selectedProduct?.discount_price / 100);

  return (
    <div className="min-h-screen bg-white space-y-20">
      <div className="drawer drawer-end">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content space-y-7">
          <div className="w-11/12 mx-auto breadcrumbs text-[10px] sm:text-xs md:text-sm">
            <ul>
              <li>
                <Link to={"/"}>Home</Link>
              </li>
              <li>
                <Link to={`categoryDetails/${selectedProduct?.category?.name}`}>
                  {selectedProduct?.category?.name}
                </Link>
              </li>
              <li>{selectedProduct?.product_name || "Product Name"}</li>
            </ul>
          </div>
          <div className="w-11/12 mx-auto flex flex-wrap justify-center items-center gap-20">
            <div className="w-full lg:w-2/5 space-y-5">
              <div className="flex flex-col">
                <div className="max-sm:space-y-4">
                  <h1 className="text-lg sm:text-2xl md:text-4xl font-bold max-sm:px-10">
                    {selectedProduct?.product_name || "Product Name"}
                  </h1>
                  <div className="flex flex-wrap gap-2 items-center text-sm font-medium mt-2">
                    <p>{selectedProduct?.return || 0} days easy return</p>
                    <span>|</span>
                    <p>{selectedProduct?.warranty_info || 0}</p>
                  </div>
                  {selectedProduct && (
                    <div className="flex items-center">
                      <ReactStars
                        count={5}
                        value={parseFloat(selectedProduct?.rating) || 0}
                        size={14}
                        color2={"#ffd700"}
                      />
                      <p className="ml-2 text-sm">
                        {selectedProduct?.rating
                          ? parseFloat(selectedProduct?.rating).toFixed(1)
                          : "0"}{" "}
                        reviews
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-col space-y-4">
                <div className="flex flex-wrap space-x-2">
                  <h1 className="text-lg font-semibold">Available Colors</h1>
                  <div className="flex items-center gap-3">
                    {selectedProduct?.product_inventory?.map((color) => (
                      <div
                        key={color.product_inventory_id}
                        className="flex cursor-pointer items-center gap-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full shadow-sm"
                        onClick={() =>
                          handleColorClick(color.product_images)
                        }
                      >
                        <h1 className="text-sm font-medium">
                          {color?.color}({color.show_available_quantity})
                        </h1>
                      </div>
                    ))}
                  </div>
                </div>
                <h1>
                  <span className="text-lg font-semibold">Brand:</span>{" "}
                  {selectedProduct?.brand?.name}
                </h1>
                <h1
                  style={{
                    color: totalAvailableQuantity > 0 ? "green" : "red",
                  }}
                  className="text-lg font-semibold"
                >
                  {totalAvailableQuantity > 0
                    ? `${totalAvailableQuantity} items are available`
                    : "No products available"}
                </h1>
                <h1 className="text-sm md:text-lg text-left">
                  {selectedProduct?.summary}
                </h1>
                <div className="flex flex-col gap-3 mt-3">
                  <h1 className="text-lg sm:text-2xl lg:text-3xl font-semibold text-[#90BE32]">
                    {discountedPrice.toFixed(2)} Tk
                  </h1>
                  <div className="flex items-center gap-3 text-sm font-medium text-gray-500">
                    <p className="line-through">
                      {selectedProduct?.selling_price} Tk
                    </p>
                    <p className="text-[#f52e2e]">
                      {selectedProduct?.discount_percent}% OFF
                    </p>
                  </div>
                  <div className="flex flex-row items-center mt-4 gap-3 md:gap-5 lg:gap-7">
                    <label
                      htmlFor="my-drawer-4"
                      className="px-4 md:px-5 lg:px-6 py-1 sm:py-[6px] md:py-2 lg:py-3 bg-[#317ff3] hover:bg-[#31b2f3] text-lg font-semibold text-white rounded-full shadow-lg transition-all transform hover:scale-105 cursor-pointer"
                    >
                      Buy Now
                    </label>
                    <motion.button
                      onClick={() => handleAddToCart(selectedProduct)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 md:px-5 lg:px-6 py-1 sm:py-[6px] md:py-2 lg:py-3 bg-[#317ff3] hover:bg-[#31b2f3] text-lg font-semibold text-white rounded-full shadow-lg transition-all cursor-pointer"
                    >
                      Add To Cart
                    </motion.button>
                  </div>
                </div>
              </div>
              <div className="w-4/5 sm:w-1/2 lg:w-4/5 flex flex-col">
                <div
                  tabIndex={0}
                  className="collapse collapse-plus rounded-md bg-base-200"
                >
                  <div className="collapse-title text-xl font-medium">
                    <h1>Dimension</h1>
                  </div>
                  <div className="collapse-content space-y-[6px]">
                    {selectedProduct?.dimensions?.map((dim) => (
                      <div key={dim?.dimension_id}>
                        <p className="text-lg">
                          <span className="font-bold">Height:</span>{" "}
                          {dim.height} {dim.dimension_unit}
                        </p>
                        <p className="text-lg">
                          <span className="font-bold">Width:</span> {dim.width}{" "}
                          {dim.dimension_unit}
                        </p>
                        <p className="text-lg">
                          <span className="font-bold">Depth:</span> {dim.depth}{" "}
                          {dim.dimension_unit}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                <div
                  tabIndex={0}
                  className="collapse collapse-plus rounded-md bg-base-200"
                >
                  <div className="collapse-title text-xl font-medium">
                    <h1>Box Items</h1>
                  </div>
                  <div className="collapse-content text-lg space-y-[6px]">
                    {selectedProduct?.in_the_box
                      ?.split(",")
                      .map((item, index) => (
                        <p key={index}>{item.trim()}</p>
                      ))}
                  </div>
                </div>
                <div
                  tabIndex={0}
                  className="collapse collapse-plus rounded-md bg-base-200"
                >
                  <div className="collapse-title text-xl font-medium">
                    <h1>Materials</h1>
                  </div>
                  <div className="collapse-content space-y-[6px]">
                    {selectedProduct?.materials?.map((material) => (
                      <div key={material?.material_id}>
                        <p className="text-lg">{material.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full sm:w-4/5 md:w-3/4 lg:w-1/2 flex flex-col sm:flex-row justify-center gap-5">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="mx-auto"
              >
                {selectedImage ? (
                  <img
                    src={selectedImage}
                    className="rounded-lg sm:h-full w-full shadow-lg hover:shadow-xl transition-shadow duration-300"
                  />
                ) : (
                  <span>Loading...</span>
                )}
              </motion.div>
              <div className="flex flex-wrap sm:flex-col justify-center items-center gap-5">
                {currentImages?.map((image) => (
                  <motion.div
                    key={image.product_image_id}
                    whileHover={{ scale: 1.1 }}
                    className="border-2 border-gray-300 rounded-lg shadow-md"
                  >
                    <img
                      src={image?.image_url || unavailableImage}
                      onClick={() => handleDivClick(image)}
                      loading="lazy"
                      alt={image.product_image_id}
                      className="small-image sm:h-28 sm:w-40 md:h-24 md:w-24 object-cover rounded-md cursor-pointer"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col justify-center items-center">
            <h1 className="text-lg sm:text-xl md:text-3xl font-poppins uppercase mb-4 py-3 sm:py-4 md:py-5 w-full text-white font-medium sm:font-semibold text-center bg-[#31b2f3] shadow-lg">
              Product Details
            </h1>
            <div className="w-5/6 sm:w-11/12 mx-auto space-y-3 flex flex-col"></div>
          </div>

          <div className="flex flex-col justify-center items-center w-full">
            <h1 className="text-lg sm:text-xl md:text-3xl font-poppins uppercase mb-4 py-3 sm:py-4 md:py-5 w-full text-white font-medium sm:font-semibold text-center bg-[#31b2f3] shadow-lg">
              Customer Reviews
            </h1>
            <CustomerReviews reviews={reviews} />
          </div>
          <div className="w-full flex flex-col sm:flex-row justify-center items-center bg-[#EBFF94] p-4 sm:p-8 lg:p-12 gap-6">
            {/* Image Section */}
            <div className="w-full sm:w-1/2">
              <img
                src={img}
                alt="Kids playing with toys"
                className="w-full h-auto object-cover rounded-lg shadow-md"
              />
            </div>

            {/* Text Section */}
            <div className="flex-1 text-left space-y-4">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#FF6F61]">
                Joyful Moments for Your Kids
              </h1>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-800 leading-relaxed">
                Discover the magic of playtime with toys designed to inspire
                creativity and bring endless hours of fun. From interactive
                features to thoughtful design, every detail ensures a delightful
                experience for your little ones.
              </p>
            </div>
          </div>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <SidebarCart
            selectedProduct={selectedProduct}
            discountedPrice={discountedPrice}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
