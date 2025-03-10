import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useProductDashboard = () => {
  const axiosPublic = useAxiosPublic();

  const {
    data: products = [],
    refetch: productRefetch,
    isLoading: productIsLoading,
    error: productError,
  } = useQuery({
    queryKey: ["product"],
    queryFn: async () => {
      const res = await axiosPublic.get(
        "/api/v1/open/products/get/products/for-dashboard?page-number=0&page-size=2000&request-id=1234"
      );
      return res.data.products;
    },
    onError: (err) => {
      console.error("Error fetching category data:", err);
    },
  });

  return [products, productRefetch, productIsLoading, productError];
};

export default useProductDashboard;
