import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { motion } from "framer-motion";
import video1 from "../../../assets/videos/1721269-hd_1920_1080_25fps.mp4";
import video2 from "../../../assets/videos/3114983-uhd_3840_2160_25fps.mp4";
import video3 from "../../../assets/videos/3326622-hd_1920_1080_24fps.mp4";
import video4 from "../../../assets/videos/4133010-hd_1280_720_30fps.mp4";
import video5 from "../../../assets/videos/4836119-uhd_2160_4096_25fps.mp4";
import video6 from "../../../assets/videos/8087013-uhd_2160_3840_25fps.mp4";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const VideoReel = () => {
  const videoRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [enlargedVideo, setEnlargedVideo] = useState(null);

  const videos = [
    { id: 1, src: video1 },
    { id: 2, src: video2 },
    { id: 3, src: video3 },
    { id: 4, src: video4 },
    { id: 5, src: video5 },
    { id: 6, src: video6 },
  ];

  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.activeIndex);
  };

  const handleVideoPlay = (index) => {
    if (videoRefs.current[index]) {
      videoRefs.current[index].play();
    }
  };

  const handleVideoPause = (index) => {
    if (videoRefs.current[index]) {
      videoRefs.current[index].pause();
    }
  };

  const handleVideoClick = (index) => {
    setEnlargedVideo(index);
  };

  const handleBackClick = () => {
    setEnlargedVideo(null);
  };

  return (
    <section className="w-full bg-gray-900 p-6">
      <h2 className="text-center text-white text-2xl mb-4">Video Reel</h2>

      {enlargedVideo !== null ? (
        // Enlarged Video View
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-90">
          <motion.div
            className="relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <video
              ref={(el) => (videoRefs.current[enlargedVideo] = el)}
              src={videos[enlargedVideo].src}
              className="w-[800px] h-[600px] object-cover rounded-lg"
              autoPlay
              controls
            />
            {/* "Back" button */}
            <button
              onClick={handleBackClick}
              className="absolute top-4 right-4 z-50 bg-red-500 text-white px-4 py-2 rounded"
              style={{ zIndex: 100 }}
            >
              Back
            </button>
          </motion.div>
        </div>
      ) : (
        // Swiper View
        <Swiper
          spaceBetween={30}
          slidesPerView={3}
          centeredSlides={true}
          navigation={true}
          modules={[Navigation]}
          onSlideChange={handleSlideChange}
          className="mySwiper"
        >
          {videos.map((video, index) => (
            <SwiperSlide
              key={video.id}
              className="flex justify-center items-center"
            >
              <motion.div
                className="w-full h-[450px] flex justify-center items-center"
                initial={{ scale: 0.8, opacity: 0.8 }}
                animate={{
                  scale: activeIndex === index ? 1 : 0.8,
                  opacity: activeIndex === index ? 1 : 0.8,
                }}
                transition={{ duration: 0.5 }}
                onAnimationComplete={() => {
                  if (activeIndex === index) {
                    handleVideoPlay(index);
                  } else {
                    handleVideoPause(index);
                  }
                }}
                onClick={() => handleVideoClick(index)}
              >
                <video
                  ref={(el) => (videoRefs.current[index] = el)}
                  src={video.src}
                  className="w-full h-[500px] object-cover rounded-lg"
                  muted
                ></video>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </section>
  );
};

export default VideoReel;
