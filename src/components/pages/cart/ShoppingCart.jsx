import { useContext, useMemo } from "react";
import { useState, useEffect } from "react";
import { MdCancel } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { FiMinus } from "react-icons/fi";
import { RxPlus } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import useCart from "../../hooks/useCart";
import { AuthContext } from "../../../provider/AuthProvider";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";

const ShoppingCart = ({ handleShowDrawer }) => {
  const { user } = useContext(AuthContext);
  const [existingCart, setExistingCart] = useState([]);
  const [isCheckoutLoading, setCheckoutLoading] = useState(false);
  const { cart, cartRefetch } = useCart();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  useEffect(() => {
    // Safely parse the stored cart on mount
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      try {
        setExistingCart(JSON.parse(storedCart) || []);
      } catch (e) {
        console.error("Failed to parse cart from sessionStorage", e);
      }
    }

    // Sync cart with sessionStorage on storage change or focus
    const syncCart = () => {
      const storedCart = localStorage.getItem("cart");
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
      localStorage.setItem("cart", JSON.stringify(existingCart));
    } else {
      localStorage.removeItem("cart"); // Remove cart if empty
    }
  }, [existingCart]);

  const handleRemove = (inventory_id) => {
    const updatedCart = existingCart
      .map((cartEntry) => ({
        ...cartEntry,
        items: cartEntry.items.filter(
          (item) => item.inventory_id !== inventory_id
        ),
      }))
      .filter((cartEntry) => cartEntry.items.length > 0);

    setExistingCart(updatedCart);

    // Remove from localStorage and sessionStorage
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleDeleteCart = async (inventory_id) => {
    const updatedItems = cart.items.filter(
      (item) => item.inventory_id !== inventory_id
    );

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

  const handleUserIncrease = async (inventory_id) => {
    // Update the items in the cart: Increase quantity for matching inventory_id
    const updatedItems = cart.items.map((item) => {
      if (item.inventory_id === inventory_id) {
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

  const handleUserDecrease = async (inventory_id) => {
    // Update the items in the cart: Decrease quantity for matching inventory_id but not less than 1
    const updatedItems = cart.items.map((item) => {
      if (item.inventory_id === inventory_id) {
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

  const handleIncrease = (inventory_id) => {
    console.log(inventory_id);

    const updatedCart = existingCart.map((cartEntry) => ({
      ...cartEntry,
      items: cartEntry.items.map((item) =>
        item.inventory_id === inventory_id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ),
    }));

    setExistingCart(updatedCart);

    // Update localStorage with the new cart
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleDecrease = (inventory_id, quantity) => {
    if (quantity > 1) {
      const updatedCart = existingCart.map((cartEntry) => ({
        ...cartEntry,
        items: cartEntry.items.map((item) =>
          item.inventory_id === inventory_id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        ),
      }));

      setExistingCart(updatedCart);

      // Update localStorage with the new cart
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  };

  const totalPrice = useMemo(() => {
    if (user) {
      return cart ? cart.sub_total : 0;
    } else {
      return existingCart?.reduce((acc, cartEntry) => {
        return (
          acc +
          (cartEntry?.items?.reduce(
            (subTotal, item) =>
              subTotal +
              (parseFloat(item.selling_price) || 0) * (item.quantity || 1),
            0
          ) || 0)
        );
      }, 0);
    }
  }, [user, cart, existingCart]);

  const handleCheckout = async () => {
    if (user) {
      if (!cart || cart.length === 0) {
        Swal.fire({
          toast: true,
          position: "top-start",
          icon: "error",
          title: "Your cart is empty",
          showConfirmButton: false,
          timer: 3000,
        });
        return; // Prevent the order from being submitted
      }
      setCheckoutLoading(true);
      handleShowDrawer();
      // Simulate checkout process
      setTimeout(() => {
        navigate("/checkout");
      }, 1000);
    } else {
      if (!existingCart || existingCart.length === 0) {
        Swal.fire({
          toast: true,
          position: "top-start",
          icon: "error",
          title: "Your cart is empty",
          showConfirmButton: false,
          timer: 3000,
        });
        return;
      }

      const formattedData = {
        items: existingCart.flatMap((cartItem) =>
          cartItem.items.map((item) => ({
            product_inventory_id: item.inventory_id,
            quantity: item.quantity,
          }))
        ),
      };

      try {
        const response = await axiosPublic.post(
          "/api/v1/open/calculate-bill?request-id=1234",
          formattedData
        );
        if (response.status === 200) {
          const responseData = response?.data;
          const updatedCart = [responseData];
          localStorage.setItem("checkout", JSON.stringify(updatedCart));
          setCheckoutLoading(true);
          handleShowDrawer();
          navigate("/checkout");
          window.location.reload();
        }
      } catch (error) {
        console.error("Error adding product to cart:", error);
      }
    }
  };

  return (
    <div className="text-[#2F3132] dark:text-black dark:bg-white shadow w-full h-screen bg-base-200 flex flex-col justify-between">
      <div className="bg-[#FFFFFF] z-10 sticky top-0 w-full p-3 flex justify-between items-center">
        <h1 className="text-xl font-poppins font-semibold">Cart</h1>
        <button
          className="text-black dark:text-black flex items-center justify-center text-2xl"
          onClick={handleShowDrawer}
        >
          <RxCross2 />
        </button>
      </div>
      <div className="overflow-y-auto h-full">
        {user ? (
          cart.length === 0 ? (
            <div className="text-center py-10">
              <h2 className="text-lg font-semibold dark:text-black">
                Your cart is empty
              </h2>
            </div>
          ) : (
            cart?.items?.map((item) => (
              <div
                key={item.inventory_id}
                className="flex justify-start flex-col"
              >
                <div className="flex justify-between gap-1 border-b py-2 px-1 md::px-[10px]">
                  <img
                    src={item.image_url || "/default-image.jpg"}
                    alt={item.product_name || "Product Image"}
                    className="w-[100px] h-[100px] sm:w-[138px] sm:h-[138px] rounded-[15px] bg-white"
                  />
                  <div className="flex flex-col flex-1 space-y-3 dark:text-black dark:bg-white">
                    <div className="flex justify-between gap-2">
                      <div className="flex flex-col md:px-2">
                        <h1 className="font-poppins text-sm md:text-lg line-clamp-2 font-semibold">
                          {item.product_name}
                        </h1>
                        <h1 className="text-xs md:text-base font-normal">
                          Color: {item?.color_name}
                        </h1>
                      </div>
                      <div>
                        <MdCancel
                          onClick={() => handleDeleteCart(item.inventory_id)}
                          className="text-xl font-black text-red-500 dark:text-red-500 cursor-pointer"
                        />
                      </div>
                    </div>
                    <div className="px-2 flex justify-between items-center dark:text-black dark:bg-white">
                      <div className="bg-white rounded-full flex items-center gap-3 p-[2px]">
                        <h1
                          onClick={() => handleUserDecrease(item.inventory_id)}
                          className="bg-base-200 dark:text-black dark:bg-white p-[4px] md:p-2 rounded-full text-base md:text-2xl font-semibold cursor-pointer"
                        >
                          <FiMinus />
                        </h1>
                        <h1 className="font-poppins text-base md:text-xl font-semibold">
                          {item.quantity}
                        </h1>
                        <h1
                          onClick={() => handleUserIncrease(item.inventory_id)}
                          className="bg-base-200 dark:text-black dark:bg-white p-[4px] md:p-2 rounded-full text-base md:text-2xl font-bold cursor-pointer"
                        >
                          <RxPlus />
                        </h1>
                      </div>
                      <h1 className="font-poppins text-sm md:text-xl font-semibold">
                        BDT {(item.selling_price * item.quantity).toFixed(2)}
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )
        ) : existingCart?.length > 0 ? (
          <div>
            {existingCart?.map((cartEntry, index) => (
              <div key={index} className="flex justify-start flex-col">
                {cartEntry.items && cartEntry.items.length > 0
                  ? cartEntry.items.map((item) => (
                      <div
                        key={item.inventory_id}
                        className="flex justify-between gap-1 border-b py-2 px-1 md::px-[10px]"
                      >
                        <img
                          src={item.image_url || "/default-image.jpg"}
                          alt={item.product_name || "Product Image"}
                          className="w-[100px] h-[100px] sm:w-[138px] sm:h-[138px] rounded-[15px] bg-white"
                        />
                        <div className="flex flex-col flex-1 space-y-3 dark:text-black dark:bg-white">
                          <div className="flex justify-between gap-2">
                            <div className="flex flex-col md:px-2">
                              <h1 className="font-poppins text-sm md:text-lg line-clamp-2 font-semibold">
                                {item.product_name}
                              </h1>
                              <h1 className="text-[10px] md:text-base font-normal">
                                Color: {item?.color_name}
                              </h1>
                            </div>
                            <div>
                              <MdCancel
                                onClick={() => handleRemove(item.inventory_id)}
                                className="text-xl font-black text-red-500 dark:text-red-500 cursor-pointer"
                              />
                            </div>
                          </div>
                          <div className="px-2 flex justify-between items-center dark:text-black dark:bg-white">
                            <div className="bg-white rounded-full flex items-center gap-3 p-[2px]">
                              <h1
                                onClick={() =>
                                  handleDecrease(
                                    item?.inventory_id,
                                    item.quantity
                                  )
                                }
                                className="bg-base-200 dark:text-black dark:bg-white p-[4px] md:p-2 rounded-full text-base md:text-2xl font-semibold cursor-pointer"
                              >
                                <FiMinus />
                              </h1>
                              <h1 className="font-poppins text-base md:text-xl font-semibold">
                                {item.quantity}
                              </h1>
                              <h1
                                onClick={() =>
                                  handleIncrease(item.inventory_id)
                                }
                                className="bg-base-200 dark:text-black dark:bg-white p-[4px] md:p-2 rounded-full text-base md:text-2xl font-bold cursor-pointer"
                              >
                                <RxPlus />
                              </h1>
                            </div>
                            <h1 className="font-poppins text-sm md:text-xl font-semibold">
                              BDT{" "}
                              {(item.selling_price * item.quantity).toFixed(2)}
                            </h1>
                          </div>
                        </div>
                      </div>
                    ))
                  : null}
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

      <div className="sticky bottom-0 w-full bg-white dark:bg-white shadow-lg">
        <div className="w-11/12 mx-auto py-3 md:py-5 space-y-3 md:space-y-5">
          <div className="space-y-1 md:space-y-[6px]">
            <h1 className="font-poppins text-sm font-semibold">
              Subtotal:{" "}
              <span className="text-[#787878] font-normal">
                (Shipping not Included)
              </span>
            </h1>
            <h1 className="font-poppins text-lg md:text-4xl font-semibold">
              BDT {totalPrice?.toFixed(2) || 0}
            </h1>
          </div>
          <button
            onClick={handleCheckout}
            className="font-poppins text-sm md:text-lg font-semibold w-full mb-[2px] max-md:py-[6px] buttons rounded-3xl"
          >
            {isCheckoutLoading ? "Processing..." : "Checkout"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
