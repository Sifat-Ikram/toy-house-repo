import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import ProductFilters from "./ProductFilters";
import "@smastrom/react-rating/style.css";
import Card from "../../hooks/Card";
import useAllProducts from "../../hooks/useAllProducts";

const AllProducts = () => {
  const [allProducts, refetch, isLoading, error] = useAllProducts();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedAge, setSelectedAge] = useState([0, Infinity]);
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [filtersVisible, setFiltersVisible] = useState(true);
  const [filtersDrawerVisible, setFiltersDrawerVisible] = useState(false);
  const [sortOrder, setSortOrder] = useState("");
  const [page, setPage] = useState(0);
  const isFetchingRef = useRef(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredProducts = useMemo(() => {
    let filtered = allProducts.filter((prod) => {
      // Match brand if a brand is selected, otherwise allow all
      const matchesBrand = !selectedBrand || prod?.brand_name === selectedBrand;

      // Match category if a category is selected, otherwise allow all
      const matchesCategory =
        !selectedCategory || prod?.category_name === selectedCategory;

      // Match age range if age is selected, otherwise allow all
      const matchesAge =
        !selectedAge ||
        (prod?.minimum_age_range >= selectedAge[0] &&
          prod?.maximum_age_range <= selectedAge[1]);

      // Match price range
      const matchesPrice =
        prod?.selling_price >= priceRange[0] &&
        prod?.selling_price <= priceRange[1];

      // Match search term in product name
      const matchesSearch =
        searchTerm === "" ||
        (prod?.product_name || "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

      // Only return products that match all criteria
      return (
        matchesBrand &&
        matchesCategory &&
        matchesAge &&
        matchesPrice &&
        matchesSearch
      );
    }); // Log filtered products to debug

    // Sorting logic - sort after filtering
    if (sortOrder === "highToLow") {
      filtered.sort((a, b) => b.selling_price - a.selling_price);
    } else if (sortOrder === "lowToHigh") {
      filtered.sort((a, b) => a.selling_price - b.selling_price);
    }

    return filtered;
  }, [
    allProducts,
    selectedBrand,
    selectedCategory,
    selectedAge,
    priceRange,
    searchTerm,
    sortOrder,
  ]);

  // Scroll event listener for infinite scrolling
  const handleScroll = useCallback(() => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight - 100 && !isLoading) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [isLoading]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll); // Proper cleanup
  }, [handleScroll]);

  // Fetch next page of products when `page` changes
  useEffect(() => {
    if (page > 0 && !isFetchingRef.current) {
      isFetchingRef.current = true;
      refetch().finally(() => {
        isFetchingRef.current = false;
      });
    }
  }, [page, refetch]);

  // Error handling (optional)
  if (error) {
    return <div>Error loading products: {error.message}</div>;
  }

  const handleOutsideClick = (e) => {
    if (e.target.id === "overlay") {
      setFiltersDrawerVisible(false);
    }
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
          <div className="w-full max-sm:px-2 dark:bg-white flex flex-wrap justify-between items-center my-3 px-4 py-2 bg-base-200">
            {/* Filters Toggle Button */}
            <div
              onClick={() => setFiltersVisible(!filtersVisible)}
              className="hidden sm:block text-xs sm:text-sm md:text-base lg:text-lg font-semibold text-gray-800 hover:text-gray-600 dark:text-black px-4 py-2 cursor-pointer rounded-lg transition-transform duration-300"
            >
              {filtersVisible ? "Hide Filters" : "Show Filters"}
            </div>
            <div
              onClick={() => setFiltersDrawerVisible(!filtersDrawerVisible)}
              className="block sm:hidden text-xs sm:text-sm md:text-base lg:text-lg font-semibold text-gray-800 hover:text-gray-600 dark:text-black px-4 py-2 cursor-pointer rounded-lg transition-transform duration-300"
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
              <ProductFilters
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                selectedBrand={selectedBrand}
                setSelectedBrand={setSelectedBrand}
                setSelectedCategory={setSelectedCategory}
                selectedCategory={selectedCategory}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                selectedAge={selectedAge}
                setSelectedAge={setSelectedAge}
              />
            </motion.div>

            {/* Sort By Section */}
            <div className="flex items-center gap-2 sm:gap-3">
              <h1 className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold">
                Sort By Price:
              </h1>
              <select
                className="p-1 md:p-2 rounded-lg bg-base-100 border dark:bg-white text-sm sm:text-base focus:outline-none focus:ring-2"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option
                  value=""
                  className="text-xs sm:text-sm md:text-base lg:text-lg dark:text-black text-gray-700"
                >
                  Featured
                </option>
                <option
                  value="highToLow"
                  className="text-xs sm:text-sm md:text-base lg:text-lg dark:text-black text-gray-700"
                >
                  High to Low
                </option>
                <option
                  value="lowToHigh"
                  className="text-xs sm:text-sm md:text-base lg:text-lg dark:text-black text-gray-700"
                >
                  Low to High
                </option>
              </select>
            </div>
          </div>

          <div className="max-sm:px-[10px] flex justify-center gap-1 sm:gap-3 md:gap-5">
            {filtersVisible && (
              <div className="hidden sm:flex flex-col dark:bg-white bg-base-100 w-full sm:w-1/3 md:w-1/4 py-6 space-y-4 px-3 md:px-5 lg:shadow-lg">
                <ProductFilters
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  selectedBrand={selectedBrand}
                  setSelectedBrand={setSelectedBrand}
                  setSelectedCategory={setSelectedCategory}
                  selectedCategory={selectedCategory}
                  priceRange={priceRange}
                  setPriceRange={setPriceRange}
                  selectedAge={selectedAge}
                  setSelectedAge={setSelectedAge}
                />
              </div>
            )}
            <div className="flex-1">
              {filteredProducts.length ? (
                <div className="max-sm:px-1 sm:pr-1 md:pr-2 lg:pr-4">
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-5 ">
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

export default AllProducts;
