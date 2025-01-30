import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import useBrands from "../../hooks/useBrands";

const AllBrands = () => {
  const sliderRef = useRef(null);
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [brands] = useBrands();

  const settings = {
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
    centerMode: true,
    centerPadding: "8%",
    arrows: false,
    dots: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          centerPadding: "10%",
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 3,
          centerPadding: "10%",
        },
      },
      {
        breakpoint: 710,
        settings: {
          slidesToShow: 2,
          centerPadding: "15%",
        },
      },
      {
        breakpoint: 510,
        settings: {
          slidesToShow: 1,
          centerPadding: "15%",
        },
      },
    ],
    afterChange: (index) => {
      const slider = sliderRef.current;
      if (slider) {
        const lastSlide =
          slider.innerSlider.state.slideCount - settings.slidesToShow;

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
    <div className="w-11/12 mx-auto relative mt-20">
      <h2 className="text-center text-lg md:text-xl lg:text-4xl font-bold mb-10">
        Our Top Brands
      </h2>
      {brands && brands.length > 0 ? (
        <div className="relative">
          <Slider {...settings} ref={sliderRef}>
            {brands.map((brand) => (
              <div key={brand.brand_id} className="px-2">
                <Link to={`/brandDetail/${brand.name}`} className="block mx-[3px]">
                  <div className="bg-white group shadow-lg border rounded-lg p-4 h-48 flex flex-col items-center justify-center">
                    <img
                      src={brand?.brand_logo_url}
                      alt={brand?.name}
                      className="w-32 h-32 rounded-full object-cover transition-transform group-hover:scale-110 mb-2"
                      loading="lazy"
                    />
                    <h3 className="text-center text-base font-semibold text-gray-700">
                      {brand?.name}
                    </h3>
                  </div>
                </Link>
              </div>
            ))}
          </Slider>
          <button
            ref={prevRef}
            onClick={() => sliderRef.current.slickPrev()}
            className="absolute top-1/2 left-0 z-20 p-2 rounded-full bg-[#FEF987] shadow-md transition-transform transform -translate-y-1/2 hover:scale-110"
            aria-label="Previous Slide"
            role="button"
            style={{ display: "none" }}
          >
            <IoIosArrowBack className="text-xl" />
          </button>
          <button
            ref={nextRef}
            onClick={() => sliderRef.current.slickNext()}
            className="absolute top-1/2 right-0 z-20 p-2 rounded-full bg-[#FEF987] shadow-md transition-transform transform -translate-y-1/2 hover:scale-110"
            aria-label="Next Slide"
            role="button"
          >
            <IoIosArrowForward className="text-xl" />
          </button>
        </div>
      ) : (
        <p className="text-center text-gray-500">No brands available.</p>
      )}
    </div>
  );
};

export default AllBrands;
