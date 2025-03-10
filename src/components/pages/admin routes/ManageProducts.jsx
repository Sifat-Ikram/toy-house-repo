import { FaChevronLeft, FaChevronRight, FaTrash } from "react-icons/fa";
import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useProductDashboard from "../../hooks/useProductDashboard";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { debounce } from "lodash";
import Swal from "sweetalert2";
import FeaturedStatus from "./FeaturedStatus";

const ManageProducts = () => {
  const productsPerPage = 50;
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [products, productRefetch] = useProductDashboard();
  const [selectedProductId, setSelectedProductId] = useState(null);

  console.log(products);
  

  // Filter products based on search term
  const filteredProducts = useMemo(() => {
    const lowerSearch = searchTerm.toLowerCase();
    return searchTerm
      ? products.filter((product) =>
          product?.product_name.toLowerCase().includes(lowerSearch)
        )
      : products;
  }, [searchTerm, products]);

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
    const value = e.target.value;
    setSearchTerm(value); // Immediate update for real-time UI change
    debouncedSearch(value);
  };

  const debouncedSearch = debounce((value) => {
    setSearchTerm(value);
    setCurrentPage(1);
  }, 300);

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic
          .delete(`/api/v1/open/products/delete/${id}?request-id=1234`)
          .then((response) => {
            productRefetch();
            if (response.status === 200) {
              Swal.fire("Deleted!", "Product has been deleted.", "success");
            }
          })
          .catch((error) => {
            console.log(error.message);
            Swal.fire("Error!", "Something went wrong.", "error");
          });
      }
    });
  };

  const handleNext = () => {
    if (currentPage < totalPages && totalPages !== 0) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
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
                defaultValue={searchTerm}
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
        <div className="bg-white shadow-lg rounded-lg overflow-x-visible">
          <table className="min-w-full border-collapse table">
            <thead className="table-header-group bg-base-200">
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
                  <td className="text-gray-800 table-cell text-center text-sm md:text-base font-semibold">
                    <h1 className="line-clamp-2">{product?.product_name}</h1>
                  </td>
                  <td className="text-gray-600 table-cell text-center text-sm md:text-base font-semibold">
                    {product?.category_name}
                  </td>
                  <td className="text-gray-600 table-cell text-center text-sm md:text-base font-semibold">
                    {product?.brand_name}
                  </td>
                  <td className="text-gray-600 table-cell text-center text-sm md:text-base font-semibold">
                    {product?.sku}
                  </td>
                  <td className="text-gray-600 table-cell text-center text-sm md:text-base font-semibold">
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
                    >
                      {product.isActive ? "Active" : "Inactive"}
                    </button>
                  </td>

                  <td className="text-center">
                    <button
                      className={`px-3 py-1 text-nowrap rounded-md ${
                        product?.is_featured
                          ? "bg-green-500 text-white"
                          : "bg-gray-500 text-white"
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        document.getElementById("my_modal_3").showModal();
                        setSelectedProductId(product.product_id); // Store the clicked product_id
                      }}
                    >
                      {product?.is_featured ? "Featured" : "Not Featured"}
                    </button>
                    <FeaturedStatus id={selectedProductId} />
                  </td>

                  <td className="text-gray-600 table-cell text-center text-sm md:text-base lg:text-lg font-semibold">
                    {product?.price}
                  </td>
                  <td className="flex items-center text-center justify-center">
                    <button
                      className="bg-red-600 text-white p-2 rounded-md hover:bg-red-700"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(product.product_id);
                      }}
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
              currentPage === 1 || totalPages === 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gray-500 hover:bg-red-500"
            }`}
            onClick={handlePrevious}
            disabled={currentPage === 1 || totalPages === 0}
          >
            <FaChevronLeft />
          </button>

          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              className={`px-3 py-1 rounded-md ${
                currentPage === index + 1
                  ? "bg-red-500 text-white"
                  : "bg-gray-500 text-white hover:bg-red-500"
              }`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}

          <button
            className={`px-3 py-1 flex items-center space-x-1 rounded-md ${
              currentPage === totalPages || totalPages === 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gray-500 hover:bg-red-500"
            }`}
            onClick={handleNext}
            disabled={currentPage === totalPages || totalPages === 0}
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageProducts;
