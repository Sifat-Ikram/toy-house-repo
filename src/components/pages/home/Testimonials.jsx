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
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    dots: false,
    infinite: false,
    afterChange: (index) => setCurrentIndex(index),
    responsive: [
      { breakpoint: 1700, settings: { slidesToShow: 2 } }, // Mobile
      { breakpoint: 768, settings: { slidesToShow: 3 } }, // Mobile
      { breakpoint: 510, settings: { slidesToShow: 2.5 } }, // Mobile
      { breakpoint: 440, settings: { slidesToShow: 2 } }, // Mobile
    ],
  };

  return (
    <div className="relative z-30 w-full flex flex-col lg:flex-row items-center bg-[#31b2f3] h-full max-lg:space-y-5 lg:space-x-5 justify-center bg-no-repeat pt-14 px-6 overflow-hidden">
      {/* Text Section - 40% Width */}
      <div className="w-full lg:w-2/5 text-center lg:text-left lg:mb-0">
        <div className="w-11/12 mx-auto">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white font-poppins">
            Listen to Our Customers
          </h1>
          <p className="mt-4 text-white text-sm md:text-base">
            Our customers love our toys! Read their reviews to see why they keep
            coming back.
          </p>
        </div>
      </div>

      {/* Slider Section - 60% Width */}
      <div className="w-full lg:w-3/5 relative pb-14">
        {topReviews.length > 0 ? (
          <>
            <Slider ref={sliderRef} {...settings}>
              {topReviews.map((review) => (
                <div key={review.id} className="">
                  <div className="bg-white dark:bg-white rounded-2xl p-3 sm:p-3 md:p-4 shadow-lg flex flex-col justify-between h-[140px] sm:h-[180px] w-[150px] sm:w-[180px] md:w-[300px] md:h-[200px] lg:w-[300px] lg:h-[250px] space-y-2 md:space-y-4">
                    <div className="dark:text-black">
                      <h2 className="text-xs sm:text-sm md:text-lg lg::text-xl font-poppins">
                        {review.username || "Anonymous"}
                      </h2>
                      <div className="flex space-x-1 -mt-1 mb-3">
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
              className={`absolute top-1/2 -translate-y-1/2 -mt-9 -left-3 sm:-left-5 md:-left-4 p-1 sm:p-2 md:p-[10px] bg-white shadow-md rounded-full transition ${
                currentIndex === 0 ? "hidden" : "block"
              }`}
              aria-label="Previous Slide"
            >
              <IoIosArrowBack className="text-2xl" />
            </button>

            <button
              onClick={() => sliderRef.current.slickNext()}
              className={`absolute top-1/2 -translate-y-1/2 -mt-9 -right-2 md:right-7 lg:right-8 p-1 sm:p-2 md:p-[10px] bg-white shadow-md rounded-full transition ${
                currentIndex >= topReviews.length - settings.slidesToShow
                  ? "hidden"
                  : "block"
              }`}
              aria-label="Next Slide"
            >
              <IoIosArrowForward className="text-2xl" />
            </button>
          </>
        ) : (
          <h1 className="text-2xl md:text-2xl lg:text-3xl text-center mt-10 font-medium text-white font-poppins dark:text-white">
            There is no reviews yet!
          </h1>
        )}
      </div>
    </div>
  );
};

export default Testimonials;
