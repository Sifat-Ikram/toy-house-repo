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
  const [currentImages, setCurrentImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState();
  const [currentPrice, setCurrentPrice] = useState("");
  const [basePrice, setBasePrice] = useState("");
  const [selectedColor, setSelectedColor] = useState();
  const [inventoryId, setInventoryId] = useState("");
  const [currentDiscountPercent, setCurrentDiscountPercent] = useState();
  const [expandedSections, setExpandedSections] = useState({});
  const [currentQuantity, setCurrentQuantity] = useState();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (selectedProduct?.product_inventory?.length > 0) {
      const defaultInventory = selectedProduct.product_inventory[0];
      setSelectedColor(defaultInventory?.color);
      setInventoryId(defaultInventory?.product_inventory_id);
      setCurrentImages(defaultInventory?.product_images);
      setCurrentPrice(defaultInventory?.selling_price);
      setBasePrice(defaultInventory.base_price);
      setCurrentQuantity(defaultInventory?.quantity);
      setCurrentDiscountPercent(defaultInventory?.discount_percent);
      setSelectedImage(
        defaultInventory.product_images[0]?.image_url || unavailableImage
      );
    }
  }, [selectedProduct]);

  if (!selectedProduct) {
    return <span className="loading loading-ring loading-lg"></span>;
  }

  // Handle color selection
  const handleColorClick = (inventory) => {
    setInventoryId(inventory?.product_inventory_id);
    setCurrentImages(inventory.product_images);
    setCurrentPrice(inventory.selling_price);
    setBasePrice(inventory.base_price);
    setCurrentDiscountPercent(inventory.discount_percent);
    setCurrentQuantity(inventory?.quantity);
    setSelectedImage(
      inventory.product_images[0]?.image_url || unavailableImage
    );
  };

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const toggleCollapse = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section], // Toggle specific section
    }));
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
                handleImageClick={handleImageClick}
                currentQuantity={currentQuantity}
              />
            </div>
            <div className="w-full lg:flex-1 flex flex-col space-y-8 justify-between">
              <div className="flex flex-col space-y-1">
                <h1 className="text-lg sm:text-xl font-inter md:text-3xl lg:text-4xl font-medium leading-tight">
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
                          className={`text-lg ${
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
              <div className="flex flex-col space-y-5">
                <div className="flex sm:items-center space-x-2 rounded-full py-1 w-fit">
                  <h1 className="text-xs sm:text-sm md:text-base lg:text-lg font-normal font-roboto">
                    Colors:{" "}
                  </h1>
                  <div className="flex max-sm:flex-wrap items-center gap-3">
                    {selectedProduct?.product_inventory?.map((color) => (
                      <div
                        key={color.product_inventory_id}
                        className={`cursor-pointer items-center gap-1 px-2 sm:px-3 lg:px-4 py-[2px] sm:py-[6px] lg:py-2 border-solid border-[1px] rounded-full shadow-sm ${
                          selectedColor === color.color
                            ? "bg-gray-400 dark:bg-gray-400 dark:text-white"
                            : "dark:bg-white"
                        }`}
                        onClick={() => {
                          handleColorClick(color);
                          setSelectedColor(color.color);
                        }}
                      >
                        <h1 className="text-[9px] sm:text-sm font-medium font-roboto">
                          {color?.color}
                        </h1>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  {currentQuantity === 0 ? (
                    <h1 className="text-base font-normal text-red-500 font-roboto">
                      Out of stock
                    </h1>
                  ) : (
                    <h1 className="text-base font-normal text-green-500 font-roboto">
                      {currentQuantity} items are available
                    </h1>
                  )}
                </div>
              </div>
              <div className="flex flex-col space-y-4">
                <div className="flex flex-col font-roboto">
                  <h1 className="text-lg sm:text-2xl lg:text-5xl font-normal text-[#90BE32]">
                    BDT {currentPrice}
                  </h1>
                  <div className="flex items-center gap-3 text-[15.27px] text-gray-500">
                    <p className="line-through font-normal">{basePrice}</p>
                    <p className="font-bold">{currentDiscountPercent}% OFF</p>
                  </div>
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
                      <h1 className="">There is no Highlights</h1>
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
                        <p className="">
                          <span className="font-normal">Height:</span>{" "}
                          {dim.height} {dim.dimension_unit}
                        </p>
                        <p className="">
                          <span className="font-normal">Width:</span>{" "}
                          {dim.width} {dim.dimension_unit}
                        </p>
                        <p className="">
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
                      className="py-3 flex justify-between items-center cursor-pointer select-none"
                      onClick={() => toggleCollapse(id)}
                    >
                      <span className="font-normal font-roboto text-base">
                        {title}
                      </span>
                      <span
                        className={`text-[#3E3E3E] text-sm transition-transform duration-1000 ease-in-out ${
                          expandedSections[id] ? "rotate-180" : "rotate-0"
                        }`}
                      >
                        {expandedSections[id] ? "−" : "+"}
                      </span>
                    </div>
                    <div
                      className={`overflow-hidden transition-all duration-1000 ease-in-out ${
                        expandedSections[id]
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
          <div className="w-full space-y-3 p-5 flex flex-col bg-base-200 min-h-[200px] dark:text-black dark:bg-white">
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
          <SimilarProduct id={selectedProduct?.category?.category_id} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
