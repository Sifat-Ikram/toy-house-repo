import { useState } from "react";

const SidebarCart = ({ selectedProduct, discountedPrice }) => {
  const [amounts, setAmounts] = useState({
    [selectedProduct?.id]: 1, // Initialize with product ID and quantity 1
  });

  const incrementQuantity = (itemId) => {
    setAmounts((prevAmounts) => ({
      ...prevAmounts,
      [itemId]: (prevAmounts[itemId] || 0) + 1,
    }));
  };

  const decrementQuantity = (itemId) => {
    setAmounts((prevAmounts) => {
      const updatedAmount = (prevAmounts[itemId] || 1) - 1;
      return updatedAmount > 0
        ? { ...prevAmounts, [itemId]: updatedAmount }
        : prevAmounts; // Prevent negative quantity
    });
  };

  const currentQuantity = amounts[selectedProduct?.id] || 1;

  return (
    <div className="w-2/3 sm:w-1/2 lg:w-1/3 bg-base-300 p-6 pt-24 sm:pt-[90px] md:pt-16 lg:pt-[90px] shadow-md min-h-screen flex flex-col justify-between">
      <button
        onClick={() => document.getElementById("my-drawer-4").click()}
        className="rounded-full px-3 py-1 shadow bg-red-600 text-white absolute right-2 lg:right-6 md:top-16 lg:top-[90px]"
      >
        X
      </button>
      <h2 className="text-2xl md:text-3xl font-bold">Order Summary</h2>
      <div className="font-roboto md:space-y-2 lg:space-y-[6px]">
        <h1>
          <span className="text-base font-medium">Product:</span>{" "}
          {selectedProduct?.name}
        </h1>
        <h1 className="text-base">
          <span className="font-medium">Category:</span>{" "}
          {selectedProduct?.category?.name}
        </h1>
        <div className="flex gap-4 items-center mt-2">
          <h1 className="text-sm md:text-base font-medium">Quantity:</h1>
          <div className="flex items-center">
            <button
              onClick={() => decrementQuantity(selectedProduct?.id)}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold px-2 rounded-l"
              disabled={currentQuantity <= 1}
            >
              -
            </button>
            <h1 className="mx-3 md:mx-5">{currentQuantity}</h1>
            <button
              onClick={() => incrementQuantity(selectedProduct?.id)}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold px-2 rounded-r"
            >
              +
            </button>
          </div>
        </div>
        <p className="text-base">
          <span className="font-medium">Total Cost: </span>{" "}
          {parseFloat(currentQuantity * discountedPrice).toFixed(2)} Tk
        </p>
      </div>
      <div>
        <label className="block mb-2 text-base">Voucher</label>
        <input
          type="text"
          placeholder="Enter discount voucher"
          className="border bg-white border-gray-300 p-2 rounded-md w-full text-sm md:text-base"
          // value={voucherCode}
          // onChange={(e) => setVoucherCode(e.target.value)}
        />
        <button
          // onClick={() => handleDiscountVoucher(voucherCode)}
          className="buttons mt-3 w-full"
        >
          Apply Voucher
        </button>
      </div>
      <p className="text-lg">
        Total Amount:{" "}
        <span className="font-bold">
        {parseFloat(currentQuantity * discountedPrice).toFixed(2)} Tk
        </span>
      </p>
      <div className="flex flex-col gap-2">
        <p className="text-sm md:text-base lg:text-lg font-bold">
          Payment Method
        </p>
        <div className="flex flex-wrap justify-evenly items-center max-sm:gap-1">
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
  );
};

export default SidebarCart;
