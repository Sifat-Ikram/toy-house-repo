import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useAllProducts = () => {
  const axiosPublic = useAxiosPublic();
  const {
    data: allProducts = [],
    refetch,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["allProduct"],
    queryFn: async () => {
      const url = "api/v1/open/products/get/all?page=0&size=5000&request-id=1234";
      const res = await axiosPublic.get(url);
      return res.data.products;
    },
    onError: (err) => {
      console.error("Error fetching product data:", err);
    },
  });

  return [allProducts, refetch, isLoading, error];
};

export default useAllProducts;
