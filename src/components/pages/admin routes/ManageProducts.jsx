import { FaChevronLeft, FaChevronRight, FaEdit, FaTrash } from "react-icons/fa";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useProductDashboard from "../../hooks/useProductDashboard";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const ManageProducts = () => {
  const productsPerPage = 8;
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [products, productRefetch] = useProductDashboard();

  console.log(products);

  // Filter products based on search term
  const filteredProducts = searchTerm
    ? products.filter((product) =>
        product?.product_name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : products;

  const totalProducts = filteredProducts.length;
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  // Pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const handleSearchChange = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleDelete = (id) => {
    console.log("Delete product with id:", id);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  // Function to update product status
  const handleToggleStatus = async (id, field, currentValue) => {
    const updatedValue = !currentValue;

    try {
      await axiosPublic.patch(`https://your-backend-url.com/products/${id}`, {
        [field]: updatedValue,
      });

      // Refetch products after update
      productRefetch();
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <div className="p-1 sm:p-[6px] md:p-3 bg-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3 text-center">
          Manage Products
        </h1>
        <div className="flex justify-between gap-3 items-center mt-10 mb-2 bg-white py-2 px-5 rounded-md">
          <h1 className="text-base sm:text-sm md:text-base lg:text-lg font-semibold">
            <span>Total Products : </span> {products.length}
          </h1>
          <div className="flex justify-center items-center gap-2">
            <div>
              <input
                type="text"
                placeholder="Search by product name"
                value={searchTerm}
                onChange={handleSearchChange}
                className="border w-[150px] sm:focus:w-[180px] md:focus:w-[230px] lg:focus:w-[250px] ease-in-out duration-300 rounded-md p-2"
              />
            </div>
            <Link to={"/dashboard/addProduct"}>
              <button className="bg-green-500 hover:bg-green-600 rounded-md px-4 py-1 text-white text-base sm:text-sm md:text-base lg:text-lg font-semibold">
                Add Products
              </button>
            </Link>
          </div>
        </div>
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <table className="min-w-full border-collapse table">
            <thead className="table-header-group bg-base-300">
              <tr className="border table-row">
                <th className="py-4 px-2 text-base text-center text-[#ACACAC] table-cell">
                  Name
                </th>
                <th className="py-4 px-2 text-base text-center text-[#ACACAC] table-cell">
                  Category
                </th>
                <th className="py-4 px-2 text-base text-center text-[#ACACAC] table-cell">
                  Brand
                </th>
                <th className="py-4 px-2 text-base text-center text-[#ACACAC] table-cell">
                  SKU
                </th>
                <th className="py-4 px-2 text-base text-center text-[#ACACAC] table-cell">
                  Inventories
                </th>
                <th className="py-4 px-2 text-base text-center text-[#ACACAC] table-cell">
                  is Active
                </th>
                <th className="py-4 px-2 text-base text-center text-[#ACACAC] table-cell">
                  is Featured
                </th>
                <th className="py-4 px-2 text-base text-center text-[#ACACAC] table-cell">
                  Price
                </th>
                <th className="py-4 px-2 text-base text-center text-[#ACACAC] table-cell">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="table-row-group">
              {currentProducts?.map((product) => (
                <tr
                  key={product?.product_id}
                  className="border-[3px] border-solid table-row cursor-pointer"
                  onClick={() =>
                    navigate(`/dashboard/inventories/${product.product_id}`)
                  }
                >
                  <td className="text-gray-800 table-cell text-center text-sm md:text-base lg:text-lg font-semibold">
                    {product?.product_name}
                  </td>
                  <td className="text-gray-600 table-cell text-center text-sm md:text-base lg:text-lg font-semibold">
                    {product?.category_name}
                  </td>
                  <td className="text-gray-600 table-cell text-center text-sm md:text-base lg:text-lg font-semibold">
                    {product?.brand_name}
                  </td>
                  <td className="text-gray-600 table-cell text-center text-sm md:text-base lg:text-lg font-semibold">
                    {product?.sku}
                  </td>
                  <td className="text-gray-600 table-cell text-center text-sm md:text-base lg:text-lg font-semibold">
                    {product?.inventory_count}
                  </td>
                  {/* Toggle isActive */}
                  <td className="text-center">
                    <button
                      className={`px-3 py-1 rounded-md ${
                        product.isActive
                          ? "bg-green-500 text-white"
                          : "bg-red-500 text-white"
                      }`}
                      onClick={() =>
                        handleToggleStatus(
                          product.product_id,
                          "isActive",
                          product.isActive
                        )
                      }
                    >
                      {product.isActive ? "Active" : "Inactive"}
                    </button>
                  </td>

                  {/* Toggle isFeatured */}
                  <td className="text-center">
                    <button
                      className={`px-3 py-1 rounded-md ${
                        product.isFeatured
                          ? "bg-green-500 text-white"
                          : "bg-gray-500 text-white"
                      }`}
                      onClick={() =>
                        handleToggleStatus(
                          product.product_id,
                          "isFeatured",
                          product.isFeatured
                        )
                      }
                    >
                      {product.isFeatured ? "Featured" : "Not Featured"}
                    </button>
                  </td>
                  <td className="text-gray-600 table-cell text-center text-sm md:text-base lg:text-lg font-semibold">
                    {product?.price}
                  </td>
                  <td className="flex md:space-x-2 max-lg:space-y-1 max-lg:items-center text-center justify-center">
                    <Link to={`/dashboard/updateProduct/${product.product_id}`}>
                      <button className="bg-yellow-500 text-white p-2 rounded-md hover:bg-yellow-600">
                        <FaEdit />
                      </button>
                    </Link>
                    <button
                      className="bg-red-600 text-white p-2 rounded-md hover:bg-red-700"
                      onClick={() => handleDelete(product.product_id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        <div className="mt-4 flex justify-center space-x-2">
          <button
            className={`px-3 py-1 flex items-center space-x-1 rounded-md ${
              currentPage === 1
                ? "bg-gray-400 text-gray-800 cursor-not-allowed"
                : "bg-gray-500 text-white hover:bg-red-500"
            }`}
            onClick={handlePrevious}
            disabled={currentPage === 1}
          >
            <FaChevronLeft />
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`px-3 py-1 rounded-md ${
                currentPage === index + 1
                  ? "bg-red-500 text-white"
                  : "bg-gray-500 text-white hover:bg-red-500"
              }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            className={`px-3 py-1 flex items-center space-x-1 rounded-md ${
              currentPage === totalPages
                ? "bg-gray-400 text-gray-800 cursor-not-allowed"
                : "bg-gray-500 text-white hover:bg-red-500"
            }`}
            onClick={handleNext}
            disabled={currentPage === totalPages}
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageProducts;
