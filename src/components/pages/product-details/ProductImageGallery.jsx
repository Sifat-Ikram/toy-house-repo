import { useContext, useEffect, useState } from "react";
import ProductImageZoom from "./ProductImageZoom";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import ShoppingCart from "../cart/ShoppingCart";
import { AuthContext } from "../../../provider/AuthProvider";
import useCart from "../../hooks/useCart";
import { motion } from "framer-motion";

const ProductImageGallery = ({
  currentImages,
  currentVideos,
  currentQuantity,
  id,
  sku,
}) => {
  const visibleItems = 5;
  const axiosPublic = useAxiosPublic();
  const [startIndex, setStartIndex] = useState(0);
  const [showDrawer, setShowDrawer] = useState(false);
  const [loading, setLoading] = useState(false);
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

  // Set default selected image and video
  const [currentSelectedImage, setCurrentSelectedImage] = useState(
    currentImages.length > 0 ? currentImages[0].image_url : ""
  );

  const [currentSelectedVideo, setCurrentSelectedVideo] = useState(
    currentVideos.length > 0 ? currentVideos[0].video_url : ""
  );

  useEffect(() => {
    if (currentImages.length > 0) {
      setCurrentSelectedImage(currentImages[0].image_url);
    }
  }, [currentImages]);

  const handleNext = () => {
    if (
      startIndex + visibleItems <
      currentImages.length + currentVideos.length
    ) {
      setStartIndex(startIndex + 1);
    }
  };

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
      setLoading(true);
      const formattedData = {
        items:
          Array.isArray(cart?.items) && cart.items.length > 0
            ? [
                ...cart.items.map((item) => ({
                  product_inventory_id: Number(item.inventory_id),
                  quantity: Number(item.quantity),
                })),
                {
                  product_inventory_id: Number(id), // Assuming `id` is defined elsewhere
                  quantity: 1,
                },
              ]
            : [
                {
                  product_inventory_id: Number(id), // Assuming `id` is defined elsewhere
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
        setLoading(false);
      } catch (error) {
        console.error("Error adding product to cart:", error);
      }
    } else {
      const existingCartArray = JSON.parse(
        localStorage.getItem("cart") || "[]"
      );

      if (existingCartArray.length === 0) {
        setLoading(true);
        const formattedData = {
          items: [
            {
              product_inventory_id: Number(id),
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
            setLoading(false);
            const responseData = response?.data;
            const updatedCart = [responseData];
            localStorage.setItem("cart", JSON.stringify(updatedCart));

            Swal.fire({
              icon: "success",
              title: "Added to Cart",
              text: `${responseData.items[0].product_name?.slice(
                0,
                15
              )} has been added to your cart.`,
              toast: true,
              position: "top-start",
              showConfirmButton: false,
              timer: 2500,
              timerProgressBar: true,
            });
          }
        } catch (error) {
          console.error("Error adding product to cart:", error);
        }
      } else {
        // Check if any item in the cart has the same SKU
        const matchSku = existingCartArray?.some((cart) =>
          cart?.items?.some((item) => item.inventory_id === id)
        );

        if (matchSku) {
          Swal.fire({
            icon: "error",
            title: "Product already here!",
            text: "This product is already in the cart",
            confirmButtonText: "OK",
          });
          return;
        } else {
          setLoading(true);
          const formattedData = {
            items: [
              ...(Array.isArray(existingCartArray) &&
              existingCartArray.length > 0
                ? existingCartArray.flatMap((cart) =>
                    Array.isArray(cart.items)
                      ? cart.items.map((item) => ({
                          product_inventory_id: Number(item.inventory_id),
                          quantity: item.quantity,
                        }))
                      : []
                  )
                : []),
              {
                product_inventory_id: Number(id),
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
              setLoading(false);
              const responseData = response?.data;

              const updatedCart = [responseData];
              localStorage.setItem("cart", JSON.stringify(updatedCart));
              Swal.fire({
                icon: "success",
                title: "Added to Cart",
                text: `${responseData.items[0].product_name?.slice(
                  0,
                  15
                )} has been added to your cart.`,
                toast: true,
                position: "top-start",
                showConfirmButton: false,
                timer: 2500,
                timerProgressBar: true,
              });
            }
          } catch (error) {
            console.error("Error adding product to cart:", error);
          }
        }
      }
    }
    handleShowDrawer(true);
  };

  const handleImageThumbnailClick = (imageUrl) => {
    setCurrentSelectedImage(imageUrl);
    setCurrentSelectedVideo(""); // Clear video selection
  };

  const handleVideoThumbnailClick = (videoUrl) => {
    setCurrentSelectedVideo(videoUrl); // Set the selected video URL
    setCurrentSelectedImage(""); // Clear image selection
  };

  return (
    <div>
      <div className="flex flex-row-reverse justify-evenly lg:items-center">
        {/* Main Product Image and Add to Cart */}
        <div className="w-3/4 sm:w-[380px] md:w-[430px] space-y-3">
          {currentSelectedVideo || currentSelectedImage ? (
            <ProductImageZoom
              selectedImage={currentSelectedImage}
              selectedVideo={currentSelectedVideo}
            />
          ) : (
            <div className="flex justify-center h-[430px] items-center">
              <h1 className="text-lg font-semibold text-gray-500">
                No images or videos available
              </h1>
            </div>
          )}

          <button
            onClick={() => handleAddToCart()}
            className="text-center w-full px-6 py-[6px] md:py-3 bg-[#317ff3] hover:bg-[#31b2f3] text-base md:text-lg font-semibold text-white shadow-lg transition-all transform hover:scale-105 cursor-pointer rounded-lg"
          >
            {loading ? "Adding to Cart" : "Add To Cart"}
          </button>
        </div>

        {/* Image Thumbnails with Navigation Buttons */}
        <div className="flex flex-col items-center space-y-[6px] sm:space-y-3">
          {currentImages.length + currentVideos.length > visibleItems && (
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
          <div className="space-y-[6px] sm:space-y-3">
            {currentImages
              .slice(startIndex, startIndex + visibleItems)
              .map((image, index) => (
                <img
                  key={index}
                  src={image.image_url}
                  alt="Product Image Thumbnail"
                  className="h-[70px] sm:h-[90px] w-[100px] sm:w-[120px] object-cover border-2 cursor-pointer transition-transform transform hover:scale-110 rounded-lg"
                  onClick={() => handleImageThumbnailClick(image.image_url)}
                />
              ))}

            {currentVideos
              .slice(startIndex, startIndex + visibleItems)
              .map((video, index) => (
                <div
                  key={index}
                  className="h-[70px] sm:h-[90px] w-[120px] cursor-pointer border-2"
                  onClick={() => handleVideoThumbnailClick(video.video_url)}
                >
                  <img
                    src={`https://img.youtube.com/vi/${
                      video.video_url.split("v=")[1]
                    }/0.jpg`}
                    alt="YouTube Thumbnail"
                    className="object-cover h-full w-full rounded-lg transition-transform transform hover:scale-110"
                  />
                </div>
              ))}
          </div>
          {currentImages.length + currentVideos.length > visibleItems && (
            <button
              onClick={handleNext}
              className={`py-[2px] w-[50px] sm:w-[87px] flex justify-center border text-gray-800 text-center font-semibold rounded-lg transition-all transform hover:bg-gray-300 hover:scale-105 duration-200 ease-in-out ${
                startIndex + visibleItems >=
                currentImages.length + currentVideos.length
                  ? "cursor-not-allowed"
                  : ""
              }`}
              disabled={
                startIndex + visibleItems >=
                currentImages.length + currentVideos.length
              }
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
            className="w-4/5 sm:w-[400px] md:w-[450px] lg:w-[470px] bg-base-200 shadow-lg h-full max-h-full relative"
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
