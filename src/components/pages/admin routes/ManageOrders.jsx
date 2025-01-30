import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { FaEye } from "react-icons/fa6";

const ManageOrders = () => {
  const ordersPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const orders = [
    {
      id: "ORD001",
      userName: "Alice Brown",
      email: "alice.brown@example.com",
      totalPrice: "$120",
      items: [
        {
          name: "Toy Car",
          quantity: 2,
          price: "$30",
          brand: "Speedster",
          category: "Vehicles",
        },
        {
          name: "Puzzle Set",
          quantity: 1,
          price: "$60",
          brand: "BrainyPlay",
          category: "Puzzles",
        },
      ],
    },
    {
      id: "ORD002",
      userName: "John Smith",
      email: "john.smith@example.com",
      totalPrice: "$135",
      items: [
        {
          name: "Building Blocks",
          quantity: 1,
          price: "$45",
          brand: "BlockMaster",
          category: "Construction",
        },
        {
          name: "Toy Robot",
          quantity: 2,
          price: "$90",
          brand: "RoboTech",
          category: "Electronics",
        },
      ],
    },
    {
      id: "ORD003",
      userName: "Emily Davis",
      email: "emily.davis@example.com",
      totalPrice: "$210",
      items: [
        {
          name: "Doll House",
          quantity: 1,
          price: "$75",
          brand: "DreamWorld",
          category: "Dolls",
        },
        {
          name: "Action Figures",
          quantity: 3,
          price: "$45",
          brand: "HeroPlay",
          category: "Figures",
        },
        {
          name: "Lego Set",
          quantity: 2,
          price: "$90",
          brand: "Lego",
          category: "Construction",
        },
      ],
    },
    {
      id: "ORD004",
      userName: "Michael Johnson",
      email: "michael.johnson@example.com",
      totalPrice: "$300",
      items: [
        {
          name: "Toy Train",
          quantity: 1,
          price: "$80",
          brand: "ChooChooCo",
          category: "Vehicles",
        },
        {
          name: "Stuffed Animals",
          quantity: 2,
          price: "$50",
          brand: "CuddleZoo",
          category: "Plush Toys",
        },
        {
          name: "Remote Control Car",
          quantity: 1,
          price: "$100",
          brand: "Speedster",
          category: "Electronics",
        },
        {
          name: "Drawing Kit",
          quantity: 2,
          price: "$70",
          brand: "CreativeStart",
          category: "Arts & Crafts",
        },
      ],
    },
    {
      id: "ORD005",
      userName: "Sophia Garcia",
      email: "sophia.garcia@example.com",
      totalPrice: "$65",
      items: [
        {
          name: "Board Game",
          quantity: 1,
          price: "$35",
          brand: "FunTime",
          category: "Games",
        },
        {
          name: "Coloring Book Set",
          quantity: 2,
          price: "$30",
          brand: "CreativeStart",
          category: "Arts & Crafts",
        },
      ],
    },
    {
      id: "ORD006",
      userName: "Daniel Lee",
      email: "daniel.lee@example.com",
      totalPrice: "$185",
      items: [
        {
          name: "Science Kit",
          quantity: 1,
          price: "$85",
          brand: "EduPlay",
          category: "Educational",
        },
        {
          name: "Play Tent",
          quantity: 1,
          price: "$70",
          brand: "AdventureKids",
          category: "Outdoor Play",
        },
        {
          name: "Toy Doctor Set",
          quantity: 2,
          price: "$30",
          brand: "HealthyKids",
          category: "Role Play",
        },
      ],
    },
    {
      id: "ORD007",
      userName: "Olivia Martinez",
      email: "olivia.martinez@example.com",
      totalPrice: "$240",
      items: [
        {
          name: "Kitchen Play Set",
          quantity: 1,
          price: "$100",
          brand: "DreamWorld",
          category: "Role Play",
        },
        {
          name: "Wooden Blocks",
          quantity: 3,
          price: "$75",
          brand: "ClassicToys",
          category: "Construction",
        },
        {
          name: "Electric Race Track",
          quantity: 1,
          price: "$65",
          brand: "Speedster",
          category: "Electronics",
        },
      ],
    },
    {
      id: "ORD008",
      userName: "James Wilson",
      email: "james.wilson@example.com",
      totalPrice: "$295",
      items: [
        {
          name: "Robot Kit",
          quantity: 1,
          price: "$120",
          brand: "RoboTech",
          category: "Electronics",
        },
        {
          name: "Plush Toy Collection",
          quantity: 3,
          price: "$75",
          brand: "CuddleZoo",
          category: "Plush Toys",
        },
        {
          name: "Crayons Box",
          quantity: 2,
          price: "$30",
          brand: "CreativeStart",
          category: "Arts & Crafts",
        },
        {
          name: "RC Helicopter",
          quantity: 1,
          price: "$70",
          brand: "Speedster",
          category: "Electronics",
        },
      ],
    },
  ];

  const totalPages = Math.ceil(orders.length / ordersPerPage);

  const currentOrders = orders.slice(
    (currentPage - 1) * ordersPerPage,
    currentPage * ordersPerPage
  );

  const handleDelete = (orderId) => {
    alert(`Order ${orderId} has been deleted.`);
  };

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="px-1 py-5 sm:px-[6px] md:px-3 lg:px-6 bg-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center">
          Manage Orders
        </h1>
        <div className="flex justify-between gap-3 items-center mt-10 mb-2">
          <h1 className="text-base sm:text-sm md:text-base lg:text-lg font-semibold">
            <span>Total Orders : </span> {orders.length}
          </h1>
        </div>
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <table className="min-w-full border-collapse table">
            <thead className="table-header-group">
              <tr className="border table-row">
                <th className="p-2 text-center text-gray-600 table-content sm:hidden md:table-cell"></th>
                <th className="p-2 text-center text-gray-600 table-cell">
                  Name
                </th>
                <th className="p-2 text-center text-gray-600 table-content sm:table-cell">
                  Email
                </th>
                <th className="p-2 text-center text-gray-600 table-cell">
                  Total Price
                </th>
                <th className="p-2 text-center text-gray-600 table-cell">
                  Actions
                </th>
                <th className="p-2 text-center text-gray-600 table-cell">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="table-row-group">
              {currentOrders.map((order, index) => (
                <tr key={order.id} className="border border-none table-row">
                  <td className="px-2 sm:px-[0px] md:px-2 py-5 table-content sm:hidden md:flex justify-center items-center">
                    {index + 1}
                  </td>
                  <td className="px-2 sm:px-[0px] md:px-2 py-5 text-gray-800 table-cell text-center">
                    {order.userName}
                  </td>
                  <td className="px-2 sm:px-[0px] md:px-2 py-5 flex-wrap text-gray-600 table-content sm:table-cell text-center">
                    {order.email}
                  </td>
                  <td className="px-2 sm:px-[0px] md:px-2 py-5 text-gray-600 table-cell text-center">
                    {order.totalPrice}
                  </td>
                  <td className="px-2 sm:px-[0px] md:px-2 py-5 table-cell text-center justify-center">
                    <button
                      onClick={() =>
                        document.getElementById("my_modal_3").showModal()
                      }
                      className="bg-yellow-500 text-white p-2 rounded-md hover:bg-yellow-600"
                    >
                      <FaEye />
                    </button>
                    <dialog id="my_modal_3" className="modal">
                      <div className="modal-box max-w-4xl p-8 rounded-lg shadow-lg relative">
                        {/* Close Button */}
                        <form
                          method="dialog"
                          className="absolute right-4 top-4"
                        >
                          <button className="btn btn-sm btn-circle bg-red-500 hover:bg-red-600 text-white hover:text-white btn-ghost hover:scale-110 transition-transform duration-200">
                            ✕
                          </button>
                        </form>

                        {/* Modal Header */}
                        <div className="text-center mb-8">
                          <h1 className="text-2xl lg:text-3xl font-bold tracking-wide leading-tight">
                            Order Details
                          </h1>
                        </div>

                        {/* Order Items */}
                        <div className="space-y-6">
                          {order?.items.map((orderedItem) => (
                            <div
                              key={orderedItem.name}
                              className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 py-4 border-b"
                            >
                              {/* Image Section */}
                              <div className="w-28 h-28 lg:w-32 lg:h-32 flex-shrink-0 rounded-lg overflow-hidden shadow">
                                <img
                                  src={orderedItem?.image}
                                  alt={orderedItem?.name}
                                  className="w-full h-full object-contain"
                                />
                              </div>

                              {/* Item Details */}
                              <div className="flex-grow flex flex-wrap gap-8 lg:gap-16 text-base lg:text-lg">
                                <div className="flex items-center gap-2">
                                  <strong>Name:</strong>
                                  <span>{orderedItem?.name}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <strong>Category:</strong>
                                  <span>{orderedItem?.category}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <strong>Brand:</strong>
                                  <span>{orderedItem?.brand}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <strong>Quantity:</strong>
                                  <span>{orderedItem?.quantity}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <strong>Price:</strong>
                                  <span>{orderedItem?.price}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </dialog>
                  </td>
                  <td className="px-2 sm:px-[0px] md:px-2 py-5 table-cell text-center justify-center">
                    <button
                      className="bg-red-600 text-white p-2 rounded-md hover:bg-red-700"
                      onClick={() => handleDelete(order.id)}
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
        </div>
      </div>
    </div>
  );
};

export default ManageOrders;
