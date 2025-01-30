import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useProducts = ({ id }) => {
  const axiosPublic = useAxiosPublic();
  const {
    data: selectedProduct = {},
    refetch,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const url = `/api/v1/open/products/get/product?product-id=${id}&request-id=1234`;
      const res = await axiosPublic.get(url);
      return res.data;
    },
    onError: (err) => {
      console.error("Error fetching product data:", err);
    },
    enabled: !!id,
  });

  return { selectedProduct, refetch, isLoading, error };
};

export default useProducts;
