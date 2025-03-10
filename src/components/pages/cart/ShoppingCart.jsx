import { useContext, useMemo } from "react";
import { useState, useEffect } from "react";
import { MdCancel } from "react-icons/md";
import { FiMinus } from "react-icons/fi";
import { RxCross2, RxPlus } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import useCart from "../../hooks/useCart";
import { AuthContext } from "../../../provider/AuthProvider";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const ShoppingCart = ({ handleShowDrawer }) => {
  const { user } = useContext(AuthContext);
  const [existingCart, setExistingCart] = useState([]);
  const [isCheckoutLoading, setCheckoutLoading] = useState(false);
  const { cart, cartRefetch } = useCart();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  useEffect(() => {
    // Safely parse the stored cart on mount
    const storedCart = sessionStorage.getItem("cart");
    if (storedCart) {
      try {
        setExistingCart(JSON.parse(storedCart) || []);
      } catch (e) {
        console.error("Failed to parse cart from sessionStorage", e);
      }
    }

    // Sync cart with sessionStorage on storage change or focus
    const syncCart = () => {
      const storedCart = sessionStorage.getItem("cart");
      if (storedCart) {
        try {
          setExistingCart(JSON.parse(storedCart) || []);
        } catch (e) {
          console.error("Failed to parse cart during sync", e);
        }
      }
    };

    window.addEventListener("storage", syncCart);
    window.addEventListener("focus", syncCart);

    return () => {
      window.removeEventListener("storage", syncCart);
      window.removeEventListener("focus", syncCart);
    };
  }, []);

  useEffect(() => {
    if (existingCart.length > 0) {
      sessionStorage.setItem("cart", JSON.stringify(existingCart)); // Save to sessionStorage
    } else {
      sessionStorage.removeItem("cart"); // Remove cart if empty
    }
  }, [existingCart]);

  const handleRemove = (sku) => {
    const updatedCart = existingCart
      .map((cartEntry) => ({
        ...cartEntry,
        items: cartEntry.items.filter((item) => item.sku !== sku),
      }))
      .filter((cartEntry) => cartEntry.items.length > 0);

    setExistingCart(updatedCart);
  };

  const handleDeleteCart = async (sku) => {
    const updatedItems = cart.items.filter((item) => item.sku !== sku);

    // Create the formatted data to send to the backend
    const formattedData = {
      items: [
        ...updatedItems.map((item) => ({
          product_inventory_id: item.inventory_id,
          quantity: item.quantity,
        })),
      ],
    };
    try {
      const response = await axiosPublic.post(
        "/api/v1/open/calculate-bill?request-id=1234",
        formattedData,
        {
          headers: {
            Authorization: `Bearer ${user}`, // Adding the Bearer token to the headers
          },
        }
      );
      if (response) {
        cartRefetch();
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  const handleUserIncrease = async (sku) => {
    // Update the items in the cart: Increase quantity for matching SKU
    const updatedItems = cart.items.map((item) => {
      if (item.sku === sku) {
        return { ...item, quantity: item.quantity + 1 }; // Increase quantity by 1 if SKU matches
      }
      return item; // Keep the other items the same
    });

    // Create the formatted data to send to the backend
    const formattedData = {
      items: [
        ...updatedItems.map((item) => ({
          product_inventory_id: item.inventory_id,
          quantity: item.quantity,
        })),
      ],
    };

    try {
      const response = await axiosPublic.post(
        "/api/v1/open/calculate-bill?request-id=1234",
        formattedData,
        {
          headers: {
            Authorization: `Bearer ${user}`, // Adding the Bearer token to the headers
          },
        }
      );
      if (response) {
        cartRefetch();
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  const handleUserDecrease = async (sku) => {
    // Update the items in the cart: Decrease quantity for matching SKU but not less than 1
    const updatedItems = cart.items.map((item) => {
      if (item.sku === sku) {
        return { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }; // Decrease quantity by 1 if > 1
      }
      return item; // Keep the other items the same
    });

    // Create the formatted data to send to the backend
    const formattedData = {
      items: [
        ...updatedItems.map((item) => ({
          product_inventory_id: item.inventory_id,
          quantity: item.quantity,
        })),
      ],
    };

    try {
      const response = await axiosPublic.post(
        "/api/v1/open/calculate-bill?request-id=1234",
        formattedData,
        {
          headers: {
            Authorization: `Bearer ${user}`, // Adding the Bearer token to the headers
          },
        }
      );
      if (response) {
        cartRefetch();
      }
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };

  const handleIncrease = (sku) => {
    const updatedCart = existingCart.map((cartEntry) => ({
      ...cartEntry,
      items: cartEntry.items.map((item) =>
        item.sku === sku ? { ...item, quantity: item.quantity + 1 } : item
      ),
    }));

    setExistingCart(updatedCart);
  };

  const handleDecrease = (sku, quantity) => {
    if (quantity > 1) {
      const updatedCart = existingCart.map((cartEntry) => ({
        ...cartEntry,
        items: cartEntry.items.map((item) =>
          item.sku === sku ? { ...item, quantity: item.quantity - 1 } : item
        ),
      }));

      setExistingCart(updatedCart);
    }
  };

  const totalPrice = useMemo(() => {
    if (user) {
      return cart ? cart.sub_total : 0;
    } else {
      return existingCart.reduce((acc, cartEntry) => {
        return (
          acc +
          (cartEntry.items?.reduce(
            (subTotal, item) =>
              subTotal +
              (parseFloat(item.selling_price) || 0) * (item.quantity || 1),
            0
          ) || 0)
        );
      }, 0);
    }
  }, [user, cart, existingCart]);

  const handleCheckout = () => {
    if (user) {
      setCheckoutLoading(true);
      handleShowDrawer();
      // Simulate checkout process
      setTimeout(() => {
        navigate("/checkout");
      }, 1000);
    } else {
      if (!existingCart || existingCart.length === 0) {
        alert("Your cart is empty.");
        return;
      }
      const finalCart = {
        items: existingCart.flatMap((cartEntry) =>
          cartEntry.items.map(
            ({
              base_price,
              color_name,
              product_name,
              quantity,
              selling_price,
              sku,
            }) => ({
              base_price,
              color_name,
              product_name,
              quantity,
              selling_price,
              sku,
            })
          )
        ),
        request_id: "1234",
        sub_total: totalPrice,
      };

      sessionStorage.setItem("checkout", JSON.stringify(finalCart));
      localStorage.setItem("checkout", JSON.stringify(finalCart));

      setCheckoutLoading(true);
      handleShowDrawer();
      // Simulate checkout process
      setTimeout(() => {
        navigate("/checkout", { state: { cart: finalCart } });
      }, 1000);
    }
  };

  return (
    <div className="text-[#2F3132] dark:text-black dark:bg-white shadow w-full pb-5 bg-base-200 flex flex-col justify-between min-h-screen relative">
      <div>
        <div className="bg-[#FFFFFF] w-full p-3 flex justify-between items-center">
          <h1 className="text-xl font-poppins font-semibold">Cart</h1>
          <button
            className="bg-red-500 dark:bg-red-500 dark:text-white text-white w-7 h-7 flex items-center justify-center text-base rounded-full"
            onClick={handleShowDrawer}
          >
            <RxCross2 />
          </button>
        </div>

        {user ? (
          cart?.items.map((item) => (
            <div key={item.sku} className="relative">
              <div className="flex justify-between gap-1 mb-4 border-b py-3 px-2">
                <img
                  src={item.image_url || "/default-image.jpg"}
                  alt={item.product_name || "Product Image"}
                  className="w-[100px] h-[100px] sm:w-[138px] sm:h-[138px] rounded-[15px] bg-white"
                />
                <div className="flex flex-col flex-1 space-y-3 dark:text-black dark:bg-white">
                  <div className="flex justify-between gap-2">
                    <div className="flex flex-col px-5">
                      <h1 className="font-poppins text-lg font-semibold">
                        {item.product_name}
                      </h1>
                      <h1 className="text-base font-normal">
                        Color: {item?.color_name}
                      </h1>
                    </div>
                    <div>
                    <MdCancel
                      onClick={() => handleDeleteCart(item.sku)}
                      className="text-xl font-black text-red-500 dark:text-red-500 cursor-pointer"
                    />
                    </div>
                  </div>
                  <div className="flex justify-between items-center dark:text-black dark:bg-white">
                    <div className="bg-white rounded-full flex items-center gap-3 p-[2px]">
                      <h1
                        onClick={() => handleUserDecrease(item.sku)}
                        className="bg-base-200 dark:text-black dark:bg-white p-2 rounded-full text-lg md:text-2xl font-semibold cursor-pointer"
                      >
                        <FiMinus />
                      </h1>
                      <h1 className="font-poppins text-xl font-semibold">
                        {item.quantity}
                      </h1>
                      <h1
                        onClick={() => handleUserIncrease(item.sku)}
                        className="bg-base-200 dark:text-black dark:bg-white p-2 rounded-full text-lg md:text-2xl font-bold cursor-pointer"
                      >
                        <RxPlus />
                      </h1>
                    </div>
                    <h1 className="font-poppins text-base md:text-xl font-semibold">
                      BDT {(item.selling_price * item.quantity).toFixed(2)}
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : existingCart?.length > 0 ? (
          <div className="w-full flex flex-col h-full justify-between p-2">
            {existingCart?.map((cartEntry, index) => (
              <div key={index}>
                {cartEntry.items && cartEntry.items.length > 0 ? (
                  cartEntry.items.map((item) => (
                    <div
                      key={item.sku}
                      className="flex justify-center gap-4 mb-4 border-b pb-4"
                    >
                      <img
                        src={item.image_url || "/default-image.jpg"}
                        alt={item.product_name || "Product Image"}
                        className="w-[100px] h-[100px] sm:w-[138px] sm:h-[138px] rounded-[15px] bg-white"
                      />
                      <div className="flex flex-col flex-1 space-y-3 dark:text-black dark:bg-white">
                        <div className="flex justify-between gap-5 relative">
                          <div className="flex flex-col">
                            <h1 className="font-poppins text-lg font-semibold">
                              {item.product_name}
                            </h1>
                            <h1 className="text-base font-normal">
                              Color: {item?.color_name}
                            </h1>
                          </div>
                          <MdCancel
                            onClick={() => handleRemove(item.sku)}
                            className="absolute top-0 right-0 text-xl font-black text-red-500 dark:text-red-500 cursor-pointer"
                          />
                        </div>
                        <div className="flex justify-between items-center dark:text-black dark:bg-white">
                          <div className="bg-white rounded-full flex items-center gap-3 p-[2px]">
                            <h1
                              onClick={() =>
                                handleDecrease(item.sku, item.quantity)
                              }
                              className="bg-base-200 dark:text-black dark:bg-white p-2 rounded-full text-lg md:text-2xl font-semibold cursor-pointer"
                            >
                              <FiMinus />
                            </h1>
                            <h1 className="font-poppins text-xl font-semibold">
                              {item.quantity}
                            </h1>
                            <h1
                              onClick={() => handleIncrease(item.sku)}
                              className="bg-base-200 dark:text-black dark:bg-white p-2 rounded-full text-lg md:text-2xl font-bold cursor-pointer"
                            >
                              <RxPlus />
                            </h1>
                          </div>
                          <h1 className="font-poppins text-base md:text-xl font-semibold">
                            BDT{" "}
                            {(item.selling_price * item.quantity).toFixed(2)}
                          </h1>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div>No items in this cart entry.</div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <h2 className="text-lg font-semibold dark:text-black">
              Your cart is empty
            </h2>
          </div>
        )}
      </div>

      <div className="w-11/12 mx-auto bottom-0 dark:text-black dark:bg-white">
        <div className="space-y-[6px]">
          <h1 className="font-poppins text-xs font-semibold">
            Subtotal:{" "}
            <span className="text-[#787878] font-normal">
              (Shipping not Included)
            </span>
          </h1>
          <h1 className="font-poppins text-2xl md:text-4xl font-semibold">
            BDT {totalPrice.toFixed(2)}
          </h1>
        </div>
        <button
          onClick={handleCheckout}
          className="font-poppins text-lg font-semibold w-full buttons rounded-3xl mt-8"
        >
          {isCheckoutLoading ? "Processing..." : "Checkout"}
        </button>
      </div>
    </div>
  );
};

export default ShoppingCart;
