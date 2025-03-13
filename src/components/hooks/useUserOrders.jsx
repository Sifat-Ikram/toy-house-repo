import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useUserOrders = () => {
  const axiosPublic = useAxiosPublic();

  const {
    data: allOrders = [],
    refetch: allOrderRefetch,
    isLoading: allOrderIsLoading,
    error: allOrderError,
  } = useQuery({
    queryKey: ["allOrder"],
    queryFn: async () => {
      const res = await axiosPublic.get(
        "/api/v1/admin/order/get/all?page=0&size=3000&request-id=1234"
      );
      return res.data.orders;
    },
    onError: (err) => {
      console.error("Error fetching category data:", err);
    },
    refetchOnWindowFocus: false, // Disable refetch when window regains focus
    staleTime: 0, // Force the query to always be considered stale (refetch on every status change)
    cacheTime: 0, // Disable cache
  });

  return [allOrders, allOrderRefetch, allOrderIsLoading, allOrderError];
};

export default useUserOrders;