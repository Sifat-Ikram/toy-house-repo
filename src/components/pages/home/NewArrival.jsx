import { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import useNewProducts from "../../hooks/useNewProducts";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const NewArrival = () => {
  const sliderRef = useRef(null);
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [newProducts] = useNewProducts();
  

  const settings = {
    infinite: false,
    slidesToShow: 3,
    autoplay: false,
    autoplaySpeed: 2000,
    centerMode: false,
    // centerPadding: "9%",
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          infinite: true,
          slidesToShow: 3,
          slidesToScroll: 1,
          centerPadding: "10%",
        },
      },
      {
        breakpoint: 850,
        settings: {
          infinite: true,
          slidesToShow: 2,
          slidesToScroll: 1,
          centerPadding: "15%",
        },
      },
      {
        breakpoint: 600,
        settings: {
          infinite: true,
          slidesToShow: 1,
          slidesToScroll: 1,
          centerPadding: "28%",
        },
      },
      {
        breakpoint: 500,
        settings: {
          infinite: true,
          slidesToShow: 1,
          slidesToScroll: 1,
          centerPadding: "20%",
        },
      },
      {
        breakpoint: 400,
        settings: {
          infinite: true,
          slidesToShow: 1,
          slidesToScroll: 1,
          centerPadding: "20%",
        },
      },
    ],
    afterChange: (index) => {
      const slider = sliderRef.current;
      if (slider) {
        const { slideCount } = slider.innerSlider.state;
        const lastSlide = slideCount - settings.slidesToShow;

        if (prevRef.current) {
          prevRef.current.style.display = index === 0 ? "none" : "block";
        }
        if (nextRef.current) {
          nextRef.current.style.display = index >= lastSlide ? "none" : "block";
        }
      }
    },
  };

  return (
    <div className="py-20 space-y-6 md:space-y-8 rounded-md">
      <h2 className="text-lg md:text-xl lg:text-4xl mb-10 font-bold text-center font-poppins">
        New Arrivals
      </h2>

      <div className="relative w-full max-sm:px-4 sm:w-11/12 mx-auto">
        <Slider ref={sliderRef} {...settings}>
          {newProducts?.map((arrival) => (
            <div key={arrival.id} className="px-2">
              <div className="bg-white shadow w-full mx-[3px] rounded-md sm:rounded-lg md:rounded-xl lg:rounded-3xl overflow-hidden group">
                <img
                  src={arrival.display_image_url}
                  alt={arrival?.product_name}
                  className="object-cover  rounded-t-md sm:rounded-t-lg md:rounded-t-xl lg:rounded-t-3xl w-full h-[180px] md:h-[170px] lg:h-[200px] transition-transform duration-300 group-hover:scale-105"
                />
                <div className="p-4 text-left space-y-2">
                  <h3 className="text-[12px] sm:text-sm md:text-[16px] lg:text-[19px] font-bold font-poppins min-h-10">
                    {arrival?.product_name
                      ? arrival?.product_name.slice(0, 25)
                      : "No Name Available"}{" "}
                  </h3>
                  <p className="text-[9px] sm:text-xs md:text-sm lg:text-lg font-light font-roboto mb-1 min-h-16">
                    {arrival?.summary
                      ? arrival?.summary.slice(0, 65)
                      : "No Details Available"}{" "}
                  </p>
                  <Link to={`/productDetail/${arrival.id}`}>
                    <button className="flex justify-center buttons items-center shadow rounded-md sm:rounded-lg md:rounded-xl lg:rounded-3xl font-roboto gap-1 hover:scale-105 transition-transform">
                      View Details <IoIosArrowForward size={20} />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </Slider>

        <button
          ref={prevRef}
          onClick={() => sliderRef.current.slickPrev()}
          className="custom-prev absolute top-1/2 -translate-y-1/2 left-0 sm:-left-8 md:-left-10 lg:-left-12 z-20 p-3 sm:p-1 md:p-3 rounded-full bg-[#FEF987] shadow-md transition"
          aria-label="Previous Slide"
          style={{ display: "none" }}
        >
          <IoIosArrowBack className="text-xl sm:text-3xl md:text-2xl lg:text-4xl" />
        </button>

        <button
          ref={nextRef}
          onClick={() => sliderRef.current.slickNext()}
          className="custom-next absolute top-1/2 -translate-y-1/2 right-0 sm:-right-8 md:-right-10 lg:-right-12 z-20 p-3 sm:p-1 md:p-3 rounded-full bg-[#FEF987] shadow-md transition"
          aria-label="Next Slide"
        >
          <IoIosArrowForward className="text-xl sm:text-3xl md:text-2xl lg:text-4xl" />
        </button>
      </div>
    </div>
  );
};

export default NewArrival;
