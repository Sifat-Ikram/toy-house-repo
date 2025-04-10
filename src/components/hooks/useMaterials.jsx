import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const useMaterials = () => {
  const axiosPublic = useAxiosPublic();

  const {
    data: allMaterials = [],
    refetch: materialRefetch,
    isLoading: materialIsLoading,
    error: materialError,
  } = useQuery({
    queryKey: ["material"],
    queryFn: async () => {
      const res = await axiosPublic.get(
        "/api/v1/admin/materials/get?page-number=0&page-size=140&request-id=1234"
      );

      return res.data.materials;
    },
    onError: (err) => {
      console.error("Error fetching material data:", err);
    },
  });

  return [allMaterials, materialRefetch, materialIsLoading, materialError];
};

export default useMaterials;
