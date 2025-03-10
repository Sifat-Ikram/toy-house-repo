import { useState } from "react";

const ProductImageZoom = ({ selectedImage }) => {
  const [zoomStyle, setZoomStyle] = useState({});

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

  return (
    <div className="w-full max-sm:h-[250px] h-[350px] sm:h-[430px] overflow-hidden relative border shadow">
      {selectedImage ? (
        <img
          src={selectedImage}
          alt="Selected product"
          className="w-full h-full object-cover transition-transform duration-500 ease-out"
          style={zoomStyle}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        />
      ) : (
        <h1>There is no image available</h1>
      )}
    </div>
  );
};

export default ProductImageZoom;