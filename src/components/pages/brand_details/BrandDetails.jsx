import { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import BrandFilter from "./brandFilter";
import { motion } from "framer-motion";
import useByBrands from "../../hooks/by-filter/useByBrands";
import Card from "../../hooks/Card";

const BrandDetails = () => {
  const { id } = useParams();
  const [brandProducts, brandRefetch, brandIsLoading, brandError] = useByBrands(
    { id }
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAge, setSelectedAge] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [filtersVisible, setFiltersVisible] = useState(true);
  const [filtersDrawerVisible, setFiltersDrawerVisible] = useState(false);
  const [sortOrder, setSortOrder] = useState("");
  const [page, setPage] = useState(0);
  const isFetchingRef = useRef(false);

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page
  }, []);

  const filteredProducts = useMemo(() => {
    if (!brandProducts) return [];

    return brandProducts
      .filter((prod) => {
        const matchesCategory =
          !selectedCategory || prod?.category_name === selectedCategory;

        const matchesAge =
          !selectedAge ||
          (Array.isArray(selectedAge) &&
            selectedAge[0] <= prod?.maximum_age_range &&
            selectedAge[1] >= prod?.minimum_age_range);

        const matchesPrice =
          !priceRange ||
          (prod?.selling_price &&
            prod.selling_price >= priceRange[0] &&
            prod.selling_price <= priceRange[1]);

        const matchesSearch =
          !searchTerm ||
          (prod?.product_name || "")
            .toLowerCase()
            .includes(searchTerm.toLowerCase());

        const result =
          matchesCategory && matchesAge && matchesPrice && matchesSearch;

        return result;
      })
      .sort((a, b) => {
        if (sortOrder === "highToLow") return b.selling_price - a.selling_price;
        if (sortOrder === "lowToHigh") return a.selling_price - b.selling_price;
        return 0;
      });
  }, [
    brandProducts,
    searchTerm,
    selectedCategory,
    selectedAge,
    priceRange,
    sortOrder,
  ]);

  // Scroll event listener for infinite scrolling
  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;
      if (
        scrollTop + clientHeight >= scrollHeight - 100 &&
        !brandIsLoading &&
        !isFetchingRef.current
      ) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [brandIsLoading]);

  // Fetch next page of products when `page` changes
  useEffect(() => {
    if (page > 0 && !isFetchingRef.current) {
      isFetchingRef.current = true;
      brandRefetch(id, page).finally(() => {
        isFetchingRef.current = false;
      });
    }
  }, [page, id, brandRefetch]);

  // Error handling (optional)
  if (brandError) {
    return <div>Error loading products: {brandError.message}</div>;
  }

  if (!brandProducts) {
    return <span className="loading loading-ring loading-lg"></span>;
  }

  const handleOutsideClick = (e) => {
    if (e.target.id === "overlay") {
      setTimeout(() => setFiltersDrawerVisible(false), 200);
    }
  };

  if (!filteredProducts) {
    return <p className="text-center text-red-500">Product not found</p>;
  }

  const clearCategory = () => setSelectedCategory("");
  const clearAll = () => {
    setSelectedCategory("");
    setSelectedAge("");
    setPriceRange([0, 2000]);
    setSearchTerm("");
    setFiltersVisible(true);
    setFiltersDrawerVisible(false);
  };

  return (
    <div className="dark:text-black dark:bg-white">
      <div className="drawer drawer-end">
        <input id="drawer-toggle" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <div className="my-10 px-2 sm:px-6 md:px-10 lg:px-20">
            <h2 className="text-xl md:text-2xl lg:text-4xl font-bold text-center mb-5 tracking-wider">
              Discover a World of Toys!
            </h2>

            <p className="text-center text-gray-700 dark:text-black text-sm md:text-lg lg:text-xl max-w-2xl mx-auto">
              Explore our curated collection of high-quality {id} toys designed
              to inspire learning and laughter in every child.
            </p>
          </div>
          <div className="w-full max-sm:px-2 dark:bg-white flex flex-wrap justify-between items-center my-3 px-4 py-2 bg-base-200">
            {/* Filters Toggle Button */}
            <div
              onClick={() => setFiltersVisible(!filtersVisible)}
              className="hidden sm:block text-xs sm:text-sm md:text-base lg:text-lg font-semibold text-gray-800 hover:text-gray-600 px-4 py-2 cursor-pointer rounded-lg transition-transform duration-300"
            >
              {filtersVisible ? "Hide Filters" : "Show Filters"}
            </div>
            <div
              onClick={() => setFiltersDrawerVisible(!filtersDrawerVisible)}
              className="block sm:hidden text-xs sm:text-sm md:text-base lg:text-lg font-semibold text-gray-800 hover:text-gray-600 px-4 py-2 cursor-pointer rounded-lg transition-transform duration-300"
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
            <motion.div
              className="fixed top-0 left-0 h-full bg-white dark:bg-white shadow-lg z-40 pt-28 px-3"
              initial={{ x: "-100%" }}
              animate={{ x: filtersDrawerVisible ? 0 : "-100%" }}
              transition={{ duration: 0.3 }}
            >
              <BrandFilter
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                selectedAge={selectedAge}
                setSelectedAge={setSelectedAge}
              />
            </motion.div>

            {/* Sort By Section */}
            <div className="flex items-center gap-2 sm:gap-3">
              <h1 className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold text-gray-700 dark:text-black">
                Sort By:
              </h1>
              <select
                className="p-1 md:p-2 rounded-lg bg-base-100 dark:text-black dark:bg-white border border-gray-200 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-gray-300"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="" className="text-gray-700 dark:text-black">
                  Featured
                </option>
                <option
                  value="highToLow"
                  className="text-gray-700 dark:text-black"
                >
                  High to Low
                </option>
                <option
                  value="lowToHigh"
                  className="text-gray-700 dark:text-black"
                >
                  Low to High
                </option>
              </select>
            </div>
          </div>

          <div className="flex justify-center gap-1 sm:gap-3 md:gap-5">
            {filtersVisible && (
              <div className="hidden sm:flex flex-col bg-base-100 sticky top-0 w-full sm:w-1/3 md:w-1/4 py-6 space-y-4 px-3 md:px-5 lg:shadow-lg">
                <BrandFilter
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                  priceRange={priceRange}
                  setPriceRange={setPriceRange}
                  selectedAge={selectedAge}
                  setSelectedAge={setSelectedAge}
                />
              </div>
            )}
            <div className="flex-1">
              {filteredProducts.length ? (
                <div className="max-sm:px-1">
                  <div className="flex items-center space-x-2">
                    {/* Render selected brand */}
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
                    {(selectedAge ||
                      searchTerm ||
                      priceRange[0] !== 0 ||
                      priceRange[1] !== 2000) && (
                      <button
                        onClick={clearAll}
                        className="flex items-center bg-gray-200 text-sm px-[10px] py-1 rounded-full"
                      >
                        Clear All
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mt-5">
                    {filteredProducts.map((product) => (
                      <div key={product.id}>
                        <Card product={product} />
                      </div>
                    ))}
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

export default BrandDetails;
