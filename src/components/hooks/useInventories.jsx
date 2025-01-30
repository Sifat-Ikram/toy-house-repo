import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const useInventories = ({ id }) => {
  const axiosPublic = useAxiosPublic();

  const {
    data: inventories = [],
    refetch: inventoryRefetch,
    isLoading: inventoryIsLoading,
    error: inventoryError,
  } = useQuery({
    queryKey: ["inventory"],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `api/v1/admin/product/inventory/get/inventory-dashboard/${id}?page-number=0&page-size=10&request-id=1234`
      );

      return res.data.inventories;
    },
    onError: (err) => {
      console.error("Error fetching color data:", err);
    },
  });

  return [inventories, inventoryRefetch, inventoryIsLoading, inventoryError];
};

export default useInventories;
