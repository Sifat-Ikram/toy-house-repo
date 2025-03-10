import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useTopReviews = () => {
  const axiosPublic = useAxiosPublic();

  const {
    data: topReviews = [],
    refetch: topReviewsRefetch,
    isLoading: topReviewsIsLoading,
    error: topReviewsError,
  } = useQuery({
    queryKey: ["topReviews"],
    queryFn: async () => {
      const res = await axiosPublic.get(
        "/api/v1/open/get/top/reviews?request-id=1234"
      );
      return res.data.reviews;
    },
    onError: (err) => {
      console.error("Error fetching color data:", err);
    },
  });

  return [topReviews, topReviewsRefetch, topReviewsIsLoading, topReviewsError];
};

export default useTopReviews;
