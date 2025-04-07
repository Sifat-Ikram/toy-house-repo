import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import CategoryFilters from "./CategoryFilter";
import useByCategory from "../../hooks/by-filter/useByCategory";
import Card from "../../hooks/Card";

const CategoryDetails = () => {
  const { id } = useParams();
  const [categoryProducts, categoryRefetch, categoryIsLoading, categoryError] =
    useByCategory({ id });
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedAge, setSelectedAge] = useState("");
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [filtersVisible, setFiltersVisible] = useState(true);
  const [filtersDrawerVisible, setFiltersDrawerVisible] = useState(false);
  const [sortOrder, setSortOrder] = useState("");
  const [page, setPage] = useState(0);
  const isFetchingRef = useRef(false);

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top on mount
  }, []);

  // Infinite scroll functionality
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.offsetHeight - 100 &&
        !categoryIsLoading &&
        !isFetchingRef.current
      ) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [categoryIsLoading]);

  useEffect(() => {
    if (page > 0 && !isFetchingRef.current) {
      isFetchingRef.current = true;
      categoryRefetch(id, page).finally(() => {
        isFetchingRef.current = false;
      });
    }
  }, [page, id, categoryRefetch]);

  // Error handling
  if (categoryError) {
    return <div>Error loading products: {categoryError.message}</div>;
  }

  if (!categoryProducts) {
    return <span className="loading loading-ring loading-lg"></span>;
  }

  // Filtering logic
  const filteredProducts = categoryProducts
    ?.filter((prod) => {
      const matchesBrand = !selectedBrand || prod?.brand_name === selectedBrand;
      const matchesAge =
        !selectedAge ||
        (prod?.minimum_age_range >= selectedAge[0] &&
          prod?.maximum_age_range <= selectedAge[1]);
      const matchesPrice =
        prod.selling_price >= priceRange[0] &&
        prod.selling_price <= priceRange[1];
      const matchesSearch =
        !searchTerm ||
        prod.product_name?.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesBrand && matchesAge && matchesPrice && matchesSearch;
    })
    .sort((a, b) => {
      if (sortOrder === "highToLow") return b.selling_price - a.selling_price;
      if (sortOrder === "lowToHigh") return a.selling_price - b.selling_price;
      return 0;
    });

  const handleOutsideClick = (e) => {
    if (e.target.id === "overlay") {
      setFiltersDrawerVisible(false);
    }
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
              Explore our curated collection of high-quality toys designed to
              inspire learning and laughter in every child.
            </p>
          </div>
          {/* Filters Section */}
          <div className="w-full max-sm:px-2 dark:bg-white flex flex-wrap justify-between items-center my-3 px-4 py-2 bg-base-200">
            <div
              onClick={() => setFiltersVisible(!filtersVisible)}
              className="hidden sm:block text-xs sm:text-sm md:text-base lg:text-lg dark:text-black dark:bg-white font-semibold text-gray-800 hover:text-gray-600 px-4 py-2 cursor-pointer rounded-lg transition-transform duration-300"
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
              className={`fixed top-0 left-0 h-full dark:text-black dark:bg-white bg-white shadow-lg z-40 pt-28 px-3 transform ${
                filtersDrawerVisible ? "translate-x-0" : "-translate-x-full"
              } transition-transform duration-300 ease-in-out`}
              style={{ width: "250px" }}
            >
              <CategoryFilters
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                selectedBrand={selectedBrand}
                setSelectedBrand={setSelectedBrand}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                selectedAge={selectedAge}
                setSelectedAge={setSelectedAge}
              />
            </div>

            {/* Sort Section */}
            <div className="flex items-center gap-2 sm:gap-3">
              <h1 className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold dark:text-black dark:bg-white text-gray-700">
                Sort By Price:
              </h1>
              <select
                className="p-1 md:p-2 rounded-lg bg-base-100 border dark:text-black dark:bg-white border-gray-200 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-gray-300"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option
                  value=""
                  className="text-gray-700 text-xs sm:text-sm md:text-base lg:text-lg dark:text-black"
                >
                  Featured
                </option>
                <option
                  value="highToLow"
                  className="text-gray-700 text-xs sm:text-sm md:text-base lg:text-lg dark:text-black"
                >
                  High to Low
                </option>
                <option
                  value="lowToHigh"
                  className="text-gray-700 text-xs sm:text-sm md:text-base lg:text-lg dark:text-black"
                >
                  Low to High
                </option>
              </select>
            </div>
          </div>

          {/* Filters Sidebar */}
          <div className="flex justify-center gap-1 sm:gap-3 md:gap-5">
            {filtersVisible && (
              <div className="hidden sm:flex flex-col bg-base-100 dark:text-black dark:bg-white w-full sm:w-1/3 md:w-1/4 py-6 space-y-4 px-3 md:px-5 lg:shadow-lg">
                <CategoryFilters
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  selectedBrand={selectedBrand}
                  setSelectedBrand={setSelectedBrand}
                  priceRange={priceRange}
                  setPriceRange={setPriceRange}
                  selectedAge={selectedAge}
                  setSelectedAge={setSelectedAge}
                />
              </div>
            )}
            <div className="flex-1">
              {filteredProducts.length ? (
                <div className="max-sm:px-1 pb-5 sm:pr-1 md:pr-2 lg:pr-4">
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

export default CategoryDetails;
