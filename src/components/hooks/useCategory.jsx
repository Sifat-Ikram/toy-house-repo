import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useCategory = () => {
  const axiosPublic = useAxiosPublic();

  const {
    data: categories = [],
    refetch,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["category"],
    queryFn: async () => {
      const res = await axiosPublic.get("/api/v1/open/categories/get/all?page=0&size=10&request-id=1234");
      return res.data.categories;
    },
    onError: (err) => {
      console.error("Error fetching category data:", err);
    },
  });

  return [categories, refetch, isLoading, error];
};

export default useCategory;