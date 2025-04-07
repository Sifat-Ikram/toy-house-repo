const CardHome = ({ featured }) => {
  return (
    <div className="overflow-hidden group rounded-lg border border-gray-200 dark:border-gray-200 dark:bg-white dark:text-black shadow-sm transition-all duration-300 hover:shadow-md">
      {/* Product Image */}
      <div className="w-full h-[90px] xs:h-[120px] sm:h-[150px] md:h-[170px] lg:h-[200px] xl:h-[220px] overflow-hidden rounded-t-lg">
        <img
          src={featured.display_image_url}
          alt={featured?.product_name}
          loading="lazy"
          className="w-full h-full object-cover rounded-t-lg transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Product Details */}
      <div className="p-2 sm:p-3 md:p-4 space-y-[8px]">
        <div className="space-y-[1px]">
          <p className="text-[10px] xs:text-[11px] sm:text-xs font-roboto font-light truncate">
            {featured?.brand_name || " "}
          </p>

          <h3 className="text-[12px] xs:text-sm sm:text-base lg:text-lg font-semibold font-poppins truncate">
            {featured?.product_name || "No Name Available"}
          </h3>
        </div>

        <p className="text-[10px] xs:text-[11px] sm:text-sm md:text-base font-medium font-roboto">
          BDT {featured?.selling_price}
        </p>
      </div>
    </div>
  );
};

export default CardHome;
