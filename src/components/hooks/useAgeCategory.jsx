import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useAgeCategory = (minAge, maxAge) => {
  const axiosPublic = useAxiosPublic();

  const {
    data: ageCategories = [],
    refetch,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["ageCategory", minAge, maxAge],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/api/v1/open/products/get/by/age-range?minimum-age-range=${minAge}&maximum-age-range=${maxAge}&page=0&size=10&request-id=1234`
      );
      return res?.data?.age_products || [];
    },
    enabled: minAge != null && maxAge != null,
  });

  return [ageCategories, refetch, isLoading, error];
};

export default useAgeCategory;
