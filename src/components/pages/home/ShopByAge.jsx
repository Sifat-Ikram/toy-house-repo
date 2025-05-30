import { Link, useLocation } from "react-router-dom";

const ShopByAge = () => {
  const shopItems = [
    {
      _id: 1,
      title: "Baby Stars",
      age: "0-2 years",
      color: "#FFEFBF",
      minAge: 0,
      maxAge: 2,
    },
    {
      _id: 2,
      title: "Little Stars",
      age: "3-5 years",
      color: "#EBFF94",
      minAge: 3,
      maxAge: 5,
    },
    {
      _id: 3,
      title: "Shining Stars",
      age: "6-11 years",
      color: "#7DEAFF",
      minAge: 6,
      maxAge: 11, // Fixed incorrect max age (was 12, should be 11)
    },
    {
      _id: 4,
      title: "Super Stars",
      age: "12 and above",
      color: "#E7D4FF",
      minAge: 12,
      maxAge: Infinity,
    },
  ];

  // Helper function to get query parameters from URL
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  const query = useQuery();
  const minAge = parseInt(query.get("minAge")) || 0;
  const maxAge = parseInt(query.get("maxAge")) || Infinity;

  // Corrected filtering logic: Ensure items overlap with the query range
  const filteredShopItems = shopItems.filter(
    (item) => item.maxAge >= minAge && item.minAge <= maxAge
  );

  return (
    <div className="w-11/12 mx-auto">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center font-poppins">
        Shop by Age
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 lg:gap-5 mt-10">
        {filteredShopItems.map((item) => (
          <Link
            to={`/ageCategory/${item._id}?minAge=${item.minAge}&maxAge=${item.maxAge}`}
            title={`View details for ${item.title}`}
            aria-label={`View details for ${item.title}`}
            key={item._id}
            className="rounded-3xl border-solid border-4 border-[#3E3E3E] hover:cursor-pointer
          hover:scale-105 transition-transform duration-300 p-4
          lg:p-5 flex flex-col justify-center items-center text-center space-y-3"
            style={{ backgroundColor: item.color }}
          >
            <h1 className="text-sm sm:text-lg lg:text-2xl font-normal font-poppins text-[#3E3E3E]">
              {item.title}
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl">
              Age {item.age}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ShopByAge;
