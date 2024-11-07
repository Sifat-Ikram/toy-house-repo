import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useProduct = () => {
  const axiosPublic = useAxiosPublic();

  const {
    data: product = [],
    refetch,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["product"],
    queryFn: async () => {
      const res = await axiosPublic.get("/product");
      return res.data;
    },
    onError: (err) => {
      console.error("Error fetching product data:", err);
    },
  });

  return [product, refetch, isLoading, error];
};

export default useProduct;
