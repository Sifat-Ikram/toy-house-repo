import { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import useNewProducts from "../../hooks/useNewProducts";

const AgeCategoryFilter = ({
  searchTerm,
  setSearchTerm,
  selectedBrand,
  setSelectedBrand,
  priceRange,
  setPriceRange,
  selectedCategory,
  setSelectedCategory,
}) => {
  const [newProducts] = useNewProducts();
  const [isPriceOpen, setIsPriceOpen] = useState(true);

  const collapsePriceOpenClose = () => {
    setIsPriceOpen(!isPriceOpen);
  };

  return (
    <div className="max-h-screen space-y-5">
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
        <label className="block text-sm sm:text-base font-bold mb-2">
          Brand
        </label>
        <select
          className="w-full border p-2 rounded text-sm sm:text-base"
          value={selectedBrand}
          onChange={(e) => setSelectedBrand(e.target.value)}
        >
          <option value="">All Brands</option>
          {[
            ...new Set(
              newProducts.map((prod) => prod.brand?.name).filter(Boolean)
            ),
          ].map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>
      </div>

      {/* Price Range */}
      <div>
        <label
          onClick={() => collapsePriceOpenClose()}
          className="text-xs cursor-pointer flex justify-between items-center sm:text-sm lg:text-base font-bold mb-2"
        >
          <h1>Price Range</h1>
          <h1>{isPriceOpen ? <FaMinus /> : <FaPlus />}</h1>
        </label>
        {isPriceOpen && (
          <div className="space-y-3">
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
                  type="checkbox"
                  name="priceRange"
                  value={JSON.stringify(value)}
                  checked={
                    priceRange &&
                    priceRange[0] === value[0] &&
                    priceRange[1] === value[1]
                  }
                  onChange={() => setPriceRange(value)}
                  className="checkbox"
                />
                <span className="text-xs sm:text-sm lg:text-base text-gray-700">
                  BDT {label}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* category */}
      <div>
        <label className="block text-sm sm:text-base font-bold mb-2">
          Category
        </label>
        <select
          className="w-full border p-2 rounded text-sm sm:text-base"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {[
            ...new Set(
              newProducts.map((prod) => prod.category?.name).filter(Boolean)
            ),
          ].map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default AgeCategoryFilter;
