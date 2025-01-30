import { useState } from "react";
import AgeCategoryFilter from "./AgeCategoryFilter";
import { Link, useLocation } from "react-router-dom";
import useAgeCategory from "../../hooks/useAgeCategory";

const AgeCategoryDetails = () => {
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };
  const query = useQuery();
  const [sortOrder, setSortOrder] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const minAge = parseInt(query.get("minAge")) || 0;
  const maxAge = parseInt(query.get("maxAge")) || Infinity;
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [filtersVisible, setFiltersVisible] = useState(true);
  const [filtersDrawerVisible, setFiltersDrawerVisible] = useState(false);
  const [ageCategories] = useAgeCategory(minAge, maxAge);

  const productsPerPage = 12;

  console.log(ageCategories);

  const filteredProducts = ageCategories
    ?.filter((prod) => {
      const matchesBrand =
        selectedBrand === "" || prod.brand?.name === selectedBrand;
      const matchesCategory =
        selectedCategory === "" || prod.category?.name === selectedCategory;
      const matchesPrice =
        prod.base_price >= priceRange[0] && prod.base_price <= priceRange[1];
      const matchesSearch =
        searchTerm === "" ||
        (prod.product_name || "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

      return matchesBrand && matchesCategory && matchesPrice && matchesSearch;
    })
    .sort((a, b) => {
      if (sortOrder === "highToLow") return b.base_price - a.base_price;
      if (sortOrder === "lowToHigh") return a.base_price - b.base_price;
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

  const handleOutsideClick = (e) => {
    if (e.target.id === "overlay") {
      setFiltersDrawerVisible(false);
    }
  };

  const clearCategory = () => setSelectedCategory("");
  const clearBrand = () => setSelectedBrand("");
  const clearAll = () => {
    setSelectedBrand("");
  };

  const handleAddToCart = (product) => {
    console.log(product);
  };

  return (
    <div>
      <div className="drawer drawer-end">
        <input id="drawer-toggle" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <div className="w-full sm:w-11/12 mx-auto max-sm:px-2 flex flex-wrap justify-between items-center my-3 px-4 py-2 bg-base-200">
            {/* Filters Toggle Button */}
            <div
              onClick={() => setFiltersVisible(!filtersVisible)}
              className="hidden sm:block text-sm sm:text-base md:text-lg font-semibold text-gray-800 hover:text-gray-600 px-4 py-2 cursor-pointer rounded-lg transition-transform duration-300"
            >
              {filtersVisible ? "Hide Filters" : "Show Filters"}
            </div>
            <div
              onClick={() => setFiltersDrawerVisible(!filtersDrawerVisible)}
              className="block sm:hidden text-sm sm:text-base md:text-lg font-semibold text-gray-800 hover:text-gray-600 px-4 py-2 cursor-pointer rounded-lg transition-transform duration-300"
            >
              {!filtersDrawerVisible ? "Show Filters" : "Hide Filters"}
            </div>

            {filtersDrawerVisible && (
              <div
                id="overlay"
                onClick={handleOutsideClick}
                className="fixed inset-0 bg-black bg-opacity-50 z-30"
              ></div>
            )}

            {/* Filter Drawer */}
            <div
              className={`fixed top-0 left-0 h-full bg-white shadow-lg z-40 pt-28 px-3 transform ${
                filtersDrawerVisible ? "translate-x-0" : "-translate-x-full"
              } transition-transform duration-300 ease-in-out`}
              style={{ width: "250px" }}
            >
              <AgeCategoryFilter
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                selectedBrand={selectedBrand}
                setSelectedBrand={setSelectedBrand}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
              />
            </div>

            {/* Sort By Section */}
            <div className="flex items-center gap-2 sm:gap-3">
              <h1 className="text-sm sm:text-base md:text-lg font-semibold text-gray-700">
                Sort By:
              </h1>
              <select
                className="p-1 md:p-2 rounded-lg bg-base-100 border border-gray-200 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-gray-300"
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

          <div className="w-11/12 mx-auto flex justify-center gap-1 sm:gap-3 md:gap-5">
            {filtersVisible && (
              <div className="hidden sm:flex flex-col bg-base-100 w-full sm:w-1/3 md:w-1/4 py-6 space-y-4 px-3 md:px-5 lg:shadow-lg">
                <AgeCategoryFilter
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  selectedBrand={selectedBrand}
                  setSelectedBrand={setSelectedBrand}
                  priceRange={priceRange}
                  setPriceRange={setPriceRange}
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                />
              </div>
            )}
            <div className="flex-1">
              {currentProducts.length ? (
                <div>
                  <div className="flex items-center space-x-2">
                    {/* Render selected brand */}
                    {selectedBrand.length > 0 && (
                      <div className="flex items-center bg-gray-200 text-sm px-[10px] py-1 rounded-full">
                        {selectedBrand}
                        <button
                          onClick={clearBrand}
                          className="ml-2 text-red-500 hover:text-red-700"
                        >
                          &times;
                        </button>
                      </div>
                    )}
                    {/* Render selected Category */}
                    {selectedCategory.length > 0 && (
                      <div className="flex items-center bg-gray-200 text-sm px-[10px] py-1 rounded-full">
                        {selectedCategory}
                        <button
                          onClick={clearCategory}
                          className="ml-2 text-red-500 hover:text-red-700"
                        >
                          &times;
                        </button>
                      </div>
                    )}

                    {/* Clear All button */}
                    {selectedBrand && (
                      <button
                        onClick={clearAll}
                        className="flex items-center bg-gray-200 text-sm px-[10px] py-1 rounded-full"
                      >
                        Clear All
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
                    {currentProducts.map((product) => (
                      <div
                        key={product.id}
                        className="bg-white w-full product-cart border hover:shadow-md pb-2 rounded-md sm:rounded-lg md:rounded-xl lg:rounded-3xl flex flex-col overflow-hidden group"
                      >
                        <Link to={'/productDetail'}>
                          <img
                            src={product?.display_image_url}
                            alt={product?.product_name}
                            className="h-[150px] md:h-[180px] bg-base-200 lg:h-[250px] rounded-t-md sm:rounded-t-lg md:rounded-t-xl lg:rounded-t-3xl w-full transition-transform duration-300 group-hover:scale-105"
                          />
                          <div className="flex flex-col justify-start space-y-2 px-3 pt-4 lg:pt-5">
                            <p>{product?.category?.name || " "}</p>
                            <h2 className="font-bold text-base sm:text-lg lg:text-2xl font-roboto text-[#3E3E3E]">
                              {product?.product_name || "Product Name"}
                            </h2>

                            <p className="text-sm sm:text-xs md:text-sm lg:text-base font-roboto">
                              {product.summary}
                            </p>
                            <p className="text-sm sm:text-xs md:text-sm lg:text-base font-roboto">
                              {product?.colors || "product colors"}
                            </p>
                            <p className="font-bold text-base sm:text-sm lg:text-sm text-[#3E3E3E]">
                              <span className="text-base sm:text-sm md:text-base lg:text-lg">
                                {product.price}
                              </span>{" "}
                              Tk
                            </p>
                          </div>
                        </Link>
                        <button
                          onClick={() => handleAddToCart(product)}
                          className="w-fit md:w-1/2 mx-3 mt-2 max-md:px-6 py-2 sm:py-[6px] md:py-2 rounded-md sm:rounded-lg md:rounded-xl lg:rounded-3xl bg-[#317ff3] hover:bg-[#31b2f3] text-sm lg:text-base font-semibold text-white transition-all cursor-pointer"
                        >
                          Add to Cart
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-center md:gap-20 lg:gap-40 items-center mt-5 max-sm:mb-5 px-2 sm:px-5 md:px-7 lg:px-10">
                    <button
                      onClick={handlePrevPage}
                      className="px-4 md:px-5 lg:px-6 py-1 sm:py-[6px] md:py-2 rounded-md sm:rounded-lg md:rounded-xl lg:rounded-3xl bg-[#317ff3] hover:bg-[#31b2f3] text-lg font-semibold text-white transition-all cursor-pointer"
                      disabled={currentPage === 1}
                    >
                      Previous
                    </button>
                    <span>
                      Page {currentPage} of {totalPages}
                    </span>
                    <button
                      onClick={handleNextPage}
                      className="px-4 md:px-5 lg:px-6 py-1 sm:py-[6px] md:py-2 rounded-md sm:rounded-lg md:rounded-xl lg:rounded-3xl bg-[#317ff3] hover:bg-[#31b2f3] text-lg font-semibold text-white transition-all cursor-pointer"
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex justify-center mt-20">
                  <h1 className="text-center font-bold text-3xl">
                    No products available
                  </h1>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgeCategoryDetails;
