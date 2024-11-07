import { useState } from "react";
import { motion } from "framer-motion";
import useProduct from "../../hooks/useProduct";
import { Link } from "react-router-dom";
import { AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai";

const AllProducts = () => {
  const [product] = useProduct();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("lowToHigh");

  const productsPerPage = 12;

  if (!product.length) {
    return <p className="text-center text-red-500">Product not found</p>;
  }

  // Filter products based on selected brand, price range, and search term
  const filteredProducts = product.filter(
    (prod) =>
      (selectedBrand === "" || prod.brand === selectedBrand) &&
      prod.price >= priceRange[0] &&
      prod.price <= priceRange[1] &&
      prod.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSortToggle = () => {
    setSortOrder((prevOrder) =>
      prevOrder === "lowToHigh" ? "highToLow" : "lowToHigh"
    );
  };

  // Sort products based on selected sort order
  const sortedProducts = filteredProducts.sort((a, b) => {
    if (sortOrder === "lowToHigh") return a.price - b.price;
    return b.price - a.price;
  });

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div>
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
          Discover the best products that we have to offer. Our collection is
          curated to provide you with only the finest options.
        </motion.p>
      </div>

      <div className="w-4/5 mx-auto flex justify-between items-center mt-5">
        <div className="flex space-x-4 lg:ml-80">
          <span
            onClick={handleSortToggle}
            className="cursor-pointer text-[#03b4f6] text-sm sm:text-base md:text-lg transition duration-200 flex items-center"
          >
            {sortOrder === "lowToHigh" ? (
              <AiOutlineArrowUp className="mr-1" />
            ) : (
              <AiOutlineArrowDown className="mr-1" />
            )}
            {sortOrder === "lowToHigh"
              ? "Price"
              : "Price"}
          </span>
        </div>
        <div className="drawer drawer-end w-fit">
          <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content right-0">
            {/* Page content here */}
            <label
              htmlFor="my-drawer-4"
              className="drawer-button cursor-pointer text-[#03b4f6] text-sm sm:text-base md:text-lg transition duration-200"
            >
              Filter
            </label>
          </div>
          <div className="drawer-side">
            <label
              htmlFor="my-drawer-4"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul className="menu bg-white flex flex-col w-72 sm:w-80 p-5 pt-20 shadow-lg rounded-lg min-h-screen">
              <h2 className="text-2xl font-bold mb-4 text-center">Filter</h2>
              {/* Filter Content */}
              <div className="mb-4">
                <label className="block font-medium text-lg mb-2">Search</label>
                <input
                  type="text"
                  placeholder="Search product..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full h-12 border border-gray-300 rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-[#03b4f6] transition duration-200"
                />
              </div>
              <div className="mb-4">
                <label className="block font-medium text-lg mb-2">Brand</label>
                <select
                  className="w-full h-12 border border-gray-300 rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-[#03b4f6] transition duration-200"
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
              <div>
                <label className="block font-medium text-lg mb-2">
                  Price Range
                </label>
                <input
                  type="range"
                  min="0"
                  max="10000"
                  value={priceRange[1]}
                  onChange={(e) =>
                    setPriceRange([priceRange[0], Number(e.target.value)])
                  }
                  className="w-full h-2 bg-gray-300 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-sm mt-2">
                  <span className="font-medium">{priceRange[0]} BDT</span>
                  <span className="font-medium">{priceRange[1]} BDT</span>
                </div>
              </div>
              <div className="bottom-0 flex justify-between items-center mt-10 gap-5">
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedBrand("");
                    setPriceRange([0, 10000]);
                  }}
                  className="btn w-28 bg-gray-300 text-gray-700 hover:bg-gray-400"
                >
                  Reset
                </button>
                <button
                  onClick={() =>
                    (document.getElementById("my-drawer-4").checked = false)
                  }
                  className="btn flex-1 bg-[#03b4f6] text-white hover:bg-[#0293d8]"
                >
                  Done
                </button>
              </div>
            </ul>
          </div>
        </div>
      </div>

      <div className="w-11/12 mx-auto flex justify-center">
        <div className="hidden lg:block w-80 py-8 lg:sticky top-20 h-auto lg:h-screen px-3 sm:px-5 shadow-md lg:shadow">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
            Filter
          </h1>
          {/* Search */}
          <div className="mb-6">
            <label className="block text-base sm:text-lg font-medium mb-2">
              Search
            </label>
            <input
              type="text"
              placeholder="Search product..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border border-gray-400 focus:ring-2 focus:ring-gray-400 p-2 rounded text-sm sm:text-base"
            />
          </div>

          {/* Brand */}
          <div className="mb-6">
            <label className="block text-base sm:text-lg font-medium mb-2">
              Brand
            </label>
            <select
              className="w-full border p-2 rounded text-sm sm:text-base"
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
            >
              <option value="">All Brands</option>
              {[...new Set(product.map((prod) => prod.brand))].map((brand) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range */}
          <div>
            <label className="block text-base sm:text-lg font-medium mb-2">
              Price Range
            </label>
            <input
              type="range"
              min="0"
              max="10000"
              value={priceRange[1]}
              onChange={(e) =>
                setPriceRange([priceRange[0], Number(e.target.value)])
              }
              className="w-full"
            />
            <div className="flex justify-between text-xs sm:text-sm mt-2">
              <span>{priceRange[0]} BDT</span>
              <span>{priceRange[1]} BDT</span>
            </div>
          </div>
        </div>

        <div className="flex-1 mt-2 px-2 sm:px-4">
          <div className="grid grid-cols-2 gap-1 sm:gap-4 md:grid-cols-3 lg:grid-cols-3">
            {currentProducts.map((item) => (
              <div
                key={item._id}
                className="border rounded-lg p-3 sm:p-4 bg-white shadow-md transition-transform duration-200 hover:shadow-lg group"
              >
                <Link to={`/productDetail/${item._id}`}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full max-sm:h-24 sm:h-32 lg:h-48 object-cover rounded-md mb-3 group-hover:scale-105 transition-transform duration-200"
                  />
                  <h3 className="text-xs sm:text-base lg:text-lg font-semibold mb-1">
                    {item.name}
                  </h3>
                  <p className="text-[8px] sm:text-sm md:text-base text-gray-600 mb-1">
                    {item.brand}
                  </p>
                  <p className="text-[8px] sm:text-sm md:text-base font-bold text-[#f52e2e]">
                    {item.price} BDT
                  </p>
                </Link>
              </div>
            ))}
          </div>

          <div className="flex justify-between mt-5 max-sm:mb-5">
            <button
              onClick={handlePrevPage}
              className="btn bg-[#03b4f6] text-white"
              disabled={currentPage === 1}
            >
              Prev
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              className="btn bg-[#03b4f6] text-white"
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
