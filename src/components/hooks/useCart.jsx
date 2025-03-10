import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import useAxiosPublic from "./useAxiosPublic";
import { AuthContext } from "../../provider/AuthProvider";

const useCart = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);

  const fetchCart = async () => {
    const response = await axiosPublic.get(
      "/api/v1/user/get/cart?request-id=1234",
      {
        headers: {
          Authorization: `Bearer ${user}`,
        },
      }
    );
    
    return response.data;
  };

  const {
    data: cart,
    refetch: cartRefetch,
    isLoading: cartIsLoading,
    error: cartError,
  } = useQuery({
    queryKey: ["cart"],
    queryFn: fetchCart,
  });

  return { cart, cartRefetch, cartIsLoading, cartError };
};

export default useCart;
