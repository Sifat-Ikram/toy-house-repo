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
    centerPadding: "15%",
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
          slidesToShow: 4,
          centerPadding: "5%",
        },
      },
      {
        breakpoint: 420,
        settings: {
          slidesToShow: 2.5,
          centerPadding: "5%",
        },
      }
    ],
    afterChange: (index) => {
      const { innerSlider } = sliderRef.current || {};
      if (!innerSlider) return;
      const { slideCount } = innerSlider.state;
      const lastSlide = slideCount - settings.slidesToShow;

      if (prevRef.current) {
        prevRef.current.style.display = index === 0 ? "none" : "block";
      }
      if (nextRef.current) {
        nextRef.current.style.display = index >= lastSlide ? "none" : "block";
      }
    },
  };

  return (
    <div className="w-11/12 mx-auto relative space-y-5 sm:space-y-7 md:space-y-9">
      <h2 className="text-center text-lg md:text-xl lg:text-4xl font-bold font-poppins">
        Our Top Brands
      </h2>
      <div className="flex justify-between items-center">
        <button
            ref={prevRef}
            onClick={() => sliderRef.current.slickPrev()}
            className="custom-prev absolute top-2/3 -translate-y-1/2 -left-2 p-2 rounded-full z-20 bg-[#FEF987]"
            aria-label="Previous Slide"
            style={{ display: "none" }}
          >
            <IoIosArrowBack className="text-xl" />
          </button>
          <button
            ref={nextRef}
            onClick={() => sliderRef.current.slickNext()}
            className="custom-next absolute top-2/3 -translate-y-1/2 -right-3 p-2 rounded-full z-20 bg-[#FEF987]"
            aria-label="Next Slide"
          >
            <IoIosArrowForward className="text-xl" />
          </button>
      </div>
      <Slider {...settings} ref={sliderRef}>
        {brands?.map((brand) => (
          <div key={brand.brand_id}>
            <Link to={`/brandDetail/${brand.brand_id}`} className="block">
              <div className="bg-transparent group rounded-full flex flex-col items-center justify-center">
                <img
                  src={brand.brand_logo_url || ""}
                  alt={`${brand.name || "Brand"} Logo`}
                  className="w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-full object-cover transition-transform group-hover:scale-110"
                  loading="lazy"
                />
                <h3 className="text-center font-roboto font-bold mt-2">
                  {brand.name}
                </h3>
              </div>
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default AllBrands;
