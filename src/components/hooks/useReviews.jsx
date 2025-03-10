import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useReviews = ({ id }) => {
  const axiosPublic = useAxiosPublic();
  const {
    data: selectedReviews = [],
    refetch: reviewRefetch,
    isLoading: reviewIsLoading,
    error: reviewError,
  } = useQuery({
    queryKey: ["review", id],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/api/v1/open/get/review/${id}?request-id=1234`
      );
      return res.data?.reviews;
    },
    onError: (err) => {
      console.error("Error fetching reviews:", err);
    }, // Ensures query is only triggered if id exists
  });

  return [selectedReviews, reviewRefetch, reviewIsLoading, reviewError];
};

export default useReviews;
