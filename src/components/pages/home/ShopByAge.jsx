import { useState, useEffect } from "react";
import {
  FcAssistant,
  FcBusinesswoman,
  FcBusinessman,
  FcCustomerSupport,
} from "react-icons/fc";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const ShopByAge = () => {
  const [shadowStyle, setShadowStyle] = useState("16px 16px 0px #000000");

  // Update shadow style based on screen width
  useEffect(() => {
    const updateShadowStyle = () => {
      if (window.innerWidth < 640) {
        setShadowStyle("12px 12px 0px #000000");
      } else if (window.innerWidth < 1024) {
        setShadowStyle("8px 8px 0px #000000");
      } else {
        setShadowStyle("16px 16px 0px #000000");
      }
    };

    window.addEventListener("resize", updateShadowStyle);
    updateShadowStyle(); // Set initial shadow

    return () => window.removeEventListener("resize", updateShadowStyle);
  }, []);

  const shopItems = [
    {
      _id: 1,
      image: <FcAssistant className="w-[101px] h-[92.58px]" />,
      title: "Baby Little Stars",
      age: "1-2 years",
      color: "#FFEFBF",
    },
    {
      _id: 2,
      image: <FcBusinesswoman className="w-[101px] h-[92.58px]" />,
      title: "Little Stars",
      age: "3-5 years",
      color: "#EBFF94",
    },
    {
      _id: 3,
      image: <FcBusinessman className="w-[101px] h-[92.58px]" />,
      title: "Shining Stars",
      age: "6-11 years",
      color: "#C8F6FF",
    },
    {
      _id: 4,
      image: <FcCustomerSupport className="w-[101px] h-[92.58px]" />,
      title: "Super Stars",
      age: "12 and above",
      color: "#E7D4FF",
    },
  ];

  return (
    <div className="w-5/6 mx-auto">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-normal text-center font-coiny">
        Shop by Age
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-5 my-10">
        {shopItems.map((item) => (
          <Link to={`/categoryDetail/${item._id}`} key={item._id}>
            <motion.div
              key={item._id}
              whileTap={{ x: 16, y: 16, boxShadow: "none" }}
              className="rounded-3xl border-solid border-2 border-black hover:cursor-pointer hover:scale-105 overflow-hidden transition-transform duration-300 p-2 lg:p-5 flex flex-col justify-center items-center space-y-1 sm:space-y-2 w-full max-w-[246px] mx-auto text-center"
              style={{
                backgroundColor: item.color,
                boxShadow: shadowStyle,
              }}
            >
              <h1>{item.image}</h1>
              <div className="flex flex-col items-center justify-center">
                <h1 className="text-sm sm:text-lg lg:text-2xl font-normal font-coiny text-[#3E3E3E] min-h-10 lg:min-h-16">
                  {item.title}
                </h1>
                <p className="text-sm">Age {item.age}</p>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ShopByAge;
