import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { FaEye } from "react-icons/fa6";

const WishlistPage = () => {
  const ordersPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const wishlist = [
    {
      id: "WL001",
      userName: "Alice Johnson",
      email: "alice.johnson@example.com",
      wishlistItems: [
        {
          name: "Toy Car",
          category: "Vehicles",
          brand: "Hot Wheels",
          price: 20,
          image: "https://example.com/toy-car.jpg",
        },
        {
          name: "Building Blocks Set",
          category: "Educational",
          brand: "Lego",
          price: 50,
          image: "https://example.com/building-blocks.jpg",
        },
      ],
    },
    {
      id: "WL002",
      userName: "David Miller",
      email: "david.miller@example.com",
      wishlistItems: [
        {
          name: "Action Figure",
          category: "Figures",
          brand: "Hasbro",
          price: 25,
          image: "https://example.com/action-figure.jpg",
        },
        {
          name: "Puzzle Set",
          category: "Puzzles",
          brand: "Ravensburger",
          price: 30,
          image: "https://example.com/puzzle-set.jpg",
        },
        {
          name: "Remote-Controlled Helicopter",
          category: "Vehicles",
          brand: "Air Hogs",
          price: 60,
          image: "https://example.com/remote-helicopter.jpg",
        },
      ],
    },
    {
      id: "WL003",
      userName: "Emily Clark",
      email: "emily.clark@example.com",
      wishlistItems: [
        {
          name: "Doll House",
          category: "Dolls",
          brand: "Barbie",
          price: 120,
          image: "https://example.com/doll-house.jpg",
        },
        {
          name: "Toy Kitchen Set",
          category: "Roleplay",
          brand: "KidKraft",
          price: 70,
          image: "https://example.com/kitchen-set.jpg",
        },
      ],
    },
    {
      id: "WL004",
      userName: "Michael Lee",
      email: "michael.lee@example.com",
      wishlistItems: [
        {
          name: "Remote-Controlled Car",
          category: "Vehicles",
          brand: "Traxxas",
          price: 90,
          image: "https://example.com/rc-car.jpg",
        },
        {
          name: "Board Game",
          category: "Games",
          brand: "Hasbro",
          price: 40,
          image: "https://example.com/board-game.jpg",
        },
      ],
    },
    {
      id: "WL005",
      userName: "Sophia Martinez",
      email: "sophia.martinez@example.com",
      wishlistItems: [
        {
          name: "Plush Teddy Bear",
          category: "Soft Toys",
          brand: "Build-A-Bear",
          price: 25,
          image: "https://example.com/teddy-bear.jpg",
        },
        {
          name: "Musical Keyboard",
          category: "Musical Toys",
          brand: "Fisher-Price",
          price: 30,
          image: "https://example.com/musical-keyboard.jpg",
        },
      ],
    },
    {
      id: "WL006",
      userName: "Lucas Wilson",
      email: "lucas.wilson@example.com",
      wishlistItems: [
        {
          name: "Train Set",
          category: "Vehicles",
          brand: "Thomas & Friends",
          price: 80,
          image: "https://example.com/train-set.jpg",
        },
        {
          name: "Arts and Crafts Kit",
          category: "Art Supplies",
          brand: "Crayola",
          price: 25,
          image: "https://example.com/art-crafts.jpg",
        },
        {
          name: "Building Robots Kit",
          category: "Educational",
          brand: "Wonder Workshop",
          price: 100,
          image: "https://example.com/robot-kit.jpg",
        },
      ],
    },
    {
      id: "WL007",
      userName: "Liam Evans",
      email: "liam.evans@example.com",
      wishlistItems: [
        {
          name: "Race Track Set",
          category: "Vehicles",
          brand: "Hot Wheels",
          price: 40,
          image: "https://example.com/race-track.jpg",
        },
      ],
    },
    {
      id: "WL008",
      userName: "Olivia Garcia",
      email: "olivia.garcia@example.com",
      wishlistItems: [
        {
          name: "Doll Collection",
          category: "Dolls",
          brand: "American Girl",
          price: 150,
          image: "https://example.com/doll-collection.jpg",
        },
      ],
    },
    {
      id: "WL009",
      userName: "Ethan Harris",
      email: "ethan.harris@example.com",
      wishlistItems: [
        {
          name: "Stuffed Animal Set",
          category: "Soft Toys",
          brand: "Melissa & Doug",
          price: 40,
          image: "https://example.com/stuffed-animals.jpg",
        },
        {
          name: "Robot Toy",
          category: "Electronics",
          brand: "Sphero",
          price: 100,
          image: "https://example.com/robot-toy.jpg",
        },
      ],
    },
    {
      id: "WL010",
      userName: "Mia Carter",
      email: "mia.carter@example.com",
      wishlistItems: [
        {
          name: "Toy Kitchen Set",
          category: "Roleplay",
          brand: "KidKraft",
          price: 70,
          image: "https://example.com/kitchen-set.jpg",
        },
        {
          name: "Toy Drum Set",
          category: "Musical Toys",
          brand: "VTech",
          price: 50,
          image: "https://example.com/drum-set.jpg",
        },
        {
          name: "Action Figure Collection",
          category: "Figures",
          brand: "Hasbro",
          price: 120,
          image: "https://example.com/figure-collection.jpg",
        },
      ],
    },
  ];

  const totalPages = Math.ceil(wishlist.length / ordersPerPage);

  const currentList = wishlist.slice(
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
          Customer's Wishlist
        </h1>
        <div className="flex justify-between gap-3 items-center mt-10 mb-2">
          <h1 className="text-base sm:text-sm md:text-base lg:text-lg font-semibold">
            <span>Total Items : </span> {wishlist.length}
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
                  Actions
                </th>
                <th className="p-2 text-center text-gray-600 table-cell">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="table-row-group">
              {currentList.map((listItem, index) => (
                <tr key={listItem.id} className="border border-none table-row">
                  <td className="px-2 sm:px-[0px] md:px-2 py-5 table-content sm:hidden md:flex justify-center items-center">
                    {index + 1}
                  </td>
                  <td className="px-2 sm:px-[0px] md:px-2 py-5 text-gray-800 table-cell text-center">
                    {listItem.userName}
                  </td>
                  <td className="px-2 sm:px-[0px] md:px-2 py-5 flex-wrap text-gray-600 table-content sm:table-cell text-center">
                    {listItem.email}
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
                            Wishlist Items
                          </h1>
                        </div>

                        {/* Order Items */}
                        <div className="space-y-6">
                          {listItem?.wishlistItems.map((orderedItem) => (
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
                      onClick={() => handleDelete(listItem.id)}
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

export default WishlistPage;
