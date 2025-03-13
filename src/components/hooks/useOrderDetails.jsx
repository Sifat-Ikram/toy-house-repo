import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useOrderDetails = (id) => {
  const axiosPublic = useAxiosPublic();

  const {
    data: orderDetails = {},
    refetch: orderDetailsRefetch,
    isLoading: orderDetailsIsLoading,
    error: orderDetailsError,
  } = useQuery({
    queryKey: ["orderDetails", id],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/api/v1/admin/order/get/order-details/${id}?request-id=1234`
      );
      return res.data;
    },
    enabled: id !== undefined && id !== null,
    onError: (err) => {
      console.error("Error fetching order details:", err);
    },
  });

  return [
    orderDetails,
    orderDetailsRefetch,
    orderDetailsIsLoading,
    orderDetailsError,
  ];
};

export default useOrderDetails;
