import { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";

const CartPage = () => {
  const [carts, setCarts] = useState([
    {
      id: "CART001",
      customerName: "Alice Johnson",
      customerEmail: "alice.johnson@example.com",
      items: [
        {
          name: "Toy Car",
          category: "Vehicles",
          price: 20,
          quantity: 2,
          image: "https://via.placeholder.com/100",
        },
        {
          name: "Building Blocks Set",
          category: "Educational",
          price: 50,
          quantity: 1,
          image: "https://via.placeholder.com/100",
        },
      ],
    },
    {
      id: "CART002",
      customerName: "David Miller",
      customerEmail: "david.miller@example.com",
      items: [
        {
          name: "Action Figure",
          category: "Figures",
          price: 25,
          quantity: 3,
          image: "https://via.placeholder.com/100",
        },
        {
          name: "Puzzle Set",
          category: "Puzzles",
          price: 30,
          quantity: 2,
          image: "https://via.placeholder.com/100",
        },
      ],
    },
  ]);

  const handleDeleteCart = (cartId) => {
    const updatedCarts = carts.filter((cart) => cart.id !== cartId);
    setCarts(updatedCarts);
  };

  return (
    <div className="p-4 lg:p-8 bg-gray-50 min-h-screen">
      <h1 className="text-xl md:text-2xl lg:text-3xl font-bold mb-6 text-gray-800">
        Admin Cart Page
      </h1>

      {carts.map((cart) => (
        <div
          key={cart.id}
          className="p-4 md:p-6 mb-6 bg-white shadow-md rounded-lg border"
        >
          {/* Header with Customer Info */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-md md:text-lg font-semibold">
                {cart.customerName}
              </h2>
              <p className="text-sm md:text-base text-gray-500">
                {cart.customerEmail}
              </p>
            </div>
            <button
              onClick={() => handleDeleteCart(cart.id)}
              className="text-red-600 hover:text-red-800"
            >
              <AiOutlineDelete size={20} className="sm:w-6 sm:h-6" />
            </button>
          </div>

          {/* Items in a Flex Row Layout */}
          <div className="flex flex-col gap-4 md:flex-row md:flex-wrap">
            {cart.items.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-4 w-full md:w-[48%] lg:w-[31%] p-3 md:p-4 bg-gray-50 border rounded-lg shadow-sm"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded object-cover"
                />
                <div className="flex-grow text-sm md:text-base">
                  <h3 className="font-medium text-gray-800">{item.name}</h3>
                  <p className="text-gray-600">Category: {item.category}</p>
                  <p>Price: ${item.price.toFixed(2)}</p>
                  <p>Quantity: {item.quantity}</p>
                </div>
                <div className="text-sm md:text-base font-bold">
                  Total: ${(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartPage;
