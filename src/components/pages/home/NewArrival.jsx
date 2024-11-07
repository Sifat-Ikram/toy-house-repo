import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";
import { useRef } from "react";

const NewArrival = () => {
  const axiosPublic = useAxiosPublic();
  const sliderRef = useRef(null);

  const { data: arrivals = [] } = useQuery({
    queryKey: ["arrival._id"],
    queryFn: async () => {
      const res = await axiosPublic.get("/product");
      return res.data;
    },
  });

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
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
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
    <div className="bg-white p-3 rounded-md">
      <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal text-center font-coiny mb-6 sm:mb-12 md:mb-16">
        New Arrivals
      </h2>
      <div className="relative w-full sm:w-4/5 mx-auto">
        <Slider ref={sliderRef} {...settings}>
          {arrivals.slice(0, 6)?.map((arrival) => (
            <div key={arrival._id} className="px-2">
              <Link to={`/detailsPage/${arrival._id}`}>
                <div className="rounded-lg hover:shadow-xl overflow-hidden transition-transform duration-300 hover:scale-105">
                  <img
                    src={arrival.image}
                    alt={arrival.name}
                    className="object-cover rounded-t-md w-full h-[100px] sm:h-[150px] md:h-[200px] lg:h-[386px]"
                  />
                  <div className="p-2 text-left">
                    <h3 className="text-[12px] sm:text-sm md:text-[18px] lg:text-[22px] font-normal font-coiny">
                      {arrival.name}
                    </h3>
                    <p className="text-[10px] sm:text-sm md:text-base lg:text-lg text-gray-800 mb-1">
                      Category: {arrival.category}
                    </p>
                    <button className="flex justify-center items-center gap-1 text-[10px] sm:text-sm md:text-base lg:text-lg text-gray-800 mb-1">
                      Buy Now <IoIosArrowForward size={20} />
                    </button>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </Slider>

        <button
          ref={prevRef}
          onClick={() => sliderRef.current.slickPrev()}
          className="custom-prev absolute top-1/2 -translate-y-1/2 left-0 z-20 p-3 border-[#FFEFBF] sm:p-4 md:p-5 rounded-full bg-[#FFEFBF] shadow-md transition"
          aria-label="Previous Slide"
          style={{ display: "none" }}
        >
          <IoIosArrowBack className="text-xl sm:text-3xl md:text-2xl lg:text-4xl" />
        </button>
        <button
          ref={nextRef}
          onClick={() => sliderRef.current.slickNext()}
          className="custom-next absolute top-1/2 -translate-y-1/2 right-0 z-20 p-3 border-[#FFEFBF] sm:p-4 md:p-5 rounded-full bg-[#FFEFBF] shadow-md transition"
          aria-label="Next Slide"
        >
          <IoIosArrowForward className="text-xl sm:text-3xl md:text-2xl lg:text-4xl" />
        </button>
      </div>
    </div>
  );
};

export default NewArrival;
