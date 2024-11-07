import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import useProduct from "../../hooks/useProduct";
import useCategory from "../../hooks/useCategory";
import Cover from "../../hooks/Cover";

const CategoryDetails = () => {
  const { id } = useParams();
  const [product] = useProduct();
  const [categories] = useCategory();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [searchTerm, setSearchTerm] = useState("");
  const productsPerPage = 12;

  const selectedCategory = categories.find((category) => category.name === id);
  const selectedProduct = product.filter((prod) => prod.category === id);

  if (!selectedProduct.length) {
    return <p className="text-center text-red-500">Category not found</p>;
  }

  // Filter products based on selected brand, price range, and search term
  const filteredProducts = selectedProduct.filter(
    (prod) =>
      (selectedBrand === "" || prod.brand === selectedBrand) &&
      prod.price >= priceRange[0] &&
      prod.price <= priceRange[1] &&
      prod.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div>
      <Cover img={selectedCategory.image} />
      <div className="mt-10">
        <motion.h2
          className="text-3xl font-semibold text-center mb-5 tracking-wider text-purple-700"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Explore Our {id} Collection
        </motion.h2>

        <motion.p
          className="text-center text-gray-700 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          Discover the best {id} products that we have to offer. Our collection
          is curated to provide you with only the finest options.
        </motion.p>
      </div>
      <div className="flex justify-center mt-5">
        <div className="w-80 py-8 sticky top-20 h-screen px-5 shadow">
          <h1 className="text-4xl font-bold mb-4">Filter</h1>
          <div className="mb-6">
            <label className="block text-lg font-medium mb-2">Search</label>
            <input
              type="text"
              placeholder="Search product..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border-[1px] border-solid border-gray-400 focus:ring-[1px] focus:ring-gray-400 p-2 rounded"
            />
          </div>
          <div className="mb-6">
            <label className="block text-lg font-medium mb-2">Brand</label>
            <select
              className="w-full border p-2 rounded"
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
            >
              <option value="">All Brands</option>
              {[...new Set(selectedProduct.map((prod) => prod.brand))].map(
                (brand) => (
                  <option key={brand} value={brand}>
                    {brand}
                  </option>
                )
              )}
            </select>
          </div>
          <div>
            <label className="block text-lg font-medium mb-2">
              Price Range
            </label>
            <input
              type="range"
              min="0"
              max="1000"
              value={priceRange[1]}
              onChange={(e) =>
                setPriceRange([priceRange[0], Number(e.target.value)])
              }
              className="w-full"
            />
            <div className="flex justify-between text-sm mt-2">
              <span>{priceRange[0]} BDT</span>
              <span>{priceRange[1]} BDT</span>
            </div>
          </div>
        </div>
        <div className="w-11/12 mx-auto mt-8 px-4">
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8 lg:gap-10"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.2,
                },
              },
            }}
          >
            {currentProducts?.map((productItem) => (
              <Link
                key={productItem._id}
                to={`/productDetail/${productItem._id}`}
              >
                <div className="group shadow-md rounded-md w-[300px] h-[400px]">
                  <img
                    src={productItem.image}
                    alt={productItem.name}
                    className="h-48 w-full rounded-t-lg group-hover:scale-110 ease-in-out duration-500 m-3"
                  />
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-blue-800 tracking-wide">
                      {productItem.name}
                    </h3>
                    <p className="text-base text-gray-600 font-bold">
                      Brand:{" "}
                      <span className="font-semibold">{productItem.brand}</span>
                    </p>
                    <p className="text-base text-gray-600 font-bold">
                      Type:{" "}
                      <span className="font-semibold">{productItem.type}</span>
                    </p>
                    <p className="mt-4 text-lg font-semibold text-green-600">
                      {productItem.price} BDT
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </motion.div>
          <div className="flex justify-center mt-8 mb-10">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className={`px-4 py-2 mx-2 text-white bg-[#03b4f6] rounded ${
                currentPage === 1 && "opacity-50 cursor-not-allowed"
              }`}
            >
              Previous
            </button>
            <span className="px-4 py-2 mx-2">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 mx-2 rounded text-white bg-[#03b4f6] ${
                currentPage === totalPages && "opacity-50 cursor-not-allowed"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryDetails;
