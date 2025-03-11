import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import useAxiosPublic from "./useAxiosPublic";
import { AuthContext } from "../../provider/AuthProvider";

const useCart = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);

  const fetchCart = async () => {
    if (!user) return [];

    const response = await axiosPublic.get(
      "/api/v1/user/get/cart?request-id=1234",
      {
        headers: {
          Authorization: `Bearer ${user}`, // Assuming user.token exists
        },
      }
    );

    return response.data;
  };

  const {
    data: cart = [], // Default empty array
    refetch: cartRefetch,
    isLoading: cartIsLoading,
    error: cartError,
  } = useQuery({
    queryKey: ["cart", user], // Ensure query key changes with user
    queryFn: fetchCart,
    enabled: !!user, // 🔥 Prevents API call when user is not logged in
  });

  return { cart, cartRefetch, cartIsLoading, cartError };
};

export default useCart;
