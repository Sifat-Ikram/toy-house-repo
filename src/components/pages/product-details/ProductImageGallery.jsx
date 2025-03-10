import { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import ProductImageZoom from "./ProductImageZoom";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import unavailableImage from "../../../assets/logo/No_image.svg";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import ShoppingCart from "../cart/ShoppingCart";
import { AuthContext } from "../../../provider/AuthProvider";
import useCart from "../../hooks/useCart";

const ProductImageGallery = ({
  currentImages,
  selectedImage,
  handleImageClick,
  currentQuantity,
  id,
}) => {
  const visibleImages = 5;
  const axiosPublic = useAxiosPublic();
  const [startIndex, setStartIndex] = useState(0);
  const [showDrawer, setShowDrawer] = useState(false);
  const { user } = useContext(AuthContext);
  const { cart } = useCart();

  const handleShowDrawer = () => {
    setShowDrawer((prev) => !prev);
  };

  useEffect(() => {
    if (showDrawer) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [showDrawer]);

  const handleNext = () => {
    if (startIndex + visibleImages < currentImages.length) {
      setStartIndex(startIndex + 1);
    }
  };

  // console.log(cartItems);

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  const handleAddToCart = async () => {
    if (currentQuantity === 0) {
      Swal.fire({
        icon: "error",
        title: "Out of Stock",
        text: "Sorry, this product is currently out of stock.",
        confirmButtonText: "OK",
      });
      return;
    }

    if (user) {
      const formattedData = {
        items: [
          ...cart.items.map((item) => ({
            product_inventory_id: item.inventory_id,
            quantity: item.quantity,
          })),
          {
            product_inventory_id: id, // Assuming `id` is defined elsewhere in your code
            quantity: 1,
          },
        ],
      };

      try {
        const response = await axiosPublic.post(
          "/api/v1/open/calculate-bill?request-id=1234",
          formattedData,
          {
            headers: {
              Authorization: `Bearer ${user}`, // Adding the Bearer token to the headers
            },
          }
        );
        console.log(response);
      } catch (error) {
        console.error("Error adding product to cart:", error);
      }
    } else {
      const formattedData = {
        items: [
          {
            product_inventory_id: id,
            quantity: 1,
          },
        ],
      };
      try {
        const response = await axiosPublic.post(
          "/api/v1/open/calculate-bill?request-id=1234",
          formattedData
        );

        if (response.status === 200) {
          const responseData = response?.data;
          const sku = responseData.items[0]?.sku;
          console.log(responseData.items[0]?.sku);
          

          if (!sku) {
            Swal.fire({
              icon: "error",
              title: "SKU Missing",
              text: "This product does not have a valid SKU.",
              confirmButtonText: "OK",
            });
            return;
          }

          // Retrieve cart from sessionStorage
          const existingCartArray =
            JSON.parse(sessionStorage.getItem("cart")) || [];

          // Check if product is already in cart
          const isProductInCart = existingCartArray.some((cartItem) =>
            cartItem.items.some((item) => item.sku === sku)
          );

          if (isProductInCart) {
            Swal.fire({
              icon: "info",
              title: "Already in Cart",
              text: "This product is already in your cart.",
              confirmButtonText: "OK",
            });
          } else {
            const updatedCart = [...existingCartArray, responseData];
            console.log(updatedCart);

            sessionStorage.setItem("cart", JSON.stringify(updatedCart));
            const productIds =
              JSON.parse(sessionStorage.getItem("productIds")) || [];

            // Check if the productId and SKU pair already exists
            const isProductIdInList = productIds.some(
              (item) => item.id === id && item.sku === sku
            );

            if (!isProductIdInList) {
              productIds.push({ id: id, sku: sku });
              sessionStorage.setItem("productIds", JSON.stringify(productIds));
              localStorage.setItem("productIds", JSON.stringify(productIds));
            }

            Swal.fire({
              icon: "success",
              title: "Added to Cart",
              text: `${responseData.items[0].product_name?.slice(
                0,
                15
              )} has been added to your cart.`,
              toast: true, // Enables a small toast notification
              position: "top-start", // Moves it to the top-left
              showConfirmButton: false, // Hides the confirm button
              timer: 2500, // Auto-closes after 3 seconds
              timerProgressBar: true, // Shows a progress bar
            });
          }
        } else {
          console.error("Failed to add to cart");
        }
      } catch (error) {
        console.error("Error adding product to cart:", error);
      }
    }
    handleShowDrawer();
  };

  return (
    <div>
      <div className="flex flex-row-reverse justify-evenly lg:items-center">
        {/* Main Product Image and Add to Cart */}
        <div className="w-3/4 sm:w-[380px] md:w-[430px] space-y-3">
          {currentImages && currentImages.length > 0 ? (
            <div className="">
              <ProductImageZoom selectedImage={selectedImage} />
            </div>
          ) : (
            <div className="flex justify-center h-[430px] items-center">
              <h1 className="text-lg font-semibold text-gray-500">
                There are no visible images
              </h1>
            </div>
          )}
          <button
            onClick={() => handleAddToCart()}
            className="text-center w-full px-6 py-3 bg-[#317ff3] hover:bg-[#31b2f3] text-lg font-semibold text-white shadow-lg transition-all transform hover:scale-105 cursor-pointer rounded-lg"
          >
            Add To Cart
          </button>
        </div>

        {/* Image Thumbnails with Navigation Buttons */}
        <div className="flex flex-col items-center space-y-[6px] sm:space-y-3">
          {currentImages.length > visibleImages && (
            <button
              onClick={handlePrev}
              className={`py-[2px] w-[50px] sm:w-[87px] flex justify-center border text-gray-800 text-center font-semibold rounded-lg transition-all transform hover:bg-gray-300 hover:scale-105 duration-200 ease-in-out ${
                startIndex === 0 ? "cursor-not-allowed" : ""
              }`}
              disabled={startIndex === 0}
            >
              <FaChevronUp className="text-sm sm:text-xl" />
            </button>
          )}

          <div className="flex flex-col justify-center items-center space-y-2 sm:space-y-3">
            {currentImages
              .slice(startIndex, startIndex + visibleImages)
              .map((image) => (
                <motion.div
                  key={image?.product_image_id}
                  whileHover={{ scale: 1.1 }}
                  className="border-2 border-gray-300 rounded-lg shadow-md"
                >
                  <img
                    src={image?.image_url || unavailableImage}
                    onClick={() => handleImageClick(image.image_url)}
                    loading="lazy"
                    alt={image.product_image_id}
                    className="w-[40px] h-[40px] sm:w-[87px] sm:h-[86px] object-cover rounded-md cursor-pointer"
                  />
                </motion.div>
              ))}
          </div>

          {currentImages.length > visibleImages && (
            <button
              onClick={handleNext}
              className={`py-[2px] w-[50px] sm:w-[87px] flex justify-center border text-gray-800 text-center font-semibold rounded-lg transition-all transform hover:bg-gray-300 hover:scale-105 duration-200 ease-in-out ${
                startIndex + visibleImages >= currentImages.length
                  ? "cursor-not-allowed"
                  : ""
              }`}
              disabled={startIndex + visibleImages >= currentImages.length}
            >
              <FaChevronDown className="text-sm sm:text-xl" />
            </button>
          )}
        </div>
      </div>
      {showDrawer && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end"
          onClick={handleShowDrawer}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="w-full sm:w-[400px] md:w-[450px] lg:w-[470px] dark:bg-white bg-base-200 shadow-lg h-full overflow-y-auto max-h-full relative"
            onClick={(e) => e.stopPropagation()}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <ShoppingCart handleShowDrawer={handleShowDrawer} />
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default ProductImageGallery;
