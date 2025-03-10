import { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import useReviews from "../../hooks/useReviews";

const CustomerReviews = ({ productId, setReviewLength }) => {
  const [selectedReviews, reviewRefetch, reviewIsLoading, reviewError] =
    useReviews({ id: productId });
  const axiosPublic = useAxiosPublic();
  const [newReview, setNewReview] = useState("");
  const [rating, setRating] = useState(0);

  const handleAddReview = async () => {
    // Ensure the rating is a number
    const numericRating = Number(rating);

    if (!newReview.trim() || numericRating <= 0 || numericRating > 5) {
      Swal.fire({
        icon: "warning",
        title: "Incomplete Review",
        text: "Please add a comment and a rating between 1 and 5 before submitting.",
        position: "top-end", // Positioning in the top-right corner
        showConfirmButton: false, // No button will be shown
        timer: 3000, // Optional: auto close after 3 seconds
      });
      return;
    }

    const newReviewData = {
      product_id: productId,
      user_id: 1,
      rating: numericRating,
      comment: newReview,
    };

    try {
      const response = await axiosPublic.post(
        "/api/v1/user/add/review?request-id=1234",
        newReviewData
      );

      if (response.status === 201) {
        setNewReview("");
        setRating(0);
        reviewRefetch();
        Swal.fire({
          icon: "success",
          title: "Review Added!",
          position: "top-end", // Positioning in the top-right corner
          showConfirmButton: false, // No button will be shown
          timer: 3000, // Optional: auto close after 3 seconds
        });
      }
    } catch (error) {
      console.error("Error adding review:", error);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong while submitting your review. Please try again later.",
        position: "top-end", // Positioning in the top-right corner
        showConfirmButton: false, // No button will be shown
        timer: 3000, // Optional: auto close after 3 seconds
      });
    }
  };

  useEffect(() => {
    setReviewLength(selectedReviews.length);
  }, [setReviewLength, selectedReviews]);

  if (reviewIsLoading) {
    return <div>Loading reviews...</div>;
  }

  if (reviewError) {
    return <div>Error loading reviews: {reviewError.message}</div>;
  }

  return (
    <div className="w-11/12 space-y-16 dark:text-black dark:bg-white">
      {/* Add Review Section */}
      <div className="space-y-4">
        <div className="flex flex-col space-y-2">
          {/* Star Rating */}
          <div className="flex items-center space-x-2">
            <span className="text-lg font-roboto">Rating:</span>
            <div className="flex space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className={`text-2xl ${
                    rating >= star ? "text-yellow-600" : "text-gray-300"
                  } transition duration-200 hover:text-yellow-600`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>

          {/* Review Input */}
          <div className="relative w-full">
            <textarea
              placeholder="Share your thoughts..."
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
              className="w-full bg-base-200 dark:bg-white px-4 py-3 border rounded-xl resize-none min-h-[120px]"
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              onClick={handleAddReview}
              className="text-base buttons transform transition duration-300"
            >
              Submit Review
            </button>
          </div>
        </div>
      </div>

      {/* Display Reviews */}
      <div>
        <h1 className="text-2xl font-roboto font-semibold">
          Reviews and Ratings
        </h1>
        <div className="space-y-4 md:space-y-6">
          {selectedReviews.length > 0 ? (
            selectedReviews.map((review) => (
              <div key={review.id} className="p-[10px] md:p-3 lg:p-5 space-y-[1px] sm:space-y-1 md:space-y-2 shadow rounded-lg">
                <div className="flex items-center">
                  <h4 className="text-lg font-semibold text-gray-800">
                    {review.id}
                  </h4>
                  <p className="text-sm text-gray-500 ml-4">
                    {new Date(review.time_frame).toLocaleDateString()}
                  </p>
                </div>
                {/* Display Rating */}
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={`text-2xl ${
                        review.rating >= star
                          ? "text-yellow-500"
                          : "text-gray-400"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                {/* Display Review Text */}
                <p className="text-gray-700">{review?.comment}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center">No reviews yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerReviews;
