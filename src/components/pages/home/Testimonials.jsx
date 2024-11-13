import { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import image from "../../../assets/wheels/testimonial.png";

const Testimonials = () => {
  const axiosPublic = useAxiosPublic();
  const sliderRef = useRef(null);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const {
    data: reviews = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const res = await axiosPublic.get("/review");
      return res.data;
    },
  });

  if (isLoading) return <p>Loading reviews...</p>;
  if (isError) return <p>Failed to load reviews.</p>;

  const settings = {
    infinite: false,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
    afterChange: (index) => {
      const slider = sliderRef.current;
      if (slider) {
        const { slideCount } = slider.innerSlider.state;
        const lastSlide = slideCount - settings.slidesToShow;
        if (prevRef.current)
          prevRef.current.style.display = index === 0 ? "none" : "block";
        if (nextRef.current)
          nextRef.current.style.display = index >= lastSlide ? "none" : "block";
      }
    },
  };

  return (
    <div
      className=""
      style={{
        backgroundImage: `url(${image})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
        backgroundPosition: "top center",
        minHeight: "70vh",
        margin: 0,
        padding: 0,
      }}
    >
      <div className="w-4/5 mx-auto border-t-2 pt-10 border-white border-solid flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
        <div className="w-full md:w-1/3 text-center md:text-left">
          <h1 className="text-xl md:text-3xl text-right lg:mr-10 lg:text-4xl font-coiny mb-2 md:mb-0">
            Listen to Our Customers
          </h1>
        </div>
        <div className="relative w-full sm:w-2/3">
          <div className="slider-container relative px-6">
            {reviews.length ? (
              <Slider {...settings} ref={sliderRef} className="flex space-x-4">
                {reviews.slice(0, 8).map((review) => (
                  <div
                    key={review._id}
                    className="rounded-2xl w-[300px] p-4 bg-white shadow flex flex-col space-y-3"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={review.image}
                        className="h-10 w-10 md:h-12 md:w-12 rounded-full"
                        alt={review.username}
                      />
                      <h1 className="text-lg md:text-xl font-coiny">
                        {review.username}
                      </h1>
                    </div>
                    <div className="flex flex-col justify-between h-[150px]">
                      <p className="text-sm md:text-base">{review.text}</p>
                      <h1 className="text-sm md:text-base mt-auto">
                        <span className="font-bold">Product:</span>{" "}
                        {review.productName}
                      </h1>
                    </div>
                  </div>
                ))}
              </Slider>
            ) : (
              <p className="text-center">No reviews available</p>
            )}
            <button
              ref={prevRef}
              onClick={() => sliderRef.current.slickPrev()}
              className="custom-prev absolute top-1/2 -translate-y-1/2 left-[30px] md:left-[20px] lg:left-[-30px] z-20 p-3 md:p-1 sm:p-3 lg:p-4 rounded-full bg-white shadow-md transition"
              aria-label="Previous Slide"
              style={{ display: "none" }}
            >
              <IoIosArrowBack className="text-xl" />
            </button>
            <button
              ref={nextRef}
              onClick={() => sliderRef.current.slickNext()}
              className="custom-next absolute top-1/2 -translate-y-1/2 right-[30px] md:right-[20px] lg:right-[-30px] z-20 p-3 md:p-1 sm:p-3 lg:p-4 rounded-full bg-white shadow-md transition"
              aria-label="Next Slide"
            >
              <IoIosArrowForward className="text-xl" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
