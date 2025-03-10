import { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import useBrands from "../../hooks/useBrands";

const CategoryFilters = ({
  searchTerm,
  setSearchTerm,
  selectedBrand,
  setSelectedBrand,
  priceRange,
  setPriceRange,
  selectedAge,
  setSelectedAge,
}) => {
  const [isPriceOpen, setIsPriceOpen] = useState(false);
  const [isAgeOpen, setIsAgeOpen] = useState(false);
  const [brands] = useBrands();

  // Toggle sections
  const togglePriceFilter = () => setIsPriceOpen(!isPriceOpen);
  const toggleAgeFilter = () => setIsAgeOpen(!isAgeOpen);

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

  // Toggle Price Range selection
  const handlePriceRangeChange = (value) => {
    // If selected price range is already checked, remove it
    if (priceRange[0] === value[0] && priceRange[1] === value[1]) {
      setPriceRange([0, Infinity]); // Reset to default unselected state
    } else {
      setPriceRange(value); // Set selected range
    }
  };

  // Toggle Age Group selection
  const handleAgeGroupChange = (range) => {
    if (selectedAge && JSON.stringify(selectedAge) === JSON.stringify(range)) {
      // If the same range is clicked again, reset filter (show all products)
      setSelectedAge(null);
    } else {
      // Otherwise, set the selected age range
      setSelectedAge(range);
    }
  };

  return (
    <div className="min-h-screen space-y-5 sticky top-28 dark:text-black dark:bg-white">
      {/* 🔹 Search */}
      <div>
        <input
          type="text"
          placeholder="Search product..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full border p-2 rounded text-sm sm:text-base dark:text-black dark:bg-white"
        />
      </div>

      {/* 🔹 Brand Filter */}
      <div>
        <label className="block text-sm sm:text-base font-bold mb-2">
          Brand
        </label>
        <select
          className="w-full border p-2 rounded text-sm sm:text-base dark:text-black dark:bg-white"
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

      {/* 🔹 Price Range Filter */}
      <div className="dark:text-black dark:bg-white">
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

      {/* 🔹 Age Group Filter */}
      <div className="dark:text-black dark:bg-white">
        <label
          onClick={toggleAgeFilter}
          className="text-xs cursor-pointer flex justify-between items-center sm:text-sm lg:text-base font-bold mb-2"
        >
          <h1>Age Group</h1>
          <h1>{isAgeOpen ? <FaMinus /> : <FaPlus />}</h1>
        </label>
        {isAgeOpen && (
          <div className="space-y-3">
            {ageGroups.map(({ label, range }) => (
              <label
                key={label}
                className="flex items-center space-x-3 cursor-pointer"
              >
                <input
                  type="checkbox"
                  name="age"
                  value={JSON.stringify(range)}
                  checked={
                    selectedAge &&
                    selectedAge[0] === range[0] &&
                    selectedAge[1] === range[1]
                  }
                  onChange={() => handleAgeGroupChange(range)}
                  className="checkbox"
                />
                <span className="text-xs sm:text-sm lg:text-base">
                  {label} years
                </span>
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryFilters;
