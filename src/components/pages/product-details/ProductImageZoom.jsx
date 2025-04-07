import { useEffect, useState } from "react";
import YouTube from "react-youtube";

const extractYouTubeID = (url) => {
  const regex =
    /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null; // Return extracted video ID or null if not found
};

const ProductImageZoom = ({ selectedImage, selectedVideo }) => {
  const [zoomStyle, setZoomStyle] = useState({});
  const [videoId, setVideoId] = useState(null);
  const [videoPlaying, setVideoPlaying] = useState(false);

  useEffect(() => {
    if (selectedVideo) {
      const videoId = extractYouTubeID(selectedVideo); // Use the improved extraction method
      setVideoId(videoId);
      setVideoPlaying(!!videoId); // Set video playing only if a valid video ID exists
    } else {
      setVideoId(null);
      setVideoPlaying(false);
    }
  }, [selectedImage, selectedVideo]);

  const handleMouseMove = (e) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    setZoomStyle({
      transform: `scale(1.7)`,
      transformOrigin: `${x}% ${y}%`,
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({
      transform: "scale(1)",
    });
  };

  const handleVideoEnd = () => {
    setVideoPlaying(false); // Stop video on end
  };

  return (
    <div className="w-full overflow-hidden relative border shadow h-[430px] max-sm:h-[250px]">
      {videoId && videoPlaying ? (
        <div className="w-full h-full">
          <YouTube
            videoId={videoId}
            className="w-full h-full"
            opts={{
              width: "100%",
              height: "100%", // Ensures full height
              playerVars: { autoplay: 1 },
            }}
            onEnd={handleVideoEnd} // Handle video end
          />
        </div>
      ) : selectedImage ? (
        <img
          src={selectedImage}
          alt="Selected product"
          className="w-full h-full object-cover transition-transform duration-500 ease-out cursor-zoom-in"
          style={zoomStyle}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        />
      ) : (
        <div className="flex justify-center h-full items-center">
          <h1 className="text-lg font-semibold text-gray-500">
            No images or videos available
          </h1>
        </div>
      )}
    </div>
  );
};

export default ProductImageZoom;
