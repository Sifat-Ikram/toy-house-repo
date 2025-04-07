import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";

const useUserOrders = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);

  const {
    data: userOrders = [],
    refetch: allUserOrdersRefetch,
    isLoading: allUserOrdersIsLoading,
    error: allUserOrdersError,
  } = useQuery({
    queryKey: ["userOrders", user],
    queryFn: async () => {
      const res = await axiosPublic.get(
        "/api/v1/user/get/orders?page-number=0&page-size=100&request-id=1234",
        {
          headers: {
            Authorization: `Bearer ${user}`, // Adjust based on your context structure
            "Content-Type": "application/json",
          },
        }
      );
      return res.data.orders;
    },
    enabled: !!user,
    onError: (err) => {
      console.error("Error fetching category data:", err);
    },
    refetchOnWindowFocus: false, // Disable refetch when window regains focus
    staleTime: 0, // Force the query to always be considered stale (refetch on every status change)
    cacheTime: 0, // Disable cache
  });

  return [
    userOrders,
    allUserOrdersRefetch,
    allUserOrdersIsLoading,
    allUserOrdersError,
  ];
};

export default useUserOrders;
