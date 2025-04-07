import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Link } from "react-router-dom";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import useNewProducts from "../../hooks/useNewProducts";
import CardHome from "../../hooks/CardHome";

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
    <div className="w-full space-y-8 sm:space-y-10 md:space-y-14 py-10 sm:py-14 md:py-20 bg-[#f5f5f5] dark:bg-[#f5f5f5]">
      <h2 className="mb-10 text-xl md:text-2xl lg:text-4xl font-bold text-center font-poppins">
        New Arrivals
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
          {newProducts?.map((featured) => (
            <SwiperSlide key={featured.id} className="shadow mb-2 rounded-lg">
              <Link to={`/productDetail/${featured.id}`}>
                <CardHome featured={featured} />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Left Button - Show only if not on the first slide */}
        {currentIndex > 0 && (
          <button
            className="custom-prev absolute top-1/2 -translate-y-1/2 -left-[30px] sm:-left-[38px] md:-left-[43px] lg:-left-[50px] z-20 p-1 sm:p-1 md:p-2 lg:p-3 rounded-full bg-[#FEF987] shadow-md transition"
            aria-label="Previous Slide"
            onClick={() => swiperRef.current.swiper.slidePrev()}
          >
            <IoIosArrowBack className="text-xl sm:text-3xl md:text-2xl lg:text-4xl" />
          </button>
        )}

        {/* Right Button - Hide if last slide is fully visible */}
        {currentIndex < totalSlides - slidesPerView && (
          <button
            className="custom-next absolute top-1/2 -translate-y-1/2 -right-[30px] sm:-right-[38px] md:-right-[43px] lg:-right-[50px] z-20 p-1 sm:p-1 md:p-2 lg:p-3 rounded-full bg-[#FEF987] shadow-md transition"
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
