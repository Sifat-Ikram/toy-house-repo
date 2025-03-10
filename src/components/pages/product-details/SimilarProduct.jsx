import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Link } from "react-router-dom";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import useByCategory from "../../hooks/by-filter/useByCategory";

const SimilarProduct = ({ id }) => {
  const [categoryProducts] = useByCategory({ id });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [totalSlides, setTotalSlides] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(2);
  const swiperRef = useRef(null);

  useEffect(() => {
    if (swiperRef.current) {
      const swiperInstance = swiperRef.current.swiper;
      setTotalSlides(swiperInstance.slides.length);
      setSlidesPerView(swiperInstance.params.slidesPerView);
    }
  }, [categoryProducts]);
  

  return (
    <div className="py-12 md:py-14 lg:py-16 bg-white dark:bg-white dark:text-black">
      <div className="w-11/12 mx-auto">
        <h2 className="mb-5 text-lg md:text-xl lg:text-3xl font-bold font-poppins text-gray-800 dark:text-gray-800">
          You may also like
        </h2>

        <div className="relative w-full">
          <Swiper
            ref={swiperRef}
            slidesPerView={slidesPerView}
            spaceBetween={1}
            onSwiper={(swiper) => {
              setTotalSlides(swiper.slides.length);
              setSlidesPerView(swiper.params.slidesPerView);
            }}
            onSlideChange={(swiper) => setCurrentIndex(swiper.activeIndex)}
            breakpoints={{
              1750: { slidesPerView: 6, slidesPerGroup: 1, spaceBetween: 30 },
              1600: { slidesPerView: 6, slidesPerGroup: 1, spaceBetween: 20 },
              1400: { slidesPerView: 5, slidesPerGroup: 1, spaceBetween: 15 },
              900: { slidesPerView: 5, slidesPerGroup: 1, spaceBetween: 20 },
              500: { slidesPerView: 4, slidesPerGroup: 1, spaceBetween: 5 },
            }}
            modules={[Navigation]}
            className="mySwiper"
          >
            {categoryProducts?.length > 0 ? (
              categoryProducts?.map((featured) => (
                <SwiperSlide
                  key={featured.id}
                  className="shadow-lg rounded-xl max-sm:mx-2 max-lg:mx-4 overflow-hidden transform transition duration-300 hover:scale-105"
                >
                  <Link to={`/productDetail/${featured.id}`}>
                    <div className="group rounded-xl border mb-2 border-gray-200 dark:border-gray-200 dark:bg-white shadow-md hover:shadow-lg transition-all duration-300">
                      <div className="w-full h-[150px] md:h-[180px] lg:h-[220px] overflow-hidden rounded-t-xl">
                        <img
                          src={featured.display_image_url}
                          alt={featured?.product_name}
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                      </div>
                      <div className="p-3 md:p-4 space-y-2 text-left dark:bg-white">
                        <h3 className="text-base md:text-lg lg:text-xl font-semibold text-gray-800 dark:text-gray-800 line-clamp-1 transition-colors">
                          {featured?.product_name || "No Name Available"}
                        </h3>
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-600">
                          {featured?.category_name}
                        </p>
                        <p className="text-sm md:text-lg font-semibold text-gray-900 dark:text-gray-900">
                          BDT {featured?.selling_price}
                        </p>
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              ))
            ) : (
              <div className="w-full text-center py-10 text-gray-500 text-lg font-semibold">
                No similar products available.
              </div>
            )}
          </Swiper>

          {/* Left Button - Show only if not on the first slide */}
          {currentIndex > 0 && (
            <button
              className="custom-prev absolute top-1/2 -translate-y-1/2 -left-5 sm:-left-8 md:-left-10 lg:-left-12 z-20 p-3 sm:p-1 md:p-2 lg:p-3 rounded-full bg-[#FEF987] shadow-md transition"
              aria-label="Previous Slide"
              onClick={() => swiperRef.current.swiper.slidePrev()}
            >
              <IoIosArrowBack className="text-xl sm:text-3xl md:text-2xl lg:text-4xl" />
            </button>
          )}

          {/* Right Button - Hide if last slide is fully visible */}
          {currentIndex < totalSlides - slidesPerView && (
            <button
              className="custom-next absolute top-1/2 -translate-y-1/2 -right-4 sm:-right-8 md:-right-10 lg:-right-12 z-20 p-3 sm:p-1 md:p-2 lg:p-3 rounded-full bg-[#FEF987] shadow-md transition"
              aria-label="Next Slide"
              onClick={() => swiperRef.current.swiper.slideNext()}
            >
              <IoIosArrowForward className="text-xl sm:text-3xl md:text-2xl lg:text-4xl" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SimilarProduct;
