import { Link } from "react-router-dom";

const Card = ({ product }) => {
  return (
    <div className="w-full product-cart rounded-md flex flex-col overflow-hidden group border border-gray-200 dark:border-gray-200 dark:bg-white dark:text-black shadow-md hover:shadow-lg transition-all duration-300">
      <img
        src={product?.display_image_url}
        alt={product?.product_name}
        className="h-[130px] sm:h-[220px] md:h-[200px] lg:h-[250px] w-full transition-transform duration-300 group-hover:scale-105"
      />
      <div className="flex flex-col space-y-1 sm:space-y-2 md:space-y-3 px-2 lg:px-3 pb-3">
        <div className="flex flex-col justify-between space-y-[2px] pt-2 md:pt-4 lg:pt-5">
          <p className="text-[10px] sm:text-[12px] md:text-[13px] font-roboto">
            {product?.brand_name || " "}
          </p>
          <h2 className="text-[12px] sm:text-sm md:text-[16px] lg:text-[19px] line-clamp-1 pr-2 font-bold font-poppins">
            {product?.product_name || "Product Name"}
          </h2>
        </div>
        <p className="text-[10px] sm:text-[12px] md:text-[13px] font-roboto">
          {product?.category_name || " "}
        </p>
        <div className="flex justify-between items-center mt-2 space-x-1 lg:space-x-2">
          <Link to={`/productDetail/${product.id}`} className="lg:w-1/2">
            <button className="px-[6px] md:px-2 text-nowrap py-1 sm:py-[6px] lg:py-2 rounded-[8px] bg-[#317ff3] hover:bg-[#31b2f3] text-[9px] sm:text-xs lg:text-sm font-semibold text-white transition-all cursor-pointer">
              View Details
            </button>
          </Link>
          <div className="max-sm:mt-[4px]">
            <p className="font-bold text-[9px] text-nowrap sm:text-xs lg:text-base text-[#3E3E3E]">
              BDT {product?.selling_price}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
