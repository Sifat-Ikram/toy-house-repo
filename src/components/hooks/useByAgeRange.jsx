import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useByAgeRange = ({ minAge, maxAge }) => {
  const axiosPublic = useAxiosPublic();

  const {
    data: ageRange = [],
    refetch: ageRefetch,
    isLoading: ageIsLoading,
    error: ageError,
  } = useQuery(
    ["category", minAge, maxAge], // Unique query key
    async () => {
      const res = await axiosPublic.get(
        `/api/v1/open/products/get/by/age-range?minimum-age-range=${minAge}&maximum-age-range=${maxAge}&page=0&size=10&request-id=1234`
      );
      return res.data.categories;
    },
    {
      onError: (err) => {
        console.error("Error fetching category data:", err);
      },
    }
  );

  return [ageRange, ageRefetch, ageIsLoading, ageError];
};

export default useByAgeRange;
