import { useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import image from "../../../assets/wheels/testimonial.png";
import person from "../../../assets/wheels/man-7799486_1280.webp";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const Testimonials = () => {
  const sliderRef = useRef(null);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const [currentIndex, setCurrentIndex] = useState(0);

  const reviews = [
    {
      id: "1",
      image: person,
      username: "Kawsar Ovi",
      review:
        "This toy is fantastic! My kid loves it and plays with it every day.",
      background: "#f5f5f5",
      productName: "Super Toy Robot",
    },
    {
      id: "2",
      image: person,
      username: "Robin Ahmed",
      review:
        "Great quality and very educational. My child learned a lot from this toy.",
      background: "#e0e0e0",
      productName: "Learning Blocks",
    },
    {
      id: "3",
      image: person,
      username: "Kawsar Ovi",
      review:
        "Good fun but a bit too complex for younger kids. Still, it's very engaging.",
      background: "#d1e7dd",
      productName: "Puzzle Adventure",
    },
    {
      id: "4",
      image: person,
      username: "Robin Ahmed",
      review: "This toy is so colorful and fun. My daughter adores it!",
      background: "#f8d7da",
      productName: "Colorful Dollhouse",
    },
    {
      id: "5",
      image: person,
      username: "Kawsar Ovi",
      review:
        "Perfect for my son's birthday. He couldn't stop smiling while playing with it!",
      background: "#d1f2d6",
      productName: "Birthday Party Set",
    },
  ];

  const settings = {
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: false,
    dots: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 760,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 515,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
    afterChange: (index) => {
      setCurrentIndex(index);

      const slider = sliderRef.current;
      if (slider) {
        const { slideCount } = slider.innerSlider.state;
        const lastSlide = slideCount - settings.slidesToShow;

        prevRef.current.style.display = index === 0 ? "none" : "block";
        nextRef.current.style.display = index >= lastSlide ? "none" : "block";
      }
    },
  };

  return (
    <div className="relative flex flex-col items-center justify-center z-20">
      <div className="z-30 w-full pt-16 sm:py-[70px] flex flex-col lg:flex-row items-center space-y-4 sm:space-y-0">
        <div className="w-full lg:w-1/2">
          <h1 className="text-xl md:text-2xl text-center font-bold text-white lg:text-4xl font-poppins mb-10 lg:mb-0">
            Listen to Our Customers
          </h1>
        </div>
        <div className="w-4/5 sm:w-3/5 md:w-5/6 max-lg:mx-auto lg:w-1/2">
          <div className="slider-container">
            {reviews.length ? (
              <>
                <Slider ref={sliderRef} {...settings}>
                  {reviews.slice(0, 8).map((review) => (
                    <div key={review.id}>
                      <div
                        className="rounded-2xl w-11/12 sm:w-[180px] md:w-[200px] lg:w-[300px] p-4 bg-white shadow flex flex-col space-y-3"
                        style={{ backgroundColor: review.background }}
                      >
                        <div className="flex items-center gap-3 sm:gap-1 md:gap-[6px] lg:gap-3">
                          <img
                            src={
                              review.image || "https://via.placeholder.com/150"
                            }
                            className="h-5 w-5 md:h-8 md:w-8 lg:h-12 lg:w-12 rounded-full object-cover"
                            alt={review.username || "user"}
                          />
                          <h1 className="text-xs sm:text-sm md:text-lg lg::text-xl font-poppins font-coiny">
                            {review.username || "Anonymous"}
                          </h1>
                        </div>
                        <div className="flex flex-col justify-between h-[150px]">
                          <p className="text-[10px] sm:text-xs lg:text-sm font-roboto">
                            {review.review || "No feedback provided."}
                          </p>
                          <h1 className="text-xs sm:text-sm md:text-base mt-auto">
                            <span className="font-bold">Product:</span>{" "}
                            {review.productName || "N/A"}
                          </h1>
                        </div>
                      </div>
                    </div>
                  ))}
                </Slider>
                <button
                  ref={prevRef}
                  onClick={() => sliderRef.current.slickPrev()}
                  className={`custom-prev ${
                    currentIndex === 0 ? "hidden" : "block"
                  } absolute max-md:mt-8 md:-mt-3 top-1/2 left-0 sm:left-20 md:left-6 lg:left-[635px]
                   z-20 p-2 lg:p-4 rounded-full bg-white shadow-md transition`}
                  aria-label="Previous Slide"
                >
                  <IoIosArrowBack className="text-xl" />
                </button>
                <button
                  ref={nextRef}
                  onClick={() => sliderRef.current.slickNext()}
                  className={`custom-next ${
                    currentIndex >=
                    sliderRef.current?.innerSlider?.state.slideCount -
                      settings.slidesToShow
                      ? "hidden"
                      : "block"
                  } absolute max-md:mt-8 md:-mt-3 top-1/2 right-5 sm:right-20 md:right-14 lg:right-2 z-20 p-2 lg:p-4 rounded-full bg-white shadow-md transition`}
                  aria-label="Next Slide"
                >
                  <IoIosArrowForward className="text-xl" />
                </button>
              </>
            ) : (
              <p className="text-center">No reviews available</p>
            )}
          </div>
        </div>
      </div>
      <img
        src={image}
        className="absolute top-0 h-[480px] lg:h-[450px] w-full"
        alt="Testimonials Background"
      />
    </div>
  );
};

export default Testimonials;
