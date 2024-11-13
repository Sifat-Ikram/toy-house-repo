import { useRef, useState } from "react";
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
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const [currentIndex, setCurrentIndex] = useState(0);

  // const discount = "15";

  const settings = {
    infinite: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
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
    <div className="bg-[#5B95FF] pt-20">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-normal text-center font-coiny mb-8 sm:mb-14">
        Hot Wheels Collection
      </h1>
      <div className="sm:w-11/12 md:w-4/5 border-b-2 pb-20 border-white border-solid w-full mx-auto flex flex-col sm:flex-row gap-8 sm:gap-3 lg:gap-5">
        <div className="w-full sm:w-2/5 max-sm:w-11/12 mx-auto">
          <img
            src={img}
            className="w-full h-auto rounded-md sm:h-[280px] md:h-[400px] lg:h-[530px]"
            alt="Main Collection"
          />
        </div>
        <div className="slider-container flex-1 sm:w-3/5 w-full relative">
          <Slider {...settings} ref={sliderRef} className="sm:h-[431px]">
            {categories.map((wheelItem) => (
              <Link key={wheelItem._id} to="/" className="max-sm:px-3">
                <div className="flex relative flex-col bg-white rounded-md p-2 mx-1 sm:p-3 lg:p-4 shadow space-y-4">
                  <img
                    src={wheelItem.image}
                    className="w-full md:h-[150px] lg:h-[200px] rounded-md"
                    alt={wheelItem.name}
                  />
                  <div className="absolute top-2 left-2 bg-red-600 px-[7px] py-[2px] rounded-sm">
                    <h1 className="text-white text-[8px] sm:text-[10px] md:text-[12px]">
                      Save {wheelItem.discount}%
                    </h1>
                  </div>
                  <div className="space-y-2">
                    <h1
                      className="font-roboto text-xs sm:text-base md:text-lg lg:text-xl font-bold text-left
    min-h-[40px] sm:min-h-[50px] md:min-h-[60px] lg:min-h-[70px] 
    max-h-[60px] sm:max-h-[70px] md:max-h-[80px] lg:max-h-[90px]
    leading-tight sm:leading-snug md:leading-normal lg:leading-relaxed 
    tracking-wide sm:tracking-normal md:tracking-tight lg:tracking-tight"
                    >
                      {wheelItem.name}
                    </h1>
                    <p
                      className="text-[6px] sm:text-[8px] md:text-[10px] lg:text-sm 
    leading-[1.4] sm:leading-[1.5] md:leading-[1.6] lg:leading-relaxed"
                    >
                      Lorem ipsum dolor sit amet consectetur. Sed id cum erat
                      pellentesque quisque mauris id enim aliquam. Morbi rutrum
                      ipsum duis magna.
                    </p>
                    <button
                      className="border-l-4 border-solid border-[#3E3E3E] p-2 sm:p-3 shadow font-roboto text-xs sm:text-sm 
    leading-snug sm:leading-normal md:leading-relaxed lg:leading-loose"
                    >
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
            className={`custom-prev ${
              currentIndex === 0 ? "hidden" : "block"
            } absolute top-1/2 -translate-y-1/2 left-0 z-20 p-3 md:p-1 sm:p-3 lg:p-4 rounded-full bg-white shadow-md transition`}
            aria-label="Previous Slide"
            style={{ display: currentIndex === 0 ? "none" : "block" }}
          >
            <IoIosArrowBack className="text-xl" />
          </button>
          <button
            ref={nextRef}
            onClick={() => sliderRef.current.slickNext()}
            className="custom-next absolute top-1/2 -translate-y-1/2 right-0 z-20 p-3 md:p-1 sm:p-3 lg:p-4 rounded-full bg-white shadow-md transition"
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
