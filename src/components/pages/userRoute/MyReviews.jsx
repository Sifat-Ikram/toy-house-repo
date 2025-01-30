import { useState } from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const MyReviews = () => {
  const [activeTab, setActiveTab] = useState("history");
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const userId = 1;

  const allProducts = [
    {
      id: 1,
      userId: 1,
      product: "Toy Car",
      price: "15.99",
      image: "https://i.ibb.co/YPmMP54/toy-car.jpg",
      reviewText: "Great toy! My son loved it.",
      rating: 4.5,
    },
    {
      id: 2,
      userId: 2,
      product: "Dollhouse",
      price: "49.99",
      image: "https://i.ibb.co/YT2gwsS/dollhouse.jpg",
      reviewText: "Beautiful and well-made.",
      rating: 5,
    },
    {
      id: 3,
      userId: 1,
      product: "Building Blocks",
      price: "29.99",
      image: "https://i.ibb.co/5RkD7h3/building-blocks.jpg",
      reviewText: "",
      rating: 0,
    },
    {
      id: 4,
      userId: 1,
      product: "Rubik's Cube",
      price: "9.99",
      image: "https://i.ibb.co/WfQQ3F6/rubiks-cube.jpg",
      reviewText: "",
      rating: 0,
    },
    {
      id: 5,
      userId: 1,
      product: "Toy Train",
      price: "19.99",
      image: "https://i.ibb.co/G2YVHbP/toy-train.jpg",
      reviewText: "The quality is amazing and very durable.",
      rating: 4,
    },
    {
      id: 6,
      userId: 2,
      product: "Action Figure",
      price: "24.99",
      image: "https://i.ibb.co/2t2N8gX/action-figure.jpg",
      reviewText: "",
      rating: 0,
    },
  ];

  const userReviews = allProducts.filter((item) => item.userId === userId);
  const reviewHistory = userReviews.filter((item) => item.reviewText);
  const pendingReviews = userReviews.filter((item) => !item.reviewText);

  const handleDeleteReview = (reviewId) => {
    console.log(`Deleting review with ID: ${reviewId}`);
  };

  const handleSubmitReview = (reviewText, rating) => {
    console.log(reviewText, rating);
  };

  // Function to render stars based on rating
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <>
        {Array(fullStars)
          .fill()
          .map((_, index) => (
            <FaStar key={`full-${index}`} className="text-yellow-500" />
          ))}
        {halfStar && <FaStarHalfAlt className="text-yellow-500" />}
        {Array(emptyStars)
          .fill()
          .map((_, index) => (
            <FaRegStar key={`empty-${index}`} className="text-gray-400" />
          ))}
      </>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <h1 className="text-3xl font-bold text-center mb-6">My Reviews</h1>
      <div className="flex justify-start gap-10 mb-4">
        <button
          className={`px-3 py-2 font-medium text-sm rounded-t-md ${
            activeTab === "history" ? "border-b-4 border-red-500" : ""
          }`}
          onClick={() => setActiveTab("history")}
        >
          Review History
        </button>
        <button
          className={`px-3 py-2 font-medium text-sm rounded-t-md ${
            activeTab === "pending" ? "border-b-4 border-red-500" : ""
          }`}
          onClick={() => setActiveTab("pending")}
        >
          Pending Reviews
        </button>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-4">
        {activeTab === "history" && (
          <div>
            {reviewHistory.length > 0 ? (
              reviewHistory.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center border-b border-gray-200 py-4 relative"
                >
                  <img
                    src={item.image}
                    alt={item.product}
                    className="w-20 h-20 rounded-lg mr-6"
                  />
                  <div className="flex-grow">
                    <div className="flex justify-between items-center mb-1">
                      <h3 className="font-semibold text-lg">{item.product}</h3>
                      <button
                        onClick={() => handleDeleteReview(item.id)}
                        className="p-[6px] rounded-md bg-red-500 text-white"
                      >
                        <MdDelete className="text-xl" />
                      </button>
                    </div>
                    <p className="text-gray-600">
                      <span className="text-gray-800 font-semibold">
                        Review:
                      </span>{" "}
                      {item.reviewText}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-gray-800 font-semibold">
                        Rating:
                      </span>
                      {renderStars(item.rating)}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center">No reviews available.</p>
            )}
          </div>
        )}

        {activeTab === "pending" && (
          <div>
            {pendingReviews.length > 0 ? (
              pendingReviews.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center border-b border-gray-200 py-4"
                >
                  <img
                    src={item.image}
                    alt={item.product}
                    className="w-20 h-20 rounded-lg mr-6"
                  />
                  <div className="flex-grow">
                    <h3 className="font-semibold text-lg mb-2">
                      {item.product}
                    </h3>
                    <div className="flex mt-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span
                          key={star}
                          onClick={() => setRating(star)}
                          className={`cursor-pointer ${
                            star <= rating ? "text-yellow-500" : "text-gray-400"
                          }`}
                        >
                          <FaStar />
                        </span>
                      ))}
                    </div>
                    <textarea
                      placeholder="Write your review..."
                      className="w-full mt-2 p-2 border rounded-md"
                      value={reviewText}
                      onChange={(e) => setReviewText(e.target.value)}
                    />
                    <button
                      onClick={() => handleSubmitReview(reviewText, rating)}
                      className="mt-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                    >
                      Submit Review
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center">No pending reviews.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyReviews;
