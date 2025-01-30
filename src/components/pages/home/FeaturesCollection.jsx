import { useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick-theme.css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import useFeaturedCollection from "../../hooks/useFeaturedCollection";

const FeaturesCollection = () => {
  const sliderRef = useRef(null);
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [featuredProducts] = useFeaturedCollection();
  const [prevDisabled, setPrevDisabled] = useState(true); // Initially hidden
  const [nextDisabled, setNextDisabled] = useState(false);

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

        setPrevDisabled(index === 0);
        setNextDisabled(index >= lastSlide);
      }
    },
  };

  return (
    <div className=" w-full max-sm:px-4 sm:w-11/12 mx-auto py-20 space-y-6 md:space-y-8 border-b-[2px] border-solid border-white">
      <h2 className="mb-10 text-lg md:text-xl lg:text-4xl font-bold text-center font-poppins">
        Features Collection
      </h2>

      <div className="relative">
        <Slider ref={sliderRef} {...settings}>
          {featuredProducts.slice(0, 7).map((featured) => (
            <div key={featured.id} className="px-2">
              <div className="bg-white shadow rounded-md mx-[3px] sm:rounded-lg md:rounded-xl lg:rounded-3xl overflow-hidden group">
                <img
                  src={featured.display_image_url}
                  alt={featured?.product_name}
                  className="object-cover rounded-t-md sm:rounded-t-lg md:rounded-t-xl w-full h-[180px] md:h-[170px] lg:h-[200px] transition-transform duration-300 group-hover:scale-105"
                />
                <div className="p-4 text-left space-y-2">
                  <h3 className="text-[12px] sm:text-sm md:text-[17px] lg:text-xl font-bold font-poppins min-h-10">
                    {featured?.product_name
                      ? featured?.product_name.slice(0, 25)
                      : "No Name Available"}{" "}
                  </h3>
                  <p className="text-[9px] sm:text-xs md:text-sm lg:text-lg font-light mb-1 min-h-16">
                    {featured?.summary
                      ? featured?.summary.slice(0, 65)
                      : "No Details Available"}{" "}
                  </p>
                  <Link to={"/productDetail"}>
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
          className={`custom-prev absolute top-1/2 -translate-y-1/2 left-0 sm:-left-8 md:-left-10 lg:-left-12 
    z-20 p-3 rounded-full bg-[#FEF987] shadow-md transition duration-200 ${
      prevDisabled ? "hidden" : "block"
    }`}
          aria-label="Previous Slide"
          role="button"
          aria-disabled={prevDisabled}
        >
          <IoIosArrowBack className="text-xl sm:text-3xl md:text-2xl lg:text-4xl" />
        </button>

        <button
          ref={nextRef}
          onClick={() => sliderRef.current.slickNext()}
          className={`custom-next absolute top-1/2 -translate-y-1/2 right-0 sm:-right-8 md:-right-10 lg:-right-12 
    z-20 p-3 rounded-full bg-[#FEF987] shadow-md transition duration-200 ${
      nextDisabled ? "hidden" : "block"
    }`}
          aria-label="Next Slide"
          role="button"
          aria-disabled={nextDisabled}
        >
          <IoIosArrowForward className="text-xl sm:text-3xl md:text-2xl lg:text-4xl" />
        </button>
      </div>
    </div>
  );
};

export default FeaturesCollection;
