import { useState } from "react";
import { MdDelete } from "react-icons/md";
import { GrPrevious, GrNext } from "react-icons/gr";
import { Link } from "react-router-dom";

const MyWishlist = () => {
  const userId = 1; // Example logged-in user ID
  const wishlists = [
    {
      id: 1,
      userId: 1,
      name: "Toy Car",
      image: "https://via.placeholder.com/100",
      price: "500 Tk",
      category: "Vehicles",
      brand: "Brand A",
      productId: "123",
    },
    {
      id: 2,
      userId: 1,
      name: "Doll House",
      image: "https://via.placeholder.com/100",
      price: "1200 Tk",
      category: "Toys",
      brand: "Brand B",
      productId: "456",
    },
    {
      id: 3,
      userId: 1,
      name: "Building Blocks",
      image: "https://via.placeholder.com/100",
      price: "700 Tk",
      category: "Educational",
      brand: "Brand C",
      productId: "789",
    },
    {
      id: 4,
      userId: 1,
      name: "Action Figure",
      image: "https://via.placeholder.com/100",
      price: "900 Tk",
      category: "Action",
      brand: "Brand D",
      productId: "012",
    },
    {
      id: 5,
      userId: 1,
      name: "Puzzle Set",
      image: "https://via.placeholder.com/100",
      price: "600 Tk",
      category: "Puzzle",
      brand: "Brand E",
      productId: "345",
    },
  ];

  const myWishlist = wishlists.filter((item) => item.userId === userId);

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const filteredWishlist = myWishlist.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredWishlist.length / itemsPerPage);
  const paginatedWishlist = filteredWishlist.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSearch = () => {
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const removeFromWishlist = (id) => {
    console.log(id); // Add removal logic here
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <h1 className="text-4xl font-extrabold text-center mb-7">My Wishlist</h1>
      <div className="flex justify-center mb-4">
        <input
          type="text"
          placeholder="Search your favorite toy"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 w-full md:w-1/3 rounded-l-lg border-2 focus:outline-none"
        />
        <button
          onClick={handleSearch}
          className="p-2 bg-gray-800 text-white rounded-r-lg font-bold hover:bg-gray-800"
        >
          Search
        </button>
      </div>
      <div className="bg-white shadow-xl rounded-lg p-4">
        {paginatedWishlist.length > 0 ? (
          <div className="flex flex-col gap-8">
            {paginatedWishlist.map((item) => (
              <Link
              to={`/productDetail/${item._id}`}
                key={item.id}
                className="border-2 rounded-lg shadow-lg p-6 flex gap-10 relative"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-32 h-32 object-cover rounded-lg"
                />
                <div className="flex-1 flex flex-col items-start space-y-1">
                  <h3 className="text-lg font-semibold cursor-pointer">
                    {item.name}
                  </h3>
                  <p className="text-gray-700">
                    <span className="font-medium">Price:</span> {item.price}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">Category:</span>{" "}
                    {item.category}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">Brand:</span> {item.brand}
                  </p>
                </div>
                <button
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                  onClick={() => removeFromWishlist(item.id)}
                >
                  <MdDelete size={24} />
                </button>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center">
            No items found in your wishlist.
          </p>
        )}
        {/* Pagination */}
        {filteredWishlist.length > itemsPerPage && (
          <div className="flex justify-end items-center mt-4">
            <button
              className={`p-2 mx-1 border rounded-md ${
                currentPage === 1
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-gray-200 hover:bg-red-500 hover:text-white"
              }`}
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <GrPrevious />
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                className={`px-2 py-1 mx-1 border rounded-md ${
                  currentPage === index + 1
                    ? "bg-red-500 text-white"
                    : "bg-gray-200 hover:bg-red-500 hover:text-white"
                }`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            ))}
            <button
              className={`p-2 mx-1 border rounded-md ${
                currentPage === totalPages
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-gray-200 hover:bg-red-500 hover:text-white"
              }`}
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <GrNext />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyWishlist;
