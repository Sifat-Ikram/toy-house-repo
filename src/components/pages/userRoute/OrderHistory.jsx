import { useState } from "react";
import { motion } from "framer-motion";
import { GrNext, GrPrevious } from "react-icons/gr";

const OrderHistory = () => {
  const [filter, setFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 1;

  const orderHistory = {
    username: "JohnDoe123",
    orderedItems: [
      {
        id: "ORD123456",
        date: "2024-12-10",
        items: [
          {
            name: "Toy Car",
            quantity: 2,
            price: 10.99,
            image: "https://i.ibb.co/YPmMP54/toy-car.jpg",
          },
          {
            name: "Dollhouse",
            quantity: 1,
            price: 38.0,
            image: "https://i.ibb.co/YT2gwsS/dollhouse.jpg",
          },
        ],
        total: 59.99,
        status: "Delivered",
      },
      {
        id: "ORD123457",
        date: "2024-12-09",
        items: [
          {
            name: "Building Blocks",
            quantity: 1,
            price: 15.99,
            image: "https://i.ibb.co/5RkD7h3/building-blocks.jpg",
          },
          {
            name: "Stuffed Bear",
            quantity: 3,
            price: 8.5,
            image: "https://i.ibb.co/YdQsHxg/stuffed-bear.jpg",
          },
          {
            name: "Rubik's Cube",
            quantity: 2,
            price: 6.0,
            image: "https://i.ibb.co/WfQQ3F6/rubiks-cube.jpg",
          },
        ],
        total: 45.5,
        status: "Processing",
      },
      {
        id: "ORD123459",
        date: "2024-12-07",
        items: [
          {
            name: "RC Helicopter",
            quantity: 1,
            price: 50.99,
            image: "https://i.ibb.co/XZ5VRFB/rc-helicopter.jpg",
          },
          {
            name: "Lego City Set",
            quantity: 2,
            price: 30.0,
            image: "https://i.ibb.co/9nQmBZm/lego-city-set.jpg",
          },
          {
            name: "Action Figure",
            quantity: 1,
            price: 10.0,
            image: "https://i.ibb.co/djBtBpD/action-figure.jpg",
          },
        ],
        total: 120.99,
        status: "Delivered",
      },
      {
        id: "ORD123460",
        date: "2024-12-05",
        items: [
          {
            name: "Puzzle Set",
            quantity: 3,
            price: 9.5,
            image: "https://i.ibb.co/9mKPBfp/puzzle-set.jpg",
          },
          {
            name: "Board Game - Monopoly",
            quantity: 1,
            price: 25.0,
            image: "https://i.ibb.co/0yk5yt7/monopoly.jpg",
          },
          {
            name: "Toy Train Set",
            quantity: 1,
            price: 35.0,
            image: "https://i.ibb.co/k0F2dPC/toy-train-set.jpg",
          },
        ],
        total: 78.49,
        status: "Cancelled",
      },
    ],
  };

  const filteredOrders =
    filter === "All"
      ? orderHistory.orderedItems
      : orderHistory.orderedItems.filter((order) => order.status === filter);

  // Pagination logic
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const currentOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-center mb-6">
          Order History
        </h1>

        {/* Sorting Dropdown */}
        <div className="flex justify-start items-center mb-4">
          <label htmlFor="statusFilter" className="mr-2 text-lg font-medium">
            Filter by Status:
          </label>
          <select
            id="statusFilter"
            className="px-4 py-2 border rounded-md"
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value);
              setCurrentPage(1); // Reset to the first page on filter change
            }}
          >
            <option value="All">All</option>
            {[
              ...new Set(
                orderHistory?.orderedItems?.map((item) => item.status)
              ),
            ].map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        {/* Order List */}
        <div className="flex flex-col gap-5">
          {currentOrders.length === 0 ? (
            <div className="text-center text-gray-500">
              No orders found for the selected filter.
            </div>
          ) : (
            currentOrders.map((order) => (
              <motion.div
                key={order.id}
                className="card bg-white p-4"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">
                    Order ID: {order?.id}
                  </h2>
                  <span
                    className={`px-3 py-1 text-sm font-bold rounded-full ${
                      order.status === "Delivered"
                        ? "bg-green-100 text-green-700"
                        : order.status === "Processing"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {order?.status}
                  </span>
                </div>
                <p className="text-gray-600 mt-2">Date: {order.date}</p>
                <div className="grid grid-cols-1 gap-4 mt-4">
                  {order.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center border p-4 sm:p-2 md:p-4 gap-6"
                    >
                      <img
                        src={item?.image}
                        alt={item?.name}
                        className="w-12 md:w-16 lg:w-20 h-12 md:h-16 lg:h-20 object-cover rounded-lg border"
                      />
                      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center">
                        <h3 className="text-lg font-semibold">{item.name}</h3>
                        <p className="text-sm text-gray-600">
                          Quantity: {item?.quantity}
                        </p>
                        <p className="text-sm text-gray-600">
                          Price: {item?.price.toFixed(2)} Tk
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-left">
                  <p className="text-lg font-bold">
                    Total: {order?.total.toFixed(2)} Tk
                  </p>
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-end items-center mt-4">
            <button
              className="p-2 mx-1 border rounded-md bg-gray-200 hover:bg-red-500 hover:text-white"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <GrPrevious />
            </button>

            {/* Page Numbers */}
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                className={`px-2 py-1 mx-1 border rounded-md ${
                  currentPage === index + 1
                    ? "bg-red-500 text-white text-sm"
                    : "bg-gray-200 hover:bg-red-500 text-sm hover:text-white"
                }`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            ))}

            <button
              className="p-2 mx-1 border rounded-md bg-gray-200 hover:bg-red-500 hover:text-white"
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

export default OrderHistory;
