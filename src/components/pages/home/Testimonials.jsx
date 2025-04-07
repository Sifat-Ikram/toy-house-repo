import { useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import useTopReviews from "../../hooks/useTopReviews";

const Testimonials = () => {
  const sliderRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [topReviews] = useTopReviews();

  const settings = {
    slidesToShow: 2, // Always show 2 slides
    slidesToScroll: 1,
    arrows: false,
    dots: false,
    infinite: false,
    afterChange: (index) => setCurrentIndex(index),
    responsive: [
      { breakpoint: 1700, settings: { slidesToShow: 2 } }, // Tablet and larger devices
      { breakpoint: 768, settings: { slidesToShow: 3 } }, // Mobile and tablet
      { breakpoint: 510, settings: { slidesToShow: 2 } }, // Portrait mobile
      { breakpoint: 315, settings: { slidesToShow: 1 } }, // Mobile (smaller screens)
    ],
  };

  return (
    <div className="relative z-30 w-full flex flex-col lg:flex-row items-center bg-[#31b2f3] h-full max-lg:space-y-5 lg:space-x-5 justify-center bg-no-repeat pt-14 px-6 overflow-hidden">
      {/* Text Section - 40% Width */}
      <div className="w-full lg:w-2/5 text-center lg:text-left mb-6 lg:mb-0">
        <div className="w-11/12 mx-auto">
          <h1 className="text-lg sm:text-2xl md:text-4xl lg:text-4xl font-bold text-white font-poppins">
            Listen to Our Customers
          </h1>
          <p className="mt-4 text-white text-xs sm:text-base">
            Our customers love our toys! Read their reviews to see why they keep
            coming back.
          </p>
        </div>
      </div>

      {/* Slider Section - 60% Width */}
      <div className="w-full sm:w-4/5 md:w-11/12 lg:w-3/5 mx-auto relative pb-14 lg:h-[350px]">
        {topReviews.length > 0 ? (
          <>
            <Slider ref={sliderRef} {...settings}>
              {topReviews.map((review) => (
                <div key={review.id}>
                  <div className="bg-white dark:bg-white rounded-md md:rounded-2xl p-3 sm:p-3 md:p-4 shadow-lg flex flex-col justify-between h-[120px] sm:h-[180px] w-[130px] sm:w-[180px] md:w-[300px] md:h-[200px] lg:w-[300px] lg:h-[250px] space-y-2 md:space-y-4">
                    <div className="dark:text-black">
                      <h2 className="text-xs sm:text-sm md:text-lg lg:text-xl font-poppins">
                        {review.reviewer_name || "Anonymous"}
                      </h2>
                      <div className="flex space-x-[2px] -mt-1 mb-5">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span
                            key={star}
                            className={`text-lg ${
                              review.rating >= star
                                ? "text-yellow-500"
                                : "text-gray-400"
                            }`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                      <p className="text-[10px] sm:text-xs lg:text-sm font-roboto">
                        {review.comment || "No feedback provided."}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>

            {/* Navigation Buttons */}
            <button
              onClick={() => sliderRef.current.slickPrev()}
              className={`absolute top-1/2 transform -translate-y-1/2 -mt-6 -left-6 sm:-left-8 md:-left-10 lg:-left-12 z-20 p-1 sm:p-1 md:p-2 lg:p-[10px] rounded-full bg-white shadow-md transition ${
                currentIndex === 0 ? "hidden" : "block"
              }`}
              aria-label="Previous Slide"
            >
              <IoIosArrowBack className="text-base md:text-xl lg:text-2xl" />
            </button>

            <button
              onClick={() => sliderRef.current.slickNext()}
              className={`absolute top-1/2 transform -translate-y-1/2 -mt-6 -right-4 sm:right-8 md:right-3 lg:right-11 z-20 p-1 sm:p-1 md:p-2 lg:p-[10px] rounded-full bg-white shadow-md transition ${
                currentIndex >= topReviews.length - settings.slidesToShow
                  ? "hidden"
                  : "block"
              }`}
              aria-label="Next Slide"
            >
              <IoIosArrowForward className="text-base md:text-xl lg:text-2xl" />
            </button>
          </>
        ) : (
          <div className="flex justify-center items-center">
            <h1 className="text-2xl md:text-2xl lg:text-3xl text-center mt-28 font-medium text-white font-poppins dark:text-white">
            There are no reviews yet!
          </h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default Testimonials;
