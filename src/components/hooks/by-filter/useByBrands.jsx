import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../useAxiosPublic";

const useByBrands = ({ id }) => {
  const axiosPublic = useAxiosPublic();

  const {
    data: brandProducts = [],
    refetch: brandRefetch,
    isLoading: brandIsLoading,
    error: brandError,
  } = useQuery({
    queryKey: ["brandProduct", id],
    queryFn: async () => {
      if (!id) return [];
      const res = await axiosPublic.get(
        `/api/v1/open/products/get/by/brands?brand-id=${id}&page=0&size=10000&request-id=1234`
      );
      return res?.data?.brand_products || [];
    },
    enabled: !!id,
  });

  return [brandProducts, brandRefetch, brandIsLoading, brandError];
};

export default useByBrands;
