import { useState } from "react";

const CustomerReviews = ({ reviews }) => {
  const [repliesInput, setRepliesInput] = useState({});
  const [reviewsData, setReviewsData] = useState(reviews);
  const [newReview, setNewReview] = useState("");
  const [allReplies, setAllReplies] = useState(() => {
    const replies = {};
    reviewsData.forEach((review) => {
      replies[review.id] = review.replies || [];
    });
    return replies;
  });
  const [visibleReplies, setVisibleReplies] = useState({});

  const handleAddReview = () => {
    if (!newReview.trim()) return;
    const newReviewData = {
      id: Date.now(),
      username: "Anonymous",
      userImage: "https://via.placeholder.com/50",
      date: new Date().toISOString(),
      text: newReview,
      likes: 0,
      replies: [],
    };
    setReviewsData([newReviewData, ...reviewsData]);
    setNewReview("");
  };

  const handleReply = (id, replyText) => {
    if (!replyText.trim()) return;
    setAllReplies((prev) => ({
      ...prev,
      [id]: [...prev[id], { text: replyText, date: new Date().toISOString() }],
    }));
    setRepliesInput((prev) => ({ ...prev, [id]: "" }));
  };

  return (
    <div className="w-11/12">
        <div className="p-5 mb-6">
        <h2 className="text-lg font-semibold mb-4 max-sm:text-black">Add Your Review</h2>
        <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4">
          <input
            type="text"
            placeholder="Write your review here..."
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
            className="flex-1 px-3 py-[6px] sm:py-[10px] bg-white border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
          />
          <button
            onClick={handleAddReview}
            className="buttons"
          >
            Give Review
          </button>
        </div>
      </div>
      <div>
      {reviewsData.map((review) => (
        <div key={review.id} className="p-5 mb-6 shadow">
          <div className="flex items-center mb-2">
            <img
              src={review.userImage}
              alt={`${review.username} avatar`}
              className="w-12 h-12 rounded-full mr-4"
            />
            <div>
              <h4 className="text-lg font-semibold text-gray-800">
                {review.username}
              </h4>
              <p className="text-sm text-gray-500">
                {new Date(review.date).toLocaleDateString()}
              </p>
            </div>
          </div>
          <p className="text-gray-700 mb-1">{review.text}</p>
          <div className="flex items-center space-x-4">
            <button className="px-4 py-1">👍 {review.likes}</button>
            <h1
            className="cursor-pointer"
              onClick={() =>
                setVisibleReplies((prev) => ({
                  ...prev,
                  [review.id]: !prev[review.id],
                }))
              }
            >
              Reply
            </h1>
          </div>
          {/* Replies Section */}
          {visibleReplies[review.id] && (
            <div className="mt-4">
              {allReplies[review.id]?.length > 0 && (
                <div>
                  <h5 className="text-sm font-bold text-gray-700 mb-2">
                    Replies:
                  </h5>
                  <ul className="space-y-2">
                    {allReplies[review.id].map((reply, idx) => (
                      <li
                        key={idx}
                        className="p-2 rounded-lg"
                      >
                        <p className="text-gray-600">{reply.text}</p>
                        <span className="text-xs text-gray-400">
                          {new Date(reply.date).toLocaleString()}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {/* Reply Input */}
              <div className="mt-2 flex items-center space-x-2 w-1/2">
                <input
                  type="text"
                  placeholder="Write a reply..."
                  value={repliesInput[review.id] || ""}
                  onChange={(e) =>
                    setRepliesInput((prev) => ({
                      ...prev,
                      [review.id]: e.target.value,
                    }))
                  }
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
                />
                <button
                  onClick={() =>
                    handleReply(review.id, repliesInput[review.id])
                  }
                  className="px-4 py-2 buttons text-lg font-normal"
                >
                  Send
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
      </div>
    </div>
  );
};

export default CustomerReviews;
