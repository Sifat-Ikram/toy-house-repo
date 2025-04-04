import { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Link } from "react-router-dom";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import useFeaturedCollection from "../../hooks/useFeaturedCollection";
import CardHome from "../../hooks/CardHome";

const FeaturesCollection = () => {
  const [featuredProducts] = useFeaturedCollection();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [totalSlides, setTotalSlides] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(3);
  const swiperRef = useRef(null);

  useEffect(() => {
    if (swiperRef.current) {
      const swiperInstance = swiperRef.current.swiper;
      setTotalSlides(swiperInstance.slides.length);
      setSlidesPerView(swiperInstance.params.slidesPerView);
    }
  }, [featuredProducts]); // Recalculate when products change

  return (
    <div className="w-full space-y-8 sm:space-y-10 md:space-y-14 py-10 sm:py-14 md:py-20 bg-[#f5f5f5]">
      <h2 className="mb-10 text-xl md:text-2xl lg:text-4xl font-bold text-center font-poppins">
        Featured Collection
      </h2>

      <div className="relative w-11/12 mx-auto">
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
            1400: { slidesPerView: 6, slidesPerGroup: 1, spaceBetween: 15 },
            700: { slidesPerView: 5, slidesPerGroup: 1, spaceBetween: 15 },
            500: { slidesPerView: 4, slidesPerGroup: 1, spaceBetween: 10 },
          }}
          modules={[Navigation]}
          className="mySwiper"
        >
          {featuredProducts?.map((featured) => (
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
            className="custom-prev absolute top-1/2 -translate-y-1/2 max-sm:-mt-3 -left-6 sm:-left-8 md:-left-10 lg:-left-12 z-20 p-1 sm:p-1 md:p-2 lg:p-[10px] rounded-full bg-[#FEF987] shadow-md transition"
            aria-label="Previous Slide"
            onClick={() => swiperRef.current.swiper.slidePrev()}
          >
            <IoIosArrowBack className="text-xl sm:text-3xl md:text-2xl lg:text-4xl" />
          </button>
        )}

        {/* Right Button - Hide if last slide is fully visible */}
        {currentIndex < totalSlides - slidesPerView && (
          <button
            className="custom-next absolute top-1/2 -translate-y-1/2 max-sm:-mt-3 -right-6 sm:-right-8 md:-right-10 lg:-right-12 z-20 p-1 sm:p-1 md:p-2 lg:p-[10px] rounded-full bg-[#FEF987] shadow-md transition"
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

export default FeaturesCollection;
