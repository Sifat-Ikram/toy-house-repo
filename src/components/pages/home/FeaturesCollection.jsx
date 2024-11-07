import { Link } from "react-router-dom";
import useCategory from "../../hooks/useCategory";

const FeaturesCollection = () => {
  const [categories] = useCategory();

  return (
    <div className="bg-[#FFEFBF] py-10">
      <div className="w-4/5 mx-auto">
        <div className="flex flex-col items-center justify-center mb-10">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-normal font-coiny">
            Featured Collections
          </h1>
          <p className="text-xs sm:text-base md::text-lg font-roboto font-normal">
            Lorem ipsum dolor sit amet consectetur. Lectus leo vestibulum vitae
            mi netus quam mattis aenean. Purus vel cond
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-2 lg:gap-8">
          {categories?.slice(0, 4)?.map((collection) => (
            <Link
              to={`/categoryDetails/${collection.name}`}
              key={collection._id}
              className="flex flex-col justify-center items-center group"
            >
              <img
                src={collection.image}
                alt={collection.name}
                className="w-full h-[126px] md:h-40 md:w-40 lg:h-52 lg:w-52 rounded-lg overflow-hidden transition-transform duration-300 group-hover:scale-105"
              />
              <div className="pt-4 text-center">
                <h3
                  className="text-base md:text-xl lg:text-[22px] font-normal font-coiny"
                  style={{ minHeight: "60px" }}
                >
                  {collection.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesCollection;
