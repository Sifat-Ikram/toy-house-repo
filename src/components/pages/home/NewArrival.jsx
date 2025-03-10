import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Link } from "react-router-dom";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import useNewProducts from "../../hooks/useNewProducts";

const NewArrival = () => {
  const [newProducts] = useNewProducts();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [totalSlides, setTotalSlides] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(2);
  const swiperRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
    }, 500);
  }, []);

  if (!newProducts || newProducts.length === 0) {
    return (
      <h1 className="text-center font-roboto text-lg font-normal">
        No new arrivals at the moment.
      </h1>
    );
  }

  return (
    <div className="w-full space-y-8 sm:space-y-10 md:space-y-14 py-10 sm:py-14 md:py-20 bg-[#f5f5f5]">
      <h2 className="mb-10 text-xl md:text-2xl lg:text-4xl font-bold text-center font-poppins">
        New Arrivals
      </h2>

      <div className="relative w-11/12 sm:w-5/6 mx-auto">
        <Swiper
          ref={swiperRef}
          slidesPerView={slidesPerView}
          spaceBetween={10}
          onSwiper={(swiper) => {
            setTotalSlides(swiper.slides.length);
            setSlidesPerView(swiper.params.slidesPerView);
          }}
          onSlideChange={(swiper) => setCurrentIndex(swiper.activeIndex)}
          breakpoints={{
            1750: { slidesPerView: 6, slidesPerGroup: 1, spaceBetween: 30 },
            1600: { slidesPerView: 6, slidesPerGroup: 1, spaceBetween: 20 },
            1400: { slidesPerView: 5, slidesPerGroup: 1, spaceBetween: 15 },
            900: { slidesPerView: 4, slidesPerGroup: 1, spaceBetween: 20 },
            500: { slidesPerView: 3, slidesPerGroup: 1, spaceBetween: 5 },
          }}
          modules={[Navigation]}
          className="mySwiper"
        >
          {newProducts?.map((featured) => (
            <SwiperSlide key={featured.id} className="shadow mb-2 rounded-lg">
              <Link to={`/productDetail/${featured.id}`}>
                <div className="overflow-hidden group rounded-lg">
                  <div className="w-full h-[150px] md:h-[170px] lg:h-[200px]">
                    <img
                      src={featured.display_image_url}
                      alt={featured?.product_name}
                      loading="lazy"
                      className="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <div className="max-lg:py-3 px-1 sm:px-2 lg:p-4 text-left space-y-[5px]">
                    <p className="text-[13px] font-roboto line-clamp-1">
                      {featured?.brand_name || " "}
                    </p>
                    <h3 className="text-base sm:text-lg md:text-xl line-clamp-1 lg:text-lg font-bold font-poppins">
                      {featured?.product_name
                        ? featured?.product_name
                        : "No Name Available"}
                    </h3>
                    <p className="text-sm md:text-base lg:text-lg font-medium font-roboto mb-1">
                      {featured?.category_name}
                    </p>
                    <p className="text-xs md:text-sm lg:text-lg font-normal font-roboto mb-1">
                      BDT {featured?.selling_price}
                    </p>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Left Button - Show only if not on the first slide */}
        {currentIndex > 0 && (
          <button
            className="custom-prev absolute top-1/2 -translate-y-1/2 -left-5 sm:-left-8 md:-left-10 lg:-left-12 z-20 p-1 sm:p-1 md:p-2 lg:p-3 rounded-full bg-[#FEF987] shadow-md transition"
            aria-label="Previous Slide"
            onClick={() => swiperRef.current.swiper.slidePrev()}
          >
            <IoIosArrowBack className="text-xl sm:text-3xl md:text-2xl lg:text-4xl" />
          </button>
        )}

        {/* Right Button - Hide if last slide is fully visible */}
        {currentIndex < totalSlides - slidesPerView && (
          <button
            className="custom-next absolute top-1/2 -translate-y-1/2 -right-4 sm:-right-8 md:-right-10 lg:-right-12 z-20 p-1 sm:p-1 md:p-2 lg:p-3 rounded-full bg-[#FEF987] shadow-md transition"
            aria-label="Next Slide"
            onClick={() => swiperRef.current.swiper.slideNext()}
          >
            <IoIosArrowForward className="text-xl sm:text-3xl md:text-2xl lg:text-4xl" />
          </button>
        )}
      </div>
    </div>
  );
};

export default NewArrival;
