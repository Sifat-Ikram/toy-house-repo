import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";

const ShoppingCart = () => {
  const [voucherCode, setVoucherCode] = useState("");
  const [discountedAmount, setDiscountedAmount] = useState(0);
  const [amounts, setAmounts] = useState({});
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  useEffect(() => {
    const initialAmounts = {};
    cart.forEach((item) => {
      initialAmounts[item.name] = 1;
    });
    setAmounts(initialAmounts);
    setDiscountedAmount(calculateTotalCost());
  }, [cart]);

  const incrementQuantity = (itemId) => {
    setAmounts((prevAmounts) => ({
      ...prevAmounts,
      [itemId]: (prevAmounts[itemId] || 0) + 1,
    }));
  };

  const decrementQuantity = (itemId) => {
    if (amounts[itemId] > 1) {
      setAmounts((prevAmounts) => ({
        ...prevAmounts,
        [itemId]: (prevAmounts[itemId] || 0) - 1,
      }));
    }
  };

  const calculateTotalCost = () => {
    let total = 0;
    cart.forEach((item) => {
      total += item.price * (amounts[item.name] || 0);
    });
    return total;
  };

  const handleDiscountVoucher = (voucherCode) => {
    let newDiscountedAmount = calculateTotalCost();
    if (voucherCode === "DISCOUNT100") {
      newDiscountedAmount -= 100;
    } else {
      alert("Invalid voucher code!");
    }
    setDiscountedAmount(newDiscountedAmount);
  };

  const handleDelete = (item) => {
    const updatedCart = cart.filter((cartItem) => cartItem._id !== item._id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  console.log(cart);
  
  

  return (
    <div className="w-11/12 mx-auto my-10">
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-5 text-left">
        Your Ordered Items
      </h1>
      <div className="flex flex-col sm:flex-row gap-8">
        {/* Cart Items */}
        <div className="lg:w-2/3 flex flex-col border-t-2">
          {cart?.length > 0 ? (
            cart.map((item) => (
              <div
                key={item.id}
                className="p-4 border-b-2 text-sm md:text-base lg:text-lg"
              >
                <div className="flex flex-col">
                  <p className="font-bold">Name: {item.name}</p>
                  <p className="font-semibold">Price: {item.price} Tk</p>
                </div>
                <div className="flex gap-4 items-center mt-2">
                  <h1 className="text-sm md:text-base font-semibold">
                    Quantity:
                  </h1>
                  <div className="flex items-center">
                    <button
                      onClick={() => decrementQuantity(item.name)}
                      className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold px-2 rounded-l"
                      disabled={amounts[item.name] <= 1}
                    >
                      -
                    </button>
                    <h1 className="mx-3 md:mx-5">{amounts[item.name]}</h1>
                    <button
                      onClick={() => incrementQuantity(item.name)}
                      className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold px-2 rounded-r"
                    >
                      +
                    </button>
                  </div>
                </div>
                <p className="font-bold mt-2">
                  Total: {item.price * (amounts[item.name] || 0)} Tk
                </p>
                <div className="flex justify-end mt-2">
                  <button
                    onClick={() => handleDelete(item)}
                    className="bg-red-700 hover:bg-red-900 rounded-md flex items-center gap-2 px-2 py-1 text-sm md:text-base font-semibold text-white"
                  >
                    <MdDelete className="text-xl md:text-2xl" />
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 py-5">
              Your cart is empty.
            </p>
          )}
        </div>

        {/* Order Summary */}
        <div className="lg:w-1/3 bg-gray-200 p-6 md:p-8 rounded-lg shadow-md">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-6">
            Order Summary
          </h2>
          <p className="text-sm md:text-base lg:text-lg mb-4">
            Total Cost: ${calculateTotalCost()}
          </p>
          <div className="mb-6">
            <label className="block mb-2 text-sm md:text-base">Voucher</label>
            <input
              type="text"
              placeholder="Enter discount voucher"
              className="border bg-white border-gray-300 p-2 rounded-md w-full text-sm md:text-base"
              value={voucherCode}
              onChange={(e) => setVoucherCode(e.target.value)}
            />
            <button
              onClick={() => handleDiscountVoucher(voucherCode)}
              className="buttons mt-3 w-full"
            >
              Apply Voucher
            </button>
          </div>
          <p className="text-sm md:text-base lg:text-lg mb-4">
            Total Amount: {discountedAmount !== 0 ? discountedAmount : calculateTotalCost()} Tk </p>
          <p className="text-sm md:text-base lg:text-lg font-bold mb-5">
            Payment Method
          </p>
          <div className="flex flex-col gap-3">
            <div className="flex justify-evenly items-center">
            <button className="buttons py-2 px-6 rounded-lg shadow-md hover:shadow-lg">
              Card
            </button>
            <button className="buttons py-2 px-4 rounded-lg shadow-md hover:shadow-lg">
              Bkash
            </button>
            <button className="buttons py-2 px-4 rounded-lg shadow-md hover:shadow-lg">
              Rocket
            </button>
            </div>
            <button className="buttons font-bold">Cash on Delivery</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
