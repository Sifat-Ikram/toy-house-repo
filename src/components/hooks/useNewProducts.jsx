import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useNewProducts = () => {
  const axiosPublic = useAxiosPublic();

  const {
    data: newProducts = [],
    refetch,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["newProduct"],
    queryFn: async () => {
      const res = await axiosPublic.get(
        "/api/v1/open/products/new/products?page=0&size=50&request-id=1234"
      );
      return res.data.new_products;
    },
    onError: (err) => {
      console.error("Error fetching category data:", err);
    },
  });

  return [newProducts, refetch, isLoading, error];
};

export default useNewProducts;
