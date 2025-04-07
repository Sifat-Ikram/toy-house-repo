import { useContext } from "react";
import useAxiosPublic from "./useAxiosPublic";
import { AuthContext } from "../../provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";

const useCart = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);

  const fetchCart = async () => {
    if (!user) return []; // Ensure valid user token

    try {
      const response = await axiosPublic.get(
        "/api/v1/user/get/cart?request-id=1234",
        {
          headers: {
            Authorization: `Bearer ${user}`, // Ensure correct token usage
          },
        }
      );

      return response?.data || [];
    } catch (error) {
      if (error.response?.status === 404) {
        return []; // Return an empty array instead of an object
      }
      throw error; // Re-throw other errors
    }
  };

  const {
    data: cart = [], // Ensure cart is always an array
    refetch: cartRefetch,
    isLoading: cartIsLoading,
    error: cartError,
  } = useQuery({
    queryKey: ["cart", user], // More stable query key
    queryFn: fetchCart,
    enabled: !!user, // Only fetch if token exists
  });

  return { cart, cartRefetch, cartIsLoading, cartError };
};

export default useCart;
