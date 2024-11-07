import { useRef } from "react";
import Slider from "react-slick";
import useCategory from "../../hooks/useCategory";
import img from "../../../assets/wheels/bceae26d8bd63758f5f292fb13d2e95d.jpeg";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const WheelsCollection = () => {
  const [categories] = useCategory();
  const sliderRef = useRef(null);

  const discount = "15";

  const settings = {
    infinite: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
    ],
    afterChange: (index) => {
      const slider = sliderRef.current;
      if (slider) {
        const { slideCount } = slider.innerSlider.state;
        const lastSlide = slideCount - settings.slidesToShow;
        prevRef.current.style.display = index === 0 ? "none" : "block";
        nextRef.current.style.display = index >= lastSlide ? "none" : "block";
      }
    },
  };

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <div>
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-normal text-center font-coiny mb-8 sm:mb-14">
        Hot Wheels Collection
      </h1>
      <div className="md:w-11/12 w-full mx-auto flex flex-col sm:flex-row gap-8 sm:gap-4 md:gap-6">
        {/* Main Collection Image - 40% Width */}
        <div className="w-full sm:w-2/5 max-sm:w-11/12 mx-auto">
          <img
            src={img}
            className="w-full h-[250px] sm:h-[431px] object-cover"
            alt="Main Collection"
          />
        </div>

        {/* Carousel for Wheels Collection - 60% Width */}
        <div className="slider-container w-full sm:w-3/5 relative">
          <Slider {...settings} ref={sliderRef} className="sm:h-[431px]">
            {categories.map((wheelItem) => (
              <Link key={wheelItem._id} to="/" className="max-sm:px-3">
                <div className="flex relative flex-col h-[431px] bg-white p-2 md:p-3 lg:p-5 shadow space-y-5">
                  <img
                    src={wheelItem.image}
                    className="w-full h-[200px] rounded-md"
                    alt={wheelItem.name}
                  />
                  <div className="absolute top-40 left-0 bg-red-600 px-[7px] py-[2px] rounded-sm">
                    <h1 className="text-white text-[8px]">Save {discount}%</h1>
                  </div>
                  <div className="space-y-3">
                    <h1 className="font-roboto text-sm sm:text-base md:text-lg lg:text-2xl font-normal">
                      {wheelItem.name}
                    </h1>
                    <p className="text-[8px] sm:text-xs">
                      Lorem ipsum dolor sit amet consectetur. Sed id cum erat
                      pellentesque quisque mauris id enim aliquam. Morbi rutrum
                      ipsum duis magna.
                    </p>
                    <button className="border-l-4 border-solid border-[#3E3E3E] p-2 sm:p-3 shadow font-roboto text-xs sm:text-sm">
                      GET NOW
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </Slider>

          <button
            ref={prevRef}
            onClick={() => sliderRef.current.slickPrev()}
            className="custom-prev absolute top-1/2 -translate-y-1/2 left-0 z-20 p-1 rounded-full bg-[#f3d67fd3] shadow-md transition"
            aria-label="Previous Slide"
            style={{ display: "none" }}
          >
            <IoIosArrowBack className="text-xl" />
          </button>
          <button
            ref={nextRef}
            onClick={() => sliderRef.current.slickNext()}
            className="custom-next absolute top-1/2 -translate-y-1/2 right-0 z-20 p-1 rounded-full bg-[#f3d67fd3] shadow-md transition"
            aria-label="Next Slide"
          >
            <IoIosArrowForward className="text-xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default WheelsCollection;