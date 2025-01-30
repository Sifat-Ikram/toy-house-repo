import { useState } from "react";

const CartProduct = ({ selectedProduct, discountedPrice, closeDrawer }) => {
  const [quantity, setQuantity] = useState(1);
  const [voucherCode, setVoucherCode] = useState("");
  const [voucherError, setVoucherError] = useState("");
  const [isVoucherApplied, setIsVoucherApplied] = useState(false);

  const handleQuantityChange = (event) => {
    const value = event.target.value;
    if (/^\d+$/.test(value)) {
      setQuantity(Math.max(1, Number(value)));
    }
  };

  const applyVoucher = () => {
    if (voucherCode === "DISCOUNT100") {
      setIsVoucherApplied(true);
      setVoucherError("");
    } else {
      setVoucherError("Invalid voucher code");
    }
  };

  const getTotalPrice = () => {
    const basePrice = discountedPrice * quantity;
    return isVoucherApplied ? basePrice - 100 : basePrice;
  };

  return (
    <div className="menu bg-gradient-to-b from-gray-100 to-white text-base-content min-h-full w-[400px] p-6 mt-20 rounded-lg shadow-lg border border-gray-200">
      <button
        onClick={closeDrawer}
        className="mb-1 h-8 w-8 text-white bg-[#f52e2e] focus:outline-none focus:ring-4 focus:ring-[#f52e2e] rounded-full p-1 transition-all duration-300 shadow-md z-50"
        aria-label="Close Drawer"
      >
        ✕
      </button>
      {selectedProduct && (
        <>
          <div className="border-b pb-3 mb-4">
            <h2 className="font-bold text-lg text-[#f52e2e] mb-2">
              {selectedProduct.name}
            </h2>
            <p className="text-base text-gray-600">
              Category: {selectedProduct.category}
            </p>
          </div>

          <div className="mb-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <label className="text-sm font-medium text-gray-700">
                Quantity:
              </label>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={handleQuantityChange}
                className="w-full sm:w-20 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f52e2e]"
              />
            </div>
          </div>

          <div className="mb-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <label className="text-sm font-medium text-gray-700">
                Voucher Code:
              </label>
              <input
                type="text"
                value={voucherCode}
                onChange={(e) => setVoucherCode(e.target.value)}
                className="w-full sm:w-32 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f52e2e]"
              />
            </div>
            <button
              onClick={applyVoucher}
              className="mt-3 font-medium text-white buttons w-full py-2 rounded-lg shadow-md hover:shadow-lg transition-all"
            >
              Apply Voucher
            </button>
            {voucherError && (
              <p className="text-red-500 text-sm mt-2">{voucherError}</p>
            )}
          </div>

          <div className="mb-4">
            <p className="text-lg font-semibold text-gray-800">
              Total Price:{" "}
              <span className="text-[#90BE32]">{getTotalPrice()} Tk</span>
            </p>
          </div>

          <div className="mt-1">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Payment Method
            </h3>
            <div className="flex flex-col gap-2">
              <div className="flex justify-center items-center gap-3">
                <button
                  onClick={() => {
                    setTimeout(() => {
                      closeDrawer();
                    }, 100); // Closes the drawer after 5 seconds
                  }}
                  className="buttons py-2 px-4 rounded-lg shadow-md hover:shadow-lg"
                >
                  Card
                </button>
                <button
                  onClick={() => {
                    setTimeout(() => {
                      closeDrawer();
                    }, 100); // Closes the drawer after 5 seconds
                  }}
                  className="buttons py-2 px-4 rounded-lg shadow-md hover:shadow-lg"
                >
                  Bkash
                </button>
                <button
                  onClick={() => {
                    setTimeout(() => {
                      closeDrawer();
                    }, 100); // Closes the drawer after 5 seconds
                  }}
                  className="buttons py-2 px-4 rounded-lg shadow-md hover:shadow-lg"
                >
                  Rocket
                </button>
              </div>
              <div className="text-center text-base font-bold text-gray-700">
                or
              </div>
              <button
                onClick={() => {
                  setTimeout(() => {
                    closeDrawer();
                  }, 100); // Closes the drawer after 5 seconds
                }}
                className="buttons w-full py-3 rounded-lg shadow-md hover:shadow-lg"
              >
                Cash on Delivery
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartProduct;
