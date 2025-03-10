import { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import useBrands from "../../hooks/useBrands";
import useCategory from "../../hooks/useCategory";

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
  const [brands] = useBrands();
  const [categories] = useCategory();
  const [isPriceOpen, setIsPriceOpen] = useState(false);

  const togglePriceFilter = () => setIsPriceOpen(!isPriceOpen);

  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handlePriceRangeChange = (value) => {
    const isSelected = priceRange[0] === value[0] && priceRange[1] === value[1];
    setPriceRange(isSelected ? [0, Infinity] : value);
  };

  const priceRanges = [
    { label: "0 - 500", value: [0, 500] },
    { label: "500 - 2000", value: [500, 2000] },
    { label: "2000 - 5000", value: [2000, 5000] },
    { label: "5000 - 10000", value: [5000, 10000] },
    { label: "10000 - 15000", value: [10000, 15000] },
    { label: "15000+", value: [15000, Infinity] },
  ];

  return (
    <div className="min-h-screen space-y-5 sticky top-20 dark:text-black dark:bg-white">
      {/* Search */}
      <div>
        <input
          type="text"
          placeholder="Search product..."
          value={searchTerm}
          onChange={handleSearchTermChange}
          className="w-full border p-2 rounded text-sm sm:text-base dark:bg-white"
        />
      </div>

      {/* Category Filter */}
      <div>
        <label className="block text-sm sm:text-base font-bold mb-2">
          Category
        </label>
        <select
          className="w-full border p-2 rounded text-sm sm:text-base dark:bg-white"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">Categories</option>
          {categories?.map((category) => (
            <option key={category.category_id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {/* Brand Filter */}
      <div>
        <label className="block text-sm sm:text-base font-bold mb-2">
          Brand
        </label>
        <select
          className="w-full border p-2 rounded text-sm sm:text-base dark:bg-white"
          value={selectedBrand}
          onChange={(e) => setSelectedBrand(e.target.value)}
        >
          <option value="">All Brands</option>
          {brands?.map((brand) => (
            <option key={brand.brand_id} value={brand.name}>
              {brand.name}
            </option>
          ))}
        </select>
      </div>

      {/* Price Range Filter */}
      <div>
        <label
          onClick={togglePriceFilter}
          className="text-xs cursor-pointer flex justify-between items-center sm:text-sm lg:text-base font-bold mb-2"
        >
          <h1>Price Range</h1>
          <h1>{isPriceOpen ? <FaMinus /> : <FaPlus />}</h1>
        </label>
        {isPriceOpen && (
          <div className="space-y-3">
            {priceRanges.map(({ label, value }) => (
              <label
                key={label}
                className="flex items-center space-x-3 cursor-pointer"
              >
                <input
                  type="checkbox"
                  name="priceRange"
                  value={JSON.stringify(value)}
                  checked={
                    priceRange[0] === value[0] && priceRange[1] === value[1]
                  }
                  onChange={() => handlePriceRangeChange(value)}
                  className="checkbox"
                />
                <span className="text-xs sm:text-sm lg:text-base">
                  BDT {label}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AgeCategoryFilter;
