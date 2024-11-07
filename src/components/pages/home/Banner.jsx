import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import img1 from "../../../assets/banner/01.jpg";
import img2 from "../../../assets/banner/02.jpg";
import img3 from "../../../assets/banner/03.png";
import img4 from "../../../assets/banner/04.jpg";
import img5 from "../../../assets/banner/05.png";
import img6 from "../../../assets/banner/06.png";

const Banner = () => {
  const text = "Designed for Play Built for Adventure!".split(" ");

  const bannerImage = [
    {
      _id: 1,
      image: img1,
    },
    {
      _id: 2,
      image: img2,
    },
    {
      _id: 3,
      image: img3,
    },
    {
      _id: 4,
      image: img4,
    },
    {
      _id: 5,
      image: img5,
    },
    {
      _id: 6,
      image: img6,
    },
  ];

  return (
    <div className="flex flex-col-reverse lg:flex-row-reverse mb-20 justify-between items-center max-sm:mx-2 max-md:mx-4 max-lg:mx-6 max-lg:gap-10 max-lg:mt-10">
      {/* Right side Swiper */}
      <div className="w-full lg:w-3/5">
        <Swiper
          spaceBetween={30}
          effect="fade"
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[Autoplay, EffectFade]}
          className="mySwiper"
        >
          {bannerImage.map((image) => (
            <SwiperSlide key={image._id}>
              <img
                src={image.image}
                alt=""
                className="h-[400px] w-full object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Left side text */}
      <div className="flex-1 px-4 sm:px-6 md:mx-5 lg:mx-[30px] text-center lg:text-left">
        {text.map((el, i) => (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.25,
              delay: i / 10,
            }}
            className="text-[28px] sm:text-[35px] md:text-[45px] lg:text-[55px] xl:text-[60px] font-bold"
            key={i}
          >
            {el}{" "}
          </motion.span>
        ))}
      </div>
    </div>
  );
};

export default Banner;
