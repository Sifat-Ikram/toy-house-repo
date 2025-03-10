import { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import useBrands from "../../hooks/useBrands";
import useCategory from "../../hooks/useCategory";

// Reusable Filter Section Component
const FilterSection = ({ title, isOpen, toggle, options, value, onChange }) => (
  <div>
    <label
      onClick={toggle}
      className="text-xs cursor-pointer flex justify-between items-center sm:text-sm lg:text-base font-bold mb-2"
    >
      <h1>{title}</h1>
      <h1>{isOpen ? <FaMinus /> : <FaPlus />}</h1>
    </label>
    {isOpen && (
      <div className="space-y-3">
        {options.map(({ label, value: range }) => (
          <label
            key={label}
            className="flex items-center space-x-3 cursor-pointer"
          >
            <input
              type="radio"
              name={title.toLowerCase()}
              value={JSON.stringify(range)}
              checked={JSON.stringify(value) === JSON.stringify(range)}
              onChange={() => onChange(range)}
              className="radio"
            />
            <span className="text-xs sm:text-sm lg:text-base">{label}</span>
          </label>
        ))}
      </div>
    )}
  </div>
);

const ProductFilters = ({
  searchTerm,
  setSearchTerm,
  selectedBrand,
  setSelectedBrand,
  setSelectedCategory,
  selectedCategory,
  priceRange,
  setPriceRange,
  selectedAge,
  setSelectedAge,
}) => {
  const [brands] = useBrands();
  const [categories] = useCategory();
  const [isPriceOpen, setIsPriceOpen] = useState(false);
  const [isAgeOpen, setIsAgeOpen] = useState(false);

  // Toggle sections
  const togglePriceFilter = () => setIsPriceOpen((prev) => !prev);
  const toggleAgeFilter = () => setIsAgeOpen((prev) => !prev);

  // Price Range Options
  const priceRanges = [
    { label: "0 - 500", value: [0, 500] },
    { label: "500 - 2000", value: [500, 2000] },
    { label: "2000 - 5000", value: [2000, 5000] },
    { label: "5000 - 10000", value: [5000, 10000] },
    { label: "10000 - 15000", value: [10000, 15000] },
    { label: "15000+", value: [15000, Infinity] },
  ];

  // Age Group Options
  const ageGroups = [
    { label: "0-2", range: [0, 2] },
    { label: "3-5", range: [3, 5] },
    { label: "6-11", range: [6, 11] },
    { label: "12+", range: [12, Infinity] },
  ];

  const handleSearchTermChange = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
  };

  // Toggle Price Range selection
  const handlePriceRangeChange = (range) => {
    // Check if the selected range is the same as the current price range, then reset if true
    setPriceRange(
      JSON.stringify(priceRange) === JSON.stringify(range)
        ? [0, Infinity]
        : range
    );
  };

  // Toggle Age Group selection
  const handleAgeGroupChange = (range) => {
    setSelectedAge(
      JSON.stringify(selectedAge) === JSON.stringify(range) ? null : range
    );
  };

  return (
    <div className="min-h-screen space-y-5 sticky top-28 dark:text-black dark:bg-white">
      {/* Search */}
      <div>
        <input
          type="text"
          placeholder="Search product..."
          value={searchTerm}
          onChange={handleSearchTermChange}
          className="w-full border p-2 rounded text-sm sm:text-base dark:text-black dark:bg-white"
        />
      </div>

      {/* Category filter */}
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
            <option key={brand?.brand_id} value={brand?.name}>
              {brand?.name}
            </option>
          ))}
        </select>
      </div>

      {/* Price Range Filter */}
      <FilterSection
        title="Price Range"
        isOpen={isPriceOpen}
        toggle={togglePriceFilter}
        options={priceRanges}
        value={priceRange}
        onChange={handlePriceRangeChange}
      />

      {/* Age Group Filter */}
      <FilterSection
        title="Age Group"
        isOpen={isAgeOpen}
        toggle={toggleAgeFilter}
        options={ageGroups}
        value={selectedAge}
        onChange={handleAgeGroupChange}
      />
    </div>
  );
};

export default ProductFilters;
