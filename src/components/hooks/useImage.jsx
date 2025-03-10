import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const useImage = (inventoryId) => {
  const axiosPublic = useAxiosPublic();

  const {
    data: images = [],
    refetch: imageRefetch,
    isLoading: imageIsLoading,
    error: imageError,
  } = useQuery({
    queryKey: ["image", inventoryId],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `api/v1/admin/product/inventory/get/images?product-inventory-id=${inventoryId}&request-id=1234`
      );

      return res.data.images;
    },
    onError: (err) => {
      console.error("Error fetching image data:", err);
    },
  });

  return [images, imageRefetch, imageIsLoading, imageError];
};

export default useImage;
