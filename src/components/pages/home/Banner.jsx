import { motion } from "framer-motion";
import Lottie from "lottie-react";
import video from "../../../assets/logo/Toyhouse Landing lottie final.json";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div className="relative w-11/12 mx-auto flex flex-col sm:flex-row items-center max-sm:py-5 m-0 overflow-hidden">
      {/* Floating Decorations */}
      <div className="absolute max-sm:hidden top-7 left-10 w-14 sm:w-20 md:w-24 lg:w-32 h-14 sm:h-20 md:h-24 lg:h-32 bg-[#FDD835] opacity-60 rounded-full sm:top-3 sm:left-10 md:top-0 md:left-20"></div>
      <div className="absolute max-lg:hidden -bottom-10 left-16 w-6 sm:w-10 md:w-16 lg:w-24 h-6 sm:h-10 md:h-16 lg:h-24 bg-[#4CAF50] opacity-60 rounded-full sm:bottom-8 sm:left-1/2 md:bottom-0 lg:bottom-14 md:left-1/3"></div>

      {/* Content Section */}
      <div className="relative h-full sm:w-1/2 z-10 flex flex-col sm:items-start justify-center gap-3 sm:gap-10">
        <div className="text-center sm:text-left">
          <h1 className="dark:text-black banner-welcome sm:text-2xl md:text-4xl lg:text-6xl font-bold drop-shadow-lg">
            Welcome to
          </h1>
          <h1 className="banner-title sm:text-4xl md:text-5xl lg:text-7xl font-extrabold drop-shadow-lg text-[#317ff3]">
            Toy House!
          </h1>
          <p className="mt-2 dark:text-black  sm:mt-4 md:mt-6 banner-text sm:text-lg md:text-2xl font-semibold drop-shadow-sm">
            Let’s Bring Joy to Every Little Heart!
          </p>
        </div>
        <div className="flex justify-center items-center sm:justify-start gap-1 sm:gap-4">
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="px-[12px] md:px-5 lg:px-6 py-1 sm:py-[6px] md:py-2 lg:py-3 text-nowrap bg-[#317ff3] hover:bg-[#31b2f3] banner-button sm:text-base md:text-lg font-semibold text-white rounded-full shadow-lg transition-all cursor-pointer"
          >
            <Link to={"/products"}>Shop Now</Link>
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="px-[12px] md:px-5 lg:px-6 py-1 sm:py-[6px] md:py-2 lg:py-3 text-nowrap bg-[#317ff3] hover:bg-[#31b2f3] banner-button sm:text-base md:text-lg font-semibold text-white rounded-full shadow-lg transition-all cursor-pointer"
          >
            Best Sellers
          </motion.button>
        </div>
      </div>

      {/* Video Section */}
      <div className="sm:flex-1 w-full h-full">
        <Lottie
          autoplay
          loop
          animationData={video}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default Banner;
