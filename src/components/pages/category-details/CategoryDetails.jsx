import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useNewProducts from "../../hooks/useNewProducts";
import CategoryFilters from "./CategoryFilter";

const CategoryDetails = () => {
  const { id } = useParams();
  const [newProducts, refetch, isLoading, error] = useNewProducts();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedAge, setSelectedAge] = useState("");
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [filtersVisible, setFiltersVisible] = useState(true);
  const [filtersDrawerVisible, setFiltersDrawerVisible] = useState(false);
  const [sortOrder, setSortOrder] = useState("");
  const [page, setPage] = useState(0);
  const [allProducts, setAllProducts] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  const selectedCategory = newProducts?.filter(
    (product) => product?.category?.id == id
  );

  useEffect(() => {
    if (selectedBrand.length > 0) {
      setAllProducts((prevProducts) => [...prevProducts, ...selectedBrand]);
      setIsFetching(false);
    }
  }, [selectedBrand]);

  // Scroll event listener for infinite scrolling
  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;
      if (
        scrollTop + clientHeight >= scrollHeight - 100 &&
        !isLoading &&
        !isFetching
      ) {
        setPage((prevPage) => prevPage + 1);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoading, isFetching]);

  // Fetch next page of products when `page` changes
  useEffect(() => {
    if (page > 0) {
      setIsFetching(true);
      refetch();
    }
  }, [page, refetch]);

  // Error handling (optional)
  if (error) {
    return <div>Error loading products: {error.message}</div>;
  }

  if (!selectedBrand) {
    return <p className="text-center text-red-500">Product not found</p>;
  }

  const filteredProducts = allProducts
    ?.filter((prod) => {
      const matchesBrand =
        selectedBrand === "" || prod.brand?.name === selectedBrand;
      const matchesAge =
        selectedAge === "" ||
        (selectedAge >= prod.minimum_age_range &&
          selectedAge <= prod.maximum_age_range);
      const matchesPrice =
        prod.base_price >= priceRange[0] && prod.base_price <= priceRange[1];
      const matchesSearch =
        searchTerm === "" ||
        (prod.product_name || "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

      return matchesBrand && matchesAge && matchesPrice && matchesSearch;
    })
    .sort((a, b) => {
      if (sortOrder === "highToLow") return b.base_price - a.base_price;
      if (sortOrder === "lowToHigh") return a.base_price - b.base_price;
      return 0;
    });

  const handleOutsideClick = (e) => {
    if (e.target.id === "overlay") {
      setFiltersDrawerVisible(false);
    }
  };

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
          <div className="my-10 px-2 sm:px-6 md:px-10 lg:px-20">
            <h2 className="text-xl md:text-2xl lg:text-4xl font-bold text-center mb-5 tracking-wider">
              Discover a World of Toys!
            </h2>

            <p className="text-center text-gray-700 text-sm md:text-lg lg:text-xl max-w-2xl mx-auto">
              Explore our curated collection of high-quality {id} toys designed
              to inspire learning and laughter in every child.
            </p>
          </div>
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
                <div>
                  <div className="flex items-center space-x-2">
                    {/* Render selected brand */}
                    {selectedCategory.length > 0 && (
                      <div className="flex items-center bg-gray-200 text-sm px-[10px] py-1 rounded-full">
                        {selectedCategory}
                        <button
                          onClick={clearBrand}
                          className="ml-2 text-red-500 hover:text-red-700"
                        >
                          &times;
                        </button>
                      </div>
                    )}

                    {/* Clear All button */}
                    {selectedCategory && (
                      <button
                        onClick={clearAll}
                        className="flex items-center bg-gray-200 text-sm px-[10px] py-1 rounded-full"
                      >
                        Clear All
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
                    {filteredProducts.map((product) => (
                      <div
                        key={product.id}
                        className="w-full product-cart rounded-md sm:rounded-lg md:rounded-xl lg:rounded-3xl pb-5 flex flex-col overflow-hidden group"
                      >
                        <Link to={`/productDetail/${product.id}`}>
                          <img
                            src={product?.display_image_url}
                            alt={product?.product_name}
                            className="bg-base-200 h-[300px] sm:h-[250px] md:h-[280px] lg:h-[320px] rounded-t-md sm:rounded-t-lg md:rounded-t-xl lg:rounded-t-3xl w-full transition-transform duration-300 group-hover:scale-105"
                          />
                          <div className="flex flex-col justify-start space-y-1 pt-4 lg:pt-5">
                            <p className="text-[13px] font-roboto">
                              {product?.category?.name || " "}
                            </p>
                            <h2 className="font-bold text-base sm:text-lg md:text-xl lg:text-2xl font-poppins text-[#3E3E3E] sm:min-h-14 md:min-h-14 lg:min-h-16">
                              {product?.product_name || "Product Name"}
                            </h2>

                            <p className="text-sm font-roboto min-h-10">
                              {product.summary}
                            </p>
                          </div>
                        </Link>
                        <div className="flex items-center mt-2 gap-2">
                          <button
                            onClick={() => handleAddToCart(product)}
                            className="w-fit md:w-1/2 max-md:px-6 py-2 sm:py-[6px] md:py-2 rounded-md sm:rounded-lg md:rounded-xl lg:rounded-3xl bg-[#317ff3] hover:bg-[#31b2f3] text-sm lg:text-base font-semibold text-white transition-all cursor-pointer"
                          >
                            Add to Cart
                          </button>
                          <p className="font-bold text-base sm:text-sm md:text-base lg:text-lg text-[#3E3E3E]">
                            Tk {product?.selling_price}
                          </p>
                        </div>
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
