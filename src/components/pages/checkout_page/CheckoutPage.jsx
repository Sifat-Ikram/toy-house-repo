import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../provider/AuthProvider";
import useCart from "../../hooks/useCart";
import useUserProfile from "../../hooks/useUserProfile";

const CheckoutPage = () => {
  const defaultShippingCost = 0;
  const navigate = useNavigate();
  const { cart } = useCart();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [existingCart, setExistingCart] = useState({});
  const [shippingCost, setShippingCost] = useState(defaultShippingCost);
  const axiosPublic = useAxiosPublic();
  const cities = [
    { id: 1, city_name: "Bagerhat" },
    { id: 2, city_name: "Bandarban" },
    { id: 3, city_name: "Barguna" },
    { id: 4, city_name: "Barishal" },
    { id: 5, city_name: "Bhola" },
    { id: 6, city_name: "Bogura" },
    { id: 7, city_name: "Brahmanbaria" },
    { id: 8, city_name: "Chandpur" },
    { id: 9, city_name: "Chattogram" },
    { id: 10, city_name: "Chuadanga" },
    { id: 11, city_name: "Cox's Bazar" },
    { id: 12, city_name: "Cumilla" },
    { id: 13, city_name: "Dhaka" },
    { id: 14, city_name: "Dinajpur" },
    { id: 15, city_name: "Faridpur" },
    { id: 16, city_name: "Feni" },
    { id: 17, city_name: "Gaibandha" },
    { id: 18, city_name: "Gazipur" },
    { id: 19, city_name: "Gopalganj" },
    { id: 20, city_name: "Habiganj" },
    { id: 21, city_name: "Jamalpur" },
    { id: 22, city_name: "Jashore" },
    { id: 23, city_name: "Jhalokathi" },
    { id: 24, city_name: "Jhenaidah" },
    { id: 25, city_name: "Joypurhat" },
    { id: 26, city_name: "Khagrachhari" },
    { id: 27, city_name: "Khulna" },
    { id: 28, city_name: "Kishoreganj" },
    { id: 29, city_name: "Kurigram" },
    { id: 30, city_name: "Kushtia" },
    { id: 31, city_name: "Lakshmipur" },
    { id: 32, city_name: "Lalmonirhat" },
    { id: 33, city_name: "Madaripur" },
    { id: 34, city_name: "Magura" },
    { id: 35, city_name: "Manikganj" },
    { id: 36, city_name: "Meherpur" },
    { id: 37, city_name: "Moulvibazar" },
    { id: 38, city_name: "Munshiganj" },
    { id: 39, city_name: "Mymensingh" },
    { id: 40, city_name: "Naogaon" },
    { id: 41, city_name: "Narail" },
    { id: 42, city_name: "Narayanganj" },
    { id: 43, city_name: "Narsingdi" },
    { id: 44, city_name: "Natore" },
    { id: 45, city_name: "Netrokona" },
    { id: 46, city_name: "Nilphamari" },
    { id: 47, city_name: "Noakhali" },
    { id: 48, city_name: "Pabna" },
    { id: 49, city_name: "Panchagarh" },
    { id: 50, city_name: "Patuakhali" },
    { id: 51, city_name: "Pirojpur" },
    { id: 52, city_name: "Rajbari" },
    { id: 53, city_name: "Rajshahi" },
    { id: 54, city_name: "Rangamati" },
    { id: 55, city_name: "Rangpur" },
    { id: 56, city_name: "Satkhira" },
    { id: 57, city_name: "Shariatpur" },
    { id: 58, city_name: "Sherpur" },
    { id: 59, city_name: "Sirajganj" },
    { id: 60, city_name: "Sunamganj" },
    { id: 61, city_name: "Sylhet" },
    { id: 62, city_name: "Tangail" },
    { id: 63, city_name: "Thakurgaon" },
  ];
  const { user } = useContext(AuthContext);
  const { userData } = useUserProfile();

  useEffect(() => {
    if (userData) {
      setName(userData.name || "");
      setEmail(userData.email || "");
      setPhone(userData.phone_number || "");
    }
  }, [userData]);

  useEffect(() => {
    if (city) {
      setShippingCost(city.toLowerCase() === "dhaka" ? 60 : 120);
    } else {
      setShippingCost(defaultShippingCost);
    }
  }, [city]);

  const productIds = JSON.parse(sessionStorage.getItem("productIds"));

  // Function to load cart from sessionStorage
  const loadCart = () => {
    const updatedCart = JSON.parse(sessionStorage.getItem("checkout")) || {
      items: [],
    };
    setExistingCart(updatedCart);
  };

  // Listen for changes in sessionStorage
  useEffect(() => {
    loadCart(); // Initial load of cart when component mounts

    const handleStorageChange = () => {
      loadCart(); // Update cart state whenever sessionStorage changes
    };

    // Add event listener for sessionStorage changes
    window.addEventListener("storage", handleStorageChange);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const totalAmount = user
    ? cart?.sub_total
    : existingCart?.items?.reduce(
        (acc, item) => acc + item.quantity * item.selling_price,
        0
      );

  const handleSubmitOrder = async () => {
    if (!email || !name || !phone || !address) {
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "error",
        title: "Please fill in all required fields.",
        showConfirmButton: false,
        timer: 3000,
      });
      return; // Prevent the order from being submitted
    }
    if (user) {
      const formattedData = {
        items: cart?.items.map((item) => ({
          product_inventory_id: item?.inventory_id,
          quantity: item?.quantity,
        })),
        name: name,
        phone_number: phone,
        email: email,
        shipping_address: address,
        delivery_options: city === "Dhaka" ? "INSIDE_DHAKA" : "OUTSIDE_DHAKA",
      };
      console.log(formattedData);

      try {
        // Ensure Axios is configured with the right headers and timeout
        const response = await axiosPublic.post(
          "/api/v1/open/create/order?request-id=1234",
          formattedData,
          {
            headers: {
              Authorization: `Bearer ${user}`,
            },
          }
        );

        if (response.status === 200) {
          Swal.fire({
            icon: "success",
            title: "Order placed successfully!",
            text: "Your order has been placed and is being processed.",
          });
          try {
            const response = await axiosPublic.delete(
              "/api/v1/user/delete/cart?request-id=1234"
            );
            console.log("Item deleted successfully:", response.data); // Adjust delay if necessary
          } catch (error) {
            console.error("Error deleting item:", error);
          }
          setName("");
          setEmail("");
          setPhone("");
          setCity("");
          setAddress("");
          setExistingCart({});
          navigate("/");
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Something went wrong while placing your order.",
          });
        }
      } catch (error) {
        console.error("Error placing order:", error);
        // Check if the error is a network-related issue
        if (error.code === "ERR_NETWORK") {
          Swal.fire({
            icon: "error",
            title: "Network Error",
            text: "There was a problem connecting to the server. Please try again later.",
          });
        } else if (error.response) {
          // Handle specific error responses from the backend
          Swal.fire({
            icon: "error",
            title: "Error",
            text: `Error: ${error.response.status} - ${error.response.data.message}`,
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "An unexpected error occurred. Please try again.",
          });
        }
      }
    } else {
      const formattedData = {
        items: existingCart.items.map((cartItem) => {
          const matchingProduct = productIds.find(
            (product) => product.sku === cartItem.sku
          );
          return {
            product_inventory_id: matchingProduct ? matchingProduct.id : null,
            quantity: cartItem.quantity,
          };
        }),
        name: name,
        phone_number: phone,
        email: email,
        shipping_address: address,
        delivery_options: city === "Dhaka" ? "INSIDE_DHAKA" : "OUTSIDE_DHAKA",
      };

      try {
        // Ensure Axios is configured with the right headers and timeout
        const response = await axiosPublic.post(
          "/api/v1/open/create/order?request-id=1234",
          formattedData
        );

        if (response.status === 200) {
          Swal.fire({
            icon: "success",
            title: "Order placed successfully!",
            text: "Your order has been placed and is being processed.",
          });
          setName("");
          setEmail("");
          setPhone("");
          setCity("");
          setAddress("");
          setExistingCart({});
          navigate("/");
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Something went wrong while placing your order.",
          });
        }
      } catch (error) {
        console.error("Error placing order:", error);
        // Check if the error is a network-related issue
        if (error.code === "ERR_NETWORK") {
          Swal.fire({
            icon: "error",
            title: "Network Error",
            text: "There was a problem connecting to the server. Please try again later.",
          });
        } else if (error.response) {
          // Handle specific error responses from the backend
          Swal.fire({
            icon: "error",
            title: "Error",
            text: `Error: ${error.response.status} - ${error.response.data.message}`,
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "An unexpected error occurred. Please try again.",
          });
        }
      }
    }
  };

  return (
    <div className="w-11/12 mx-auto py-10 min-h-screen text-[#2F3132] space-y-10">
      <h1 className="font-poppins text-3xl md:text-5xl font-normal underline text-center">
        Checkout
      </h1>
      <div className="flex flex-col space-y-20">
        <div className="pt-[10px] px-[10px] border border-solid shadow rounded-[14px]">
          <table className="w-full">
            <thead className="w-full bg-[#757575] text-white">
              <tr>
                <th className="text-white text-center text-nowrap font-poppins text-xs sm:text-base md:text-xl font-normal col-span-6 px-[5px] sm:px-[14px] md:px-[20px] lg:px-[27px] py-[5px] sm:py-[8px] md:py-[14px] rounded-l-[14px]">
                  Order Summary
                </th>
                <th className="text-white text-center font-poppins text-xs sm:text-base md:text-xl font-normal py-[5px] sm:py-[8px] md:py-[14px] col-span-2">
                  Quantity
                </th>
                <th className="text-white text-center font-poppins text-xs sm:text-base md:text-xl font-normal py-[5px] sm:py-[8px] md:py-[14px] col-span-2">
                  Price
                </th>
                <th className="text-white text-center font-poppins text-xs sm:text-base md:text-xl font-normal col-span-2 px-[5px] sm:px-[14px] md:px-[20px] lg:px-[27px] py-[5px] sm:py-[8px] md:py-[14px] rounded-r-[14px]">
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
              {user ? (
                cart?.items?.length > 0 ? (
                  cart.items.map((item, index) => (
                    <tr key={index}>
                      <td className="font-poppins flex space-x-7 text-xl font-normal border-b-[2px] px-5 py-2 sm:py-3 md:py-5 lg:py-7 col-span-6">
                        <div className="flex flex-col space-y-[2px] md:space-y-2 lg:space-y-3">
                          <h1 className="font-poppins text-[10px] sm:text-sm md:text-base font-semibold">
                            {item.product_name}
                          </h1>
                          <h1 className="font-roboto text-[10px] sm:text-[10px] md:text-sm font-normal">
                            {item.color_name}
                          </h1>
                        </div>
                      </td>
                      <td className="font-poppins text-[10px] sm:text-sm md:text-base lg:text-xl font-normal text-center border-b-[2px] py-2 sm:py-3 md:py-5 lg:py-7 col-span-2">
                        {item.quantity}
                      </td>
                      <td className="font-poppins text-[10px] sm:text-sm md:text-base lg:text-xl font-normal text-center border-b-[2px] py-2 sm:py-3 md:py-5 lg:py-7 col-span-2">
                        Tk {item.selling_price}
                      </td>
                      <td className="font-poppins text-[10px] sm:text-sm md:text-base text-center lg:text-xl font-normal border-b-[2px] py-2 sm:py-3 md:py-5 lg:py-7 col-span-2">
                        Tk {(item.quantity * item.selling_price).toFixed(2)}
                      </td>
                    </tr>
                  ))
                ) : (
                  <div className="text-center py-10">
                    <h2 className="text-lg font-semibold">
                      Your cart is empty
                    </h2>
                  </div>
                )
              ) : existingCart?.items?.length > 0 ? (
                existingCart.items.map((item, index) => (
                  <tr key={index}>
                    <td className="font-poppins flex space-x-7 text-xl font-normal border-b-[2px] px-5 py-2 sm:py-3 md:py-5 lg:py-7 col-span-6">
                      <div className="flex flex-col space-y-[2px] md:space-y-2 lg:space-y-3">
                        <h1 className="font-poppins leading-tight text-[10px] sm:text-sm md:text-base font-semibold">
                          {item.product_name}
                        </h1>
                        <h1 className="font-roboto text-[10px] md:text-sm font-normal">
                          {item.color_name}
                        </h1>
                      </div>
                    </td>
                    <td className="font-poppins text-[10px] sm:text-sm md:text-base lg:text-xl font-normal text-center border-b-[2px] py-2 sm:py-3 md:py-5 lg:py-7 col-span-2">
                      {item.quantity}
                    </td>
                    <td className="font-poppins text-[10px] sm:text-sm md:text-base lg:text-xl font-normal text-center border-b-[2px] py-2 sm:py-3 md:py-5 lg:py-7 col-span-2">
                      Tk {item.selling_price}
                    </td>
                    <td className="font-poppins text-[10px] sm:text-sm md:text-base text-center lg:text-xl font-normal border-b-[2px] py-2 sm:py-3 md:py-5 lg:py-7 col-span-2">
                      Tk {(item.quantity * item.selling_price).toFixed(2)}
                    </td>
                  </tr>
                ))
              ) : (
                <div className="text-center py-10">
                  <h2 className="text-lg font-semibold">Your cart is empty</h2>
                </div>
              )}
            </tbody>
          </table>
          <div className="flex justify-end items-center space-x-8 px-5 py-[10px]">
            <h1 className="font-poppins text-sm sm:text-base md:text-xl lg:text-[25px] font-medium">
              Subtotal
            </h1>
            <h1 className="font-poppins text-sm sm:text-base md:text-xl lg:text-[25px] font-medium">
              Tk {totalAmount}
            </h1>
          </div>
        </div>
        <div className="flex flex-col max-lg:gap-10 items-start lg:flex-row lg:justify-between">
          <div className="space-y-8 w-full lg:w-[45%]">
            <div className="bg-[#757575] rounded-[10px] px-2 sm:px-4 md:px-5 lg:px-[26px] py-2">
              <h1 className="font-poppins text-sm md:text-base lg:text-xl font-normal text-white">
                Delivery Information
              </h1>
            </div>
            <div>
              <form className="space-y-8">
                <div className="space-y-1 flex flex-col">
                  <label className="font-poppins text-sm sm:text-base md:text-lg font-normal flex gap-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border-[2px] border-solid px-[16px] py-3 rounded-[5px] dark:bg-white dark:text-black"
                    required
                  />
                </div>
                <div className="space-y-1 flex flex-col">
                  <label className="font-poppins text-sm sm:text-base md:text-lg font-normal flex gap-1">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border-[2px] border-solid px-[16px] py-3 rounded-[5px] dark:bg-white dark:text-black"
                    required
                  />
                </div>
                <div className="space-y-1 flex flex-col">
                  <label className="font-poppins text-sm sm:text-base md:text-lg font-normal flex gap-1">
                    Phone <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    placeholder="Phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="border-[2px] border-solid px-[16px] py-3 rounded-[5px] dark:bg-white dark:text-black"
                    required
                  />
                </div>
                <div className="space-y-1 flex flex-col">
                  <label className="font-poppins text-sm sm:text-base md:text-lg font-normal flex gap-1">
                    City <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="border-[2px] border-solid px-[16px] py-3 rounded-[5px] dark:bg-white dark:text-black"
                    required
                  >
                    <option value="" disabled>
                      Select a city
                    </option>
                    {cities.map((city) => (
                      <option key={city.id} value={city.city_name}>
                        {city.city_name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1 flex flex-col">
                  <label className="font-poppins text-sm sm:text-base md:text-lg font-normal flex gap-1">
                    Delivery Address <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    placeholder="Give Your Delivery Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="border-[2px] border-solid px-[16px] py-3 h-32 rounded-[5px] dark:bg-white dark:text-black"
                    required
                  />
                </div>
              </form>
            </div>
          </div>
          <div className="w-full lg:w-[45%] space-y-14">
            <div className="space-y-5">
              <div className="bg-[#757575] w-full rounded-[10px] px-[26px] py-2">
                <h1 className="font-poppins  text-sm md:text-base lg:text-xl font-normal text-white">
                  Billing Summary
                </h1>
              </div>
              <div className="w-11/12 mx-auto flex flex-col border-[2px] rounded-[14px] px-2">
                <div className="flex justify-between items-center px-2 py-4 border-b-[2px]">
                  <h1 className="font-poppins text-base font-normal">
                    Item Total
                  </h1>
                  <h1 className="font-poppins text-base font-normal">
                    Tk {totalAmount}
                  </h1>
                </div>
                <div className="flex justify-between items-center px-2 py-4 border-b-[2px]">
                  <h1 className="font-poppins text-base font-normal">
                    Shipping
                  </h1>
                  <h1 className="font-poppins text-base font-normal">
                    BDT {shippingCost}
                  </h1>
                </div>
                <div className="flex justify-between items-center px-2 py-4">
                  <h1 className="font-poppins text-base font-normal">
                    Total For Your Order
                  </h1>
                  <h1 className="font-poppins text-base font-normal">
                    Tk {totalAmount}
                  </h1>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="bg-[#757575] w-full rounded-[10px] px-[26px] py-2">
                <h1 className="font-poppins  text-sm md:text-base lg:text-xl font-normal text-white">
                  Payment
                </h1>
              </div>
              <div className="w-11/12 mx-auto flex flex-col px-2">
                <div className="w-full my-2">
                  <button
                    onClick={() => handleSubmitOrder()}
                    className="buttons  text-sm md:text-base lg:text-xl uppercase w-full py-3 rounded-full"
                  >
                    Pay and Place Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
