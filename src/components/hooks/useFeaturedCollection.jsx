import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useFeaturedCollection = () => {
    const axiosPublic = useAxiosPublic();

  const {
    data: featuredProducts = [],
    refetch,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["featuredProduct"],
    queryFn: async () => {
      const res = await axiosPublic.get(
        "/api/v1/open/products/featured/products?page=0&size=10&request-id=1234"
      );
      
      return res.data.featured_products;
    },
    onError: (err) => {
      console.error("Error fetching category data:", err);
    },
  });

  return [featuredProducts, refetch, isLoading, error];
};

export default useFeaturedCollection;
