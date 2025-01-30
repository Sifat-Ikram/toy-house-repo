import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import useCategory from "../../hooks/useCategory";

const TopCategories = () => {
  const sliderRef = useRef(null);
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [categories] = useCategory();

  const settings = {
    slidesToShow: 6,
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

  if (!categories) return <div>Loading...</div>;

  return (
    <div className="w-11/12 mx-auto relative">
      <h2 className="text-lg md:text-xl lg:text-4xl mb-10 font-bold text-center font-poppins">
        Top Categories
      </h2>
      {categories.length > settings.slidesToShow && (
        <>
          <button
            ref={prevRef}
            onClick={() => sliderRef.current.slickPrev()}
            className="custom-prev absolute top-2/3 -translate-y-1/2 -left-2 -mt-4 p-2 rounded-full z-20 bg-[#FEF987]"
            aria-label="Previous Slide"
            style={{ display: "none" }}
          >
            <IoIosArrowBack className="text-xl" />
          </button>
          <button
            ref={nextRef}
            onClick={() => sliderRef.current.slickNext()}
            className="custom-next absolute top-2/3 -translate-y-1/2 -right-3 -mt-4 p-2 rounded-full z-20 bg-[#FEF987]"
            aria-label="Next Slide"
          >
            <IoIosArrowForward className="text-xl" />
          </button>
        </>
      )}
      <Slider {...settings} ref={sliderRef}>
        {categories?.map((category) => (
          <div key={category.category_id}>
            <Link to={`/categoryDetail/${category.name}`} className="block">
              <div className="bg-transparent group rounded-full h-48 flex flex-col items-center justify-center">
                <img
                  src={category.category_logo_url || ""}
                  alt={`${category.name || "Category"} Logo`}
                  className="w-32 h-32 rounded-full object-cover transition-transform group-hover:scale-110 mb-2"
                  loading="lazy"
                />
                <h3 className="text-center font-roboto font-bold">{category.name}</h3>
              </div>
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default TopCategories;
