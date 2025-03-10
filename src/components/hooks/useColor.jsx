import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useColor = () => {
  const axiosPublic = useAxiosPublic();

  const {
    data: colors = [],
    refetch: colorRefetch,
    isLoading: colorIsLoading,
    error: colorError,
  } = useQuery({
    queryKey: ["color"],
    queryFn: async () => {
      const res = await axiosPublic.get(
        "/api/v1/admin/colors/get?page-number=0&page-size=140&request-id=1234"
      );

      return res.data.colors;
    },
    onError: (err) => {
      console.error("Error fetching color data:", err);
    },
  });

  return [colors, colorRefetch, colorIsLoading, colorError];
};

export default useColor;
