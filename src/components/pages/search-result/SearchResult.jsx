import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";

const SearchResult = () => {
  const axiosPublic = useAxiosPublic();
  const { id } = useParams(); // Extract the 'id' from the URL parameters
  const [currentPage, setCurrentPage] = useState(1); // Pagination state
  const productsPerPage = 8; // Number of products per page

  // Fetch products using react-query
  const {
    data: product = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["product"],
    queryFn: async () => {
      const res = await axiosPublic.get("/product");
      return res.data;
    },
    onError: (err) => {
      console.error("Error fetching product data:", err);
    },
  });

  // Filter products based on the 'id' from URL params
  const searchedProduct = product.filter((sProduct) =>
    sProduct.name.toLowerCase().includes(id.toLowerCase())
  );

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = searchedProduct.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(searchedProduct.length / productsPerPage);

  // Handle loading and error states
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="mt-20">
      <h1 className="text-4xl font-semibold text-center">
        Toys found for your search: <span className="font-bold uppercase"> {id} </span>
      </h1>
      <div className="flex max-md:flex-col min-h-screen pt-10 lg:px-8 sm:px-2 md:px-4">
        <div className="flex-1 p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-6 gap-4">
          {searchedProduct.length > 0 ? (
            <>
              {currentProducts.map((item) => (
                <Link key={item._id} to={`/productDetail/${item._id}`}>
                  <div className="relative rounded-lg overflow-hidden w-auto max-md:w-full mx-auto bg-white dark:bg-dark shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:scale-105">
                    <img
                      src={item.image}
                      className="object-cover w-full h-64 md:h-72 transition-transform duration-300 ease-in-out transform hover:scale-110"
                      alt={item.name}
                    />
                    <div className="p-5 flex flex-col">
                      <h1 className="text-lg md:text-xl lg:text-2xl font-semibold text-gray-700 dark:text-white truncate">
                        {item.name}
                      </h1>
                      <h2 className="text-sm md:text-base lg:text-lg text-gray-500 dark:text-gray-300 mt-1">
                        {item.category}
                      </h2>
                      <div className="lg:flex items-center justify-between mt-4">
                        <p className="text-xl font-semibold text-green-500">
                          ${item.price}
                        </p>
                        <div className="flex items-center gap-2">
                          <Rating
                            style={{ maxWidth: 100, color: "#dd350b" }}
                            value={item.rating}
                            readOnly
                          />
                          <span className="text-sm text-gray-700 dark:text-gray-300">
                            {item.rating}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-[#dd350b] dark:bg-dark"></div>
                  </div>
                </Link>
              ))}
            </>
          ) : (
            <div className="text-center text-lg text-gray-800 dark:text-gray-300">
              No products found for your search: {id}
            </div>
          )}
        </div>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center lg:gap-20 md:gap-10 gap-2 my-6">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="btn bg-[#dd350b] border-solid border-white text-white hover:bg-[#dd350b] mr-2 transition-transform duration-200 transform hover:scale-105"
        >
          Previous
        </button>
        <span className="lg:text-lg sm:text-base text-xs">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="btn bg-[#dd350b] border-solid border-white text-white hover:bg-[#dd350b] ml-2 transition-transform duration-200 transform hover:scale-105"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default SearchResult;
