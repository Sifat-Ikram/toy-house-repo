import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../useAxiosPublic";

const useByCategory = ({ id }) => {
  const axiosPublic = useAxiosPublic();

  const {
    data: categoryProducts = [],
    refetch: categoryRefetch,
    isLoading: categoryIsLoading,
    error: categoryError,
  } = useQuery({
    queryKey: ["categoryProducts", id],
    queryFn: async () => {
      if (!id) return [];
      const res = await axiosPublic.get(
        `api/v1/open/products/get/by/category?category-id=${id}&page=0&size=10000&request-id=1234`
      );
      return res?.data?.category_products || [];
    },
    enabled: !!id,
  });

  return [categoryProducts, categoryRefetch, categoryIsLoading, categoryError];
};

export default useByCategory;
