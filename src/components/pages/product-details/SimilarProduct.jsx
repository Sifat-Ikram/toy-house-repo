import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Link } from "react-router-dom";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import useByCategory from "../../hooks/by-filter/useByCategory";
import CardHome from "../../hooks/CardHome";

const SimilarProduct = ({ id, productId }) => {
  const [categoryProducts] = useByCategory({ id });
  const [slidesPerView, setSlidesPerView] = useState(2);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [totalSlides, setTotalSlides] = useState(0);
  const swiperRef = useRef(null);

  const normalizedProductId = Number(productId); // Convert productId to number
  const filterProducts = categoryProducts.filter(
    (product) => Number(product.id) !== normalizedProductId
  );

  return (
    <div className="bg-white dark:bg-white dark:text-black mb-10">
      <div className="w-11/12 mx-auto">
        <h2 className="mb-5 text-lg md:text-xl lg:text-3xl font-bold font-poppins text-gray-800 dark:text-gray-800">
          You may also like
        </h2>

        <div className="relative w-5/6 lg:w-11/12 mx-auto">
          <Swiper
            ref={swiperRef}
            slidesPerView={slidesPerView}
            spaceBetween={15}
            onSwiper={(swiper) => {
              setTotalSlides(swiper.slides.length);
              setSlidesPerView(swiper.params.slidesPerView);
            }}
            onSlideChange={(swiper) => setCurrentIndex(swiper.activeIndex)}
            breakpoints={{
              1920: { slidesPerView: 6, spaceBetween: 20 }, // For 1080p and higher
              1280: { slidesPerView: 5, spaceBetween: 18 }, // Large desktops
              1024: { slidesPerView: 4, spaceBetween: 15 }, // Laptops (720p & 1080p)
              768: { slidesPerView: 3, spaceBetween: 12 }, // Tablets
              500: { slidesPerView: 2, spaceBetween: 10 }, // Small screens
            }}
            modules={[Navigation]}
            className="mySwiper"
          >
            {filterProducts?.length === 0 ? (
              <div className="text-center text-gray-500 dark:text-gray-700">
                No similar products available at the moment.
              </div>
            ) : (
              filterProducts?.map((featured) => (
                <SwiperSlide
                  key={featured.id}
                  className="shadow mb-2 rounded-lg"
                >
                  <Link
                    to={`/productDetail/${featured.id}`}
                    onClick={() => window.scrollTo(0, 0)}
                  >
                    <CardHome featured={featured} />
                  </Link>
                </SwiperSlide>
              ))
            )}
          </Swiper>

          {/* Left Button - Show only if not on the first slide */}
          {currentIndex > 0 && (
            <button
              className="custom-prev absolute top-1/2 -translate-y-1/2 max-sm:-mt-3 -left-[30px] sm:-left-[38px] md:-left-[43px] lg:-left-[50px] z-20 p-1 sm:p-1 md:p-[6px] lg:p-2 rounded-full bg-[#FEF987] shadow-md transition"
              aria-label="Previous Slide"
              onClick={() => swiperRef.current.swiper.slidePrev()}
            >
              <IoIosArrowBack className="text-xl sm:text-3xl md:text-2xl lg:text-4xl" />
            </button>
          )}

          {/* Right Button - Hide if last slide is fully visible */}
          {currentIndex < totalSlides - slidesPerView && (
            <button
              className="custom-next absolute top-1/2 -translate-y-1/2 max-sm:-mt-3 -right-[30px] sm:-right-[38px] md:-right-[43px] lg:-right-[50px] z-20 p-1 sm:p-1 md:p-[6px] lg:p-2 rounded-full bg-[#FEF987] shadow-md transition"
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
