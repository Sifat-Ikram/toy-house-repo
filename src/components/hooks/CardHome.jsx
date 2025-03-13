const CardHome = ({ featured }) => {
  return (
    <div className="overflow-hidden group rounded-lg">
      <div className="w-full h-[70px] md:h-[170px] lg:h-[200px]">
        <img
          src={featured.display_image_url}
          alt={featured?.product_name}
          loading="lazy"
          className="w-full h-full rounded-lg transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <div className="max-lg:py-3 px-1 sm:px-2 lg:p-4 text-left space-y-2">
        <div className="flex flex-col">
          <p className="text-[8px] sm:text-xs font-roboto line-clamp-1">
            {featured?.brand_name || " "}
          </p>
          <h3 className="text-xs sm:text-lg md:text-xl line-clamp-1 lg:text-lg font-bold font-poppins">
            {featured?.product_name
              ? featured?.product_name
              : "No Name Available"}{" "}
          </h3>
        </div>
        <p className="text-[9px] md:text-sm lg:text-base font-normal font-roboto mb-1">
          BDT {featured?.selling_price}
        </p>
      </div>
    </div>
  );
};

export default CardHome;
