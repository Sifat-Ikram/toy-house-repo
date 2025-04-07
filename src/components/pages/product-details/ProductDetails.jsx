import { useState } from "react";
import { useEffect } from "react";
import CustomerReviews from "./CustomerReviews";
import { Link, useParams } from "react-router-dom";
import unavailableImage from "../../../assets/logo/No_image.svg";
import useProducts from "../../hooks/useProducts";
import ProductDescription from "./ProductDescription";
import ProductImageGallery from "./ProductImageGallery";
import SimilarProduct from "./SimilarProduct";

const ProductDetails = () => {
  const { id } = useParams();
  const { selectedProduct } = useProducts({ id });
  const [currentImages, setCurrentImages] = useState(
    selectedProduct?.product_inventory?.[0]?.product_images || []
  );
  const [currentVideos, setCurrentVideos] = useState([]);
  const [selectedImage, setSelectedImage] = useState(unavailableImage);
  const [selectedVideos, setSelectedVideos] = useState(unavailableImage);
  const [currentPrice, setCurrentPrice] = useState("");
  const [basePrice, setBasePrice] = useState("");
  const [selectedColor, setSelectedColor] = useState();
  const [inventoryId, setInventoryId] = useState("");
  const [currentDiscountPercent, setCurrentDiscountPercent] = useState();
  const [expandedSection, setExpandedSection] = useState("summery");
  const [currentQuantity, setCurrentQuantity] = useState();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Set the default color when the page loads (first color in the list)
  useEffect(() => {
    if (!selectedProduct || !selectedProduct.product_inventory) return;
    const firstInventory = selectedProduct.product_inventory[0];
    if (!firstInventory) return;
    
    setSelectedColor(firstInventory?.color || "");
    setInventoryId(firstInventory?.product_inventory_id || "");
    setCurrentImages(firstInventory?.product_images || []);
    setCurrentVideos(firstInventory?.product_videos || []);
    setCurrentPrice(firstInventory?.selling_price || 0);
    setBasePrice(firstInventory?.base_price || 0);
    setCurrentQuantity(firstInventory?.quantity || 0);
    setCurrentDiscountPercent(firstInventory?.discount_percent || 0);
    setSelectedImage(
      firstInventory?.product_images?.[0]?.image_url || unavailableImage
    );
    setSelectedVideos(
      firstInventory?.product_videos?.[0]?.video_url || unavailableImage
    );
  }, [selectedProduct]);

  const handleColorClick = (inventory) => {
    setInventoryId(inventory?.product_inventory_id);
    setCurrentImages(inventory.product_images);
    setCurrentVideos(inventory?.product_videos);
    setCurrentPrice(inventory.selling_price);
    setBasePrice(inventory.base_price);
    setCurrentDiscountPercent(inventory.discount_percent);
    setCurrentQuantity(inventory?.quantity);
    setSelectedImage(
      inventory.product_images[0]?.image_url || unavailableImage
    );
    setSelectedVideos(
      inventory?.product_videos[0]?.video_url || unavailableImage
    );
    setSelectedColor(inventory.color);
  };

  if (!selectedProduct) {
    return <span className="loading loading-ring loading-lg"></span>;
  }

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };
  const handleVideoClick = (videoUrl) => {
    setSelectedVideos(videoUrl);
  };

  const toggleCollapse = (section) => {
    setExpandedSection((prev) => (prev === section ? null : section)); // Close if already open, otherwise open new section
  };

  return (
    <div className="min-h-screen bg-white text-[#3E3E3E] dark:text-[#3E3E3E]">
      <div className="space-y-20">
        <div className="space-y-5">
          <div className="w-11/12 mx-auto breadcrumbs overflow-hidden text-[10px] sm:text-xs md:text-sm">
            <ul>
              <li>
                <Link to={"/"}>Home</Link>
              </li>
              <li>
                <Link
                  to={`/categoryDetail/${selectedProduct?.category?.category_id}`}
                >
                  {selectedProduct?.category?.name}
                </Link>
              </li>
              <li>{selectedProduct?.product_name || "Product Name"}</li>
            </ul>
          </div>
          <div className="w-11/12 mx-auto flex flex-col max-lg:items-center max-lg:space-y-8 lg:flex-row lg:gap-x-16 lg:justify-between">
            <div className="w-full lg:w-1/2">
              <ProductImageGallery
                id={inventoryId}
                currentImages={currentImages}
                selectedImage={selectedImage}
                currentVideos={currentVideos}
                selectedVideos={selectedVideos}
                handleImageClick={handleImageClick}
                handleVideoClick={handleVideoClick}
                currentQuantity={currentQuantity}
                sku={selectedProduct.sku}
              />
            </div>
            <div className="w-full lg:flex-1 flex flex-col space-y-3 md:space-y-4">
              <div className="flex flex-col">
                <h1 className="text-lg sm:text-xl font-inter md:text-2xl lg:text-3xl font-medium">
                  {selectedProduct?.product_name || "Product Name"}
                </h1>
                <div className="flex flex-col space-y-1">
                  <div className="flex flex-wrap font-roboto text-[#959595] gap-2 items-center text-xs font-normal">
                    <p>
                      {selectedProduct?.return_and_refund_policy || 0} days easy
                      return
                    </p>
                    <span>|</span>
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span
                          key={star}
                          className={`text-base ${
                            selectedProduct.review >= star
                              ? "text-yellow-500"
                              : "text-gray-400"
                          }`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col space-y-[6px]">
                <div className="flex space-x-2 rounded-full py-1 w-fit">
                  <h1 className="text-xs sm:text-sm md:text-base lg:text-lg font-normal font-roboto">
                    Colors:{" "}
                  </h1>
                  <div className="flex flex-wrap items-center gap-2">
                    {selectedProduct?.product_inventory?.map((color) => (
                      <div
                        key={color.product_inventory_id}
                        className={`cursor-pointer text-[10px] sm:text-xs md:text-sm font-poppins font-normal gap-1 px-2 sm:px-3 lg:px-4 py-[2px] border border-solid rounded-full shadow-sm ${
                          selectedColor === color.color
                            ? "bg-gray-100 dark:bg-gray-100 dark:text-gray-800 text-gray-800"
                            : "dark:bg-white"
                        }`}
                        onClick={() => {
                          handleColorClick(color);
                          setSelectedColor(color.color);
                        }}
                      >
                        <h1 className="text-[8px] sm:text-xs font-medium font-roboto">
                          {color?.color}
                        </h1>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  {currentQuantity === 0 ? (
                    <h1 className="text-sm font-normal text-red-500 font-roboto">
                      Out of stock
                    </h1>
                  ) : (
                    <h1 className="text-sm font-normal text-green-500 font-roboto">
                      {currentQuantity} items are available
                    </h1>
                  )}
                </div>
              </div>

              <div className="flex flex-col font-roboto">
                <h1 className="text-lg sm:text-xl lg:text-3xl font-roboto mt-1 text-[#90BE32]">
                  BDT {currentPrice}
                </h1>
                <div className="flex items-center gap-2 mb-1 text-sm text-gray-500">
                  {basePrice && (
                    <p className="line-through font-normal">{basePrice}</p>
                  )}
                  {currentDiscountPercent && (
                    <p className="font-bold">{currentDiscountPercent}% OFF</p>
                  )}
                </div>
              </div>

              <div className="w-full md:w-4/5 sm:w-1/2 flex flex-col">
                {[
                  {
                    id: "summery",
                    title: "Highlights",
                    content: selectedProduct?.summary ? (
                      <ProductDescription
                        description={selectedProduct?.summary}
                      />
                    ) : (
                      <h1>There is no Highlights</h1>
                    ),
                  },
                  {
                    id: "dimension",
                    title: "Dimension",
                    content: selectedProduct?.dimensions?.map((dim) => (
                      <div
                        key={dim?.dimension_id}
                        className="transition-all duration-300"
                      >
                        <p>
                          <span className="font-normal">Height:</span>{" "}
                          {dim.height} {dim.dimension_unit}
                        </p>
                        <p>
                          <span className="font-normal">Width:</span>{" "}
                          {dim.width} {dim.dimension_unit}
                        </p>
                        <p>
                          <span className="font-normal">Depth:</span>{" "}
                          {dim.depth} {dim.dimension_unit}
                        </p>
                      </div>
                    )),
                  },
                  {
                    id: "inTheBox",
                    title: "In The Box",
                    content: (
                      <ProductDescription
                        description={selectedProduct?.in_the_box}
                      />
                    ),
                  },
                ].map(({ id, title, content }) => (
                  <div key={id} className="border-gray-300 border-y">
                    <div
                      className="py-2 flex justify-between items-center cursor-pointer select-none"
                      onClick={() => toggleCollapse(id)}
                    >
                      <span className="font-normal font-roboto text-sm">
                        {title}
                      </span>
                      <span
                        className={`text-[#3E3E3E] text-sm transition-transform duration-300 ease-in-out transform ${
                          expandedSection === id ? "rotate-180" : "rotate-0"
                        }`}
                      >
                        {expandedSection === id ? "−" : "+"}
                      </span>
                    </div>
                    <div
                      className={`overflow-hidden transition-all duration-500 ease-in-out ${
                        expandedSection === id
                          ? "max-h-[500px] opacity-100 py-2"
                          : "max-h-0 opacity-0 py-0"
                      }`}
                    >
                      {content}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="w-11/12 mx-auto flex flex-col justify-center items-center shadow border rounded-3xl">
          <h1 className="text-lg sm:text-xl md:text-3xl font-poppins uppercase py-3 sm:py-4 md:py-5 w-full font-medium sm:font-semibold text-center">
            Product Details
          </h1>
          <div className="w-full space-y-3 p-5 flex flex-col bg-base-200 min-h-[200px] rounded-b-3xl dark:text-black dark:bg-white">
            {selectedProduct?.product_description ? (
              <ProductDescription
                description={selectedProduct?.product_description}
              />
            ) : (
              <h1 className="font-roboto text-xl font-semibold text-center">
                There is no description
              </h1>
            )}
          </div>
        </div>

        <div className="flex flex-col justify-center items-center w-full">
          <h1 className="text-lg sm:text-xl md:text-3xl font-poppins uppercase mb-4 py-3 sm:py-4 md:py-5 w-full font-medium sm:font-semibold text-center">
            Customer Reviews
          </h1>
          <CustomerReviews productId={id} />
        </div>
        <div className="w-full bg-white dark:bg-white">
          <SimilarProduct
            id={selectedProduct?.category?.category_id}
            productId={id}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
