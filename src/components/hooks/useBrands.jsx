import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useBrands = () => {
  const axiosPublic = useAxiosPublic();

  const {
    data: brands = [],
    refetch: brandRefetch,
    isLoading: brandIsLoading,
    error: brandError,
  } = useQuery({
    queryKey: ["brand"],
    queryFn: async () => {
      const res = await axiosPublic.get(
        "/api/v1/open/brands/get/all?page=0&size=100&request-id=1234"
      );
      return res.data.brands;
    },
    onError: (err) => {
      console.error("Error fetching category data:", err);
    },
  });

  return [brands, brandRefetch, brandIsLoading, brandError];
};

export default useBrands;
