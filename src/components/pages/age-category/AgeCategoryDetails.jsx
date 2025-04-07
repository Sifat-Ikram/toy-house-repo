import { useEffect, useMemo, useRef, useState } from "react";
import AgeCategoryFilter from "./AgeCategoryFilter";
import { useLocation } from "react-router-dom";
import useAgeCategory from "../../hooks/by-filter/useAgeCategory";
import { debounce } from "lodash";
import Card from "../../hooks/Card";

const AgeCategoryDetails = () => {
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  const query = useQuery();
  const minAge = parseInt(query.get("minAge")) || 0;
  const maxAge = parseInt(query.get("maxAge")) || Infinity;

  const [sortOrder, setSortOrder] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [filtersVisible, setFiltersVisible] = useState(true);
  const [filtersDrawerVisible, setFiltersDrawerVisible] = useState(false);
  const [page, setPage] = useState(0);
  const isFetchingRef = useRef(false);
  const [ageCategories, refetch, isLoading, error] = useAgeCategory(
    minAge,
    maxAge
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Memoize the filtered products for performance
  const filteredProducts = useMemo(() => {
    return ageCategories
      ?.filter((prod) => {
        const matchesBrand =
          !selectedBrand || prod.brand_name === selectedBrand;
        const matchesCategory =
          !selectedCategory || prod.category_name === selectedCategory;
        const matchesPrice =
          prod.selling_price >= priceRange[0] &&
          prod.selling_price <= priceRange[1];
        const matchesSearch =
          !searchTerm ||
          prod.product_name.toLowerCase().includes(searchTerm.toLowerCase());

        return matchesBrand && matchesCategory && matchesPrice && matchesSearch;
      })
      .sort((a, b) => {
        if (sortOrder === "highToLow") return b.selling_price - a.selling_price;
        if (sortOrder === "lowToHigh") return a.selling_price - b.selling_price;
        return 0;
      });
  }, [
    ageCategories,
    selectedBrand,
    selectedCategory,
    priceRange,
    searchTerm,
    sortOrder,
  ]);

  // Handle infinite scroll
  useEffect(() => {
    const handleScroll = debounce(() => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100
      ) {
        setPage((prevPage) => prevPage + 1);
      }
    }, 300);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoading]);

  useEffect(() => {
    if (page > 0 && !isLoading) {
      refetch().finally(() => {
        isFetchingRef.current = false;
      });
    }
  }, [page, refetch, isLoading]);

  if (error) {
    return (
      <div className="text-center text-red-600">
        Error loading products: {error.message}
      </div>
    );
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
          <div className="w-full dark:bg-white max-sm:px-2 flex flex-wrap justify-between items-center my-3 px-4 py-2 bg-base-200">
            <div
              onClick={() => setFiltersVisible(!filtersVisible)}
              className="hidden sm:block text-xs sm:text-sm md:text-base lg:text-lg dark:text-black font-semibold text-gray-800 hover:text-gray-600 px-4 py-2 cursor-pointer rounded-lg transition-transform duration-300"
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
            <div
              className={`fixed top-0 left-0 h-full dark:bg-white bg-white shadow-lg z-40 pt-28 px-3 transform ${
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
            <div className="flex items-center gap-2 sm:gap-3">
              <h1 className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold text-gray-700">
                Sort By price:
              </h1>
              <select
                className="p-1 md:p-2 rounded-lg bg-base-100 dark:bg-white border border-gray-200 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-gray-300"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="">Featured</option>
                <option value="highToLow">High to Low</option>
                <option value="lowToHigh">Low to High</option>
              </select>
            </div>
          </div>
          <div className="flex justify-center gap-1 sm:gap-3 md:gap-5">
            {filtersVisible && (
              <div className="hidden sm:flex flex-col bg-base-100 dark:bg-white w-full sm:w-1/3 md:w-1/4 py-6 space-y-4 px-3 md:px-5 lg:shadow-lg">
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
            <div className="flex-1 max-sm:px-1 sm:pr-1 md:pr-2 lg:pr-4">
              {filteredProducts.length ? (
                <div className="pb-5 max-sm:px-1">
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-5">
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

export default AgeCategoryDetails;
