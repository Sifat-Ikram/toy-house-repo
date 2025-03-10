import { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import useCategory from "../../hooks/useCategory";

const BrandFilter = ({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  priceRange,
  setPriceRange,
  selectedAge,
  setSelectedAge,
}) => {
  const [isPriceOpen, setIsPriceOpen] = useState(false);
  const [isAgeOpen, setIsAgeOpen] = useState(false);
  const [categories] = useCategory();

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

  const handleSearchTermChange = (e) => {
    e.preventDefault();
    const value = e.target.value;
    setSearchTerm(value);
  };

  const handlePriceRangeChange = (value) => {
    if (priceRange[0] === value[0] && priceRange[1] === value[1]) {
      setPriceRange([0, Infinity]); // Reset to default
    } else {
      setPriceRange(value); // Set selected range
    }
  };

  const handleAgeGroupChange = (range) => {
    if (selectedAge && JSON.stringify(selectedAge) === JSON.stringify(range)) {
      setSelectedAge(null); // Reset if same range is clicked again
    } else {
      setSelectedAge(range); // Set selected age range
    }
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
                <span className="text-xs sm:text-sm lg:text-base text-gray-700 dark:text-black">
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
                <span className="text-xs sm:text-sm lg:text-base dark:text-black">
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

export default BrandFilter;
