import { useState } from "react";
import Rating from "react-rating";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import useProduct from "../../hooks/useProduct";

const AllProducts = () => {
  const [product] = useProduct();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedAge, setSelectedAge] = useState("");
  const [selectedFeatures, setSelectedFeatures] = useState("");
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [voucherCode, setVoucherCode] = useState("");
  const [voucherError, setVoucherError] = useState("");
  const [isVoucherApplied, setIsVoucherApplied] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [filtersVisible, setFiltersVisible] = useState(true);
  const [filtersNotVisible, setFiltersNotVisible] = useState(false);
  const [sortOrder, setSortOrder] = useState("");

  const productsPerPage = 12;

  if (!product.length) {
    return <p className="text-center text-red-500">Product not found</p>;
  }

  const filteredProducts = product
    .filter(
      (prod) =>
        (selectedBrand === "" || prod?.brand === selectedBrand) &&
        (selectedAge === "" || prod?.age === selectedAge) &&
        (selectedFeatures === "" || prod?.features === selectedFeatures) &&
        prod.price >= priceRange[0] &&
        prod.price <= priceRange[1] &&
        prod.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === "highToLow") return b.price - a.price;
      if (sortOrder === "lowToHigh") return a.price - b.price;
      return 0;
    });

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const openDrawer = (item) => {
    setSelectedProduct(item);
    document.getElementById("drawer-toggle").checked = true;
  };

  const handleQuantityChange = (event) => {
    const newQuantity = Math.max(1, Number(event.target.value));
    setQuantity(newQuantity);
  };

  const applyVoucher = () => {
    if (voucherCode === "DISCOUNT100") {
      setIsVoucherApplied(true);
    } else {
      setVoucherError("Invalid voucher code");
    }
  };

  const handleOutsideClick = (e) => {
    if (e.target.id === "overlay") {
      setFiltersNotVisible(false);
    }
  };

  const getTotalPrice = () => {
    const basePrice = selectedProduct.price * quantity;
    return isVoucherApplied ? basePrice - 100 : basePrice;
  };

  return (
    <div>
      <div className="drawer drawer-end">
        <input id="drawer-toggle" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <div className="mt-10 px-2 sm:px-6 md:px-10 lg:px-20">
            <motion.h2
              className="text-xl md:text-2xl lg:text-4xl font-bold text-center mb-5 tracking-wider"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Explore Our Product Collection
            </motion.h2>

            <motion.p
              className="text-center text-gray-700 text-sm md:text-lg lg:text-xl max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              Discover the best products that we have to offer. Our collection
              is curated to provide you with only the finest options.
            </motion.p>
          </div>
          <div className="w-full max-sm:px-2 sm:w-11/12 mx-auto flex flex-wrap justify-between items-center my-3 px-4 py-2 bg-gray-50 rounded-lg">
            {/* Filters Toggle Button */}
            <div
              onClick={() => setFiltersVisible(!filtersVisible)}
              className="hidden sm:block text-base sm:text-lg md:text-xl font-semibold text-gray-800 hover:text-gray-600 px-4 py-2 cursor-pointer rounded-lg transition-transform duration-300"
            >
              {filtersVisible ? "Hide Filters" : "Show Filters"}
            </div>

            {/* Filters Toggle Button fot mobile */}
            <div
              onClick={() => setFiltersNotVisible(!filtersNotVisible)}
              className="block sm:hidden text-base sm:text-lg md:text-xl font-semibold text-gray-800 hover:text-gray-600 px-4 py-2 cursor-pointer rounded-lg transition-transform duration-300"
            >
              {!filtersNotVisible ? "Show Filters" : "Hide Filters"}
            </div>

            {filtersNotVisible && (
              <div
                id="overlay"
                onClick={handleOutsideClick}
                className="fixed inset-0 bg-black bg-opacity-50 z-30"
              ></div>
            )}

            {/* Filter Drawer */}
            <div
              className={`fixed top-0 left-0 h-full bg-white shadow-lg z-40 transform ${
                filtersNotVisible ? "translate-x-0" : "-translate-x-full"
              } transition-transform duration-300 ease-in-out`}
              style={{ width: "250px" }}
            >
              <h1
                onClick={() => setFiltersNotVisible(false)}
                className="absolute top-4 right-4"
              >
                Close
              </h1>
              <div className="flex flex-col bg-base-100 w-full sm:w-40 lg:w-[260px] mt-10 py-6 space-y-4 px-3 md:px-5 lg:shadow-lg rounded-3xl">
                {/* Search */}
                <div>
                  <input
                    type="text"
                    placeholder="Search product..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full border border-gray-400 p-2 rounded text-sm sm:text-base placeholder-gray-400"
                  />
                </div>

                {/* Brand filter */}
                <div>
                  <label className="block text-sm sm:text-base font-medium mb-2">
                    Brand
                  </label>
                  <select
                    className="w-full border p-2 rounded text-sm sm:text-base"
                    value={selectedBrand}
                    onChange={(e) => setSelectedBrand(e.target.value)}
                  >
                    <option value="">All Brands</option>
                    {[...new Set(product.map((prod) => prod.brand))].map(
                      (brand) => (
                        <option key={brand} value={brand}>
                          {brand}
                        </option>
                      )
                    )}
                  </select>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-xs sm:text-sm md:text-base lg:text-lg font-medium mb-2">
                    Price Range
                  </label>
                  <div className="space-y-3">
                    {/* Price Range Options */}
                    {[
                      { label: "0 - 500", value: [0, 500] },
                      { label: "500 - 2000", value: [500, 2000] },
                      { label: "2000 - 5000", value: [2000, 5000] },
                      { label: "5000 - 10000", value: [5000, 10000] },
                      { label: "10000 - 15000", value: [10000, 15000] },
                      { label: "15000+", value: [15000, Infinity] },
                    ].map(({ label, value }) => (
                      <label
                        key={label}
                        className="flex items-center space-x-3 cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="priceRange"
                          value={value}
                          checked={
                            priceRange[0] === value[0] &&
                            priceRange[1] === value[1]
                          }
                          onChange={() => setPriceRange(value)}
                          className="radio radio-sm"
                        />
                        <span className="text-xs sm:text-sm lg:text-base">
                          BDT {label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Age Group filter */}
                <div>
                  <label className="block text-xs sm:text-sm md:text-base lg:text-lg font-medium mb-2">
                    Age Group
                  </label>
                  <div className="space-y-3">
                    {/* Price Range Options */}
                    {["1-2", "3-5", "6-11", "12+"].map((age) => (
                      <label
                        key={age}
                        className="flex items-center space-x-3 cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="age"
                          value={age}
                          checked={selectedAge === age}
                          onChange={(e) => setSelectedAge(e.target.value)}
                          className="radio radio-sm"
                        />
                        <span className="text-xs sm:text-sm lg:text-base text-gray-700">
                          {age} years
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Features filter */}
                <div>
                  <label className="block text-xs sm:text-sm md:text-base lg:text-lg font-medium mb-2">
                    Features
                  </label>
                  <div className="space-y-3">
                    {/* Price Range Options */}
                    {[
                      "educational",
                      "interactive",
                      "battery-operated",
                      "buildable",
                    ].map((features) => (
                      <label
                        key={features}
                        className="flex items-center space-x-3 cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="features"
                          value={features}
                          checked={selectedFeatures === features}
                          onChange={(e) => setSelectedFeatures(e.target.value)}
                          className="radio radio-sm"
                        />
                        <span className="text-xs sm:text-sm md:text-base text-gray-700">
                          {features} years
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Sort By Section */}
            <div className="flex items-center gap-2 sm:gap-3">
              <h1 className="text-base sm:text-lg md:text-xl font-semibold text-gray-700">
                SORT BY:
              </h1>
              <select
                className="p-2 sm:p-2.5 md:p-3 rounded-lg bg-gray-100 border border-gray-200 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-gray-300"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="" className="text-gray-700">
                  Featured
                </option>
                <option value="highToLow" className="text-gray-700">
                  High to Low
                </option>
                <option value="lowToHigh" className="text-gray-700">
                  Low to High
                </option>
              </select>
            </div>
          </div>

          <div className="flex justify-center bg-[#78E3FD] gap-1 sm:gap-3 md:gap-5 py-5 px-1 md:px-3 lg:px-5">
            {filtersVisible && (
              <div className="hidden sm:flex flex-col bg-base-100 w-full sm:w-40 lg:w-[260px] py-6 space-y-4 px-3 md:px-5 lg:shadow-lg rounded-3xl">
                {/* Search */}
                <div>
                  <input
                    type="text"
                    placeholder="Search product..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full border border-gray-400 p-2 rounded text-sm sm:text-base placeholder-gray-400"
                  />
                </div>

                {/* Brand filter */}
                <div>
                  <label className="block text-sm sm:text-base font-medium mb-2">
                    Brand
                  </label>
                  <select
                    className="w-full border p-2 rounded text-sm sm:text-base"
                    value={selectedBrand}
                    onChange={(e) => setSelectedBrand(e.target.value)}
                  >
                    <option value="">All Brands</option>
                    {[...new Set(product.map((prod) => prod.brand))].map(
                      (brand) => (
                        <option key={brand} value={brand}>
                          {brand}
                        </option>
                      )
                    )}
                  </select>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-xs sm:text-sm md:text-base lg:text-lg font-medium mb-2">
                    Price Range
                  </label>
                  <div className="space-y-3">
                    {/* Price Range Options */}
                    {[
                      { label: "0 - 500", value: [0, 500] },
                      { label: "500 - 2000", value: [500, 2000] },
                      { label: "2000 - 5000", value: [2000, 5000] },
                      { label: "5000 - 10000", value: [5000, 10000] },
                      { label: "10000 - 15000", value: [10000, 15000] },
                      { label: "15000+", value: [15000, Infinity] },
                    ].map(({ label, value }) => (
                      <label
                        key={label}
                        className="flex items-center space-x-3 cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="priceRange"
                          value={value}
                          checked={
                            priceRange[0] === value[0] &&
                            priceRange[1] === value[1]
                          }
                          onChange={() => setPriceRange(value)}
                          className="radio radio-sm"
                        />
                        <span className="text-xs sm:text-sm lg:text-base">
                          BDT {label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Age Group filter */}
                <div>
                  <label className="block text-xs sm:text-sm md:text-base lg:text-lg font-medium mb-2">
                    Age Group
                  </label>
                  <div className="space-y-3">
                    {/* Price Range Options */}
                    {["1-2", "3-5", "6-11", "12+"].map((age) => (
                      <label
                        key={age}
                        className="flex items-center space-x-3 cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="age"
                          value={age}
                          checked={selectedAge === age}
                          onChange={(e) => setSelectedAge(e.target.value)}
                          className="radio radio-sm"
                        />
                        <span className="text-xs sm:text-sm lg:text-base text-gray-700">
                          {age} years
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Features filter */}
                <div>
                  <label className="block text-xs sm:text-sm md:text-base lg:text-lg font-medium mb-2">
                    Features
                  </label>
                  <div className="space-y-3">
                    {/* Price Range Options */}
                    {[
                      "educational",
                      "interactive",
                      "battery-operated",
                      "buildable",
                    ].map((features) => (
                      <label
                        key={features}
                        className="flex items-center space-x-3 cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="features"
                          value={features}
                          checked={selectedFeatures === features}
                          onChange={(e) => setSelectedFeatures(e.target.value)}
                          className="radio radio-sm"
                        />
                        <span className="text-xs sm:text-sm md:text-base text-gray-700">
                          {features} years
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}
            <div className="flex-1 w-11/12 mx-auto">
              <div className="grid grid-cols-2 gap-1 sm:gap-3 lg:gap-5 md:grid-cols-3 lg:grid-cols-4">
                {currentProducts.length ? (
                  currentProducts.map((item) => (
                    <div
                      key={item._id}
                      className="rounded-3xl bg-white p-4 lg:p-5 shadow-md overflow-hidden transition-transform duration-200 hover:shadow-lg group"
                      onClick={() => openDrawer(item)}
                    >
                      <Link to={`/productDetail/${item._id}`}>
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-[200px] sm:h-[220px] bg-base-200 rounded-box object-cover rounded-t-lg mb-4 group-hover:scale-110 transition-transform duration-200"
                          loading="lazy"
                        />
                        <div className="flex flex-col">
                          <h3 className="text-base sm:text-lg font-semibold mb-2 text-gray-800 truncate">
                            {item?.name}
                          </h3>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Rating
                              initialRating={item.rating}
                              emptySymbol={
                                <span className="text-[#F9D50D] text-base">
                                  ☆
                                </span>
                              }
                              fullSymbol={
                                <span className="text-[#F9D50D] text-base">
                                  ★
                                </span>
                              }
                              readonly
                            />
                            <p className="text-sm sm:text-base text-[#757575]">
                              {item?.sell || "444"} sold
                            </p>
                          </div>
                          <p className="text-sm sm:text-base font-bold leading-snug mt-2">
                            BDT{" "}
                            <span className="text-xl sm:text-[27px]">
                              {Math.floor(item.price)}
                            </span>
                            {item.price % 1 !== 0 && (
                              <span>
                                .{(item.price % 1).toFixed(2).split(".")[1]}
                              </span>
                            )}
                            {item.price % 1 === 0 && <span>.0</span>}
                          </p>
                        </div>
                      </Link>
                    </div>
                  ))
                ) : (
                  <div className="flex justify-center">
                    <h1 className="text-center text-white font-bold text-3xl">
                      No products available
                    </h1>
                  </div>
                )}
              </div>
              <div className="flex justify-between mt-5 max-sm:mb-5 px-2 sm:px-5 md:px-7 lg:px-10">
                <button
                  onClick={handlePrevPage}
                  className="bg-[#03b4f6] text-white rounded-md font-semibold px-1 sm:px-2 md:px-3 lg:px-5 py-1 sm:py-3"
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                <span>
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={handleNextPage}
                  className="bg-[#03b4f6] text-white rounded-md font-semibold px-1 sm:px-2 md:px-3 lg:px-5 py-1 sm:py-3"
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Drawer Sidebar */}
        <div className="drawer-side">
          <label
            htmlFor="drawer-toggle"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <div className="menu bg-base-100 text-base-content min-h-full w-80 p-4 mt-20">
            {selectedProduct && (
              <>
                <div className="border-b pb-3 mb-3">
                  <h2 className="font-bold text-xl mb-1">
                    {selectedProduct.name}
                  </h2>
                  <p className="text-sm text-gray-600">
                    Category: {selectedProduct.category}
                  </p>
                </div>

                <div className="mb-3">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
                    <label className="text-sm font-medium">Quantity:</label>
                    <input
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={handleQuantityChange}
                      className="w-full sm:w-16 p-1 border border-gray-300 rounded mt-2 sm:mt-0"
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
                    <label className="text-sm font-medium">Voucher Code:</label>
                    <input
                      type="text"
                      value={voucherCode}
                      onChange={(e) => setVoucherCode(e.target.value)}
                      className="w-full sm:w-32 p-1 border border-gray-300 rounded mt-2 sm:mt-0"
                    />
                  </div>
                  <button
                    onClick={applyVoucher}
                    className="mt-2 btn bg-black hover:bg-black text-white w-full"
                  >
                    Apply Voucher
                  </button>
                  {voucherError && (
                    <p className="text-red-500 text-sm">{voucherError}</p>
                  )}
                </div>

                <div className="mb-3">
                  <p className="font-semibold">
                    Total Price: {getTotalPrice()} BDT
                  </p>
                </div>

                <div className="mt-3">
                  <h3 className="text-lg font-medium mb-2">Payment Method</h3>
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-center items-center gap-1">
                      <button
                        onClick={() => setPaymentMethod("card")}
                        className={`btn w-1/4 ${
                          paymentMethod === "card"
                            ? "bg-black hover:bg-black text-white"
                            : "bg-gray-200"
                        }`}
                      >
                        Card
                      </button>
                      <button
                        onClick={() => setPaymentMethod("card")}
                        className={`btn w-1/4 ${
                          paymentMethod === "card"
                            ? "bg-black hover:bg-black text-white"
                            : "bg-gray-200"
                        }`}
                      >
                        Bkash
                      </button>
                      <button
                        onClick={() => setPaymentMethod("card")}
                        className={`btn w-1/4 ${
                          paymentMethod === "card"
                            ? "bg-black hover:bg-black text-white"
                            : "bg-gray-200"
                        }`}
                      >
                        Rocket
                      </button>
                    </div>
                    <h1 className="text-center text-xl font-semibold">or</h1>
                    <button
                      onClick={() => setPaymentMethod("cash")}
                      className="btn bg-black hover:bg-black text-white"
                    >
                      Cash on Delivery
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
