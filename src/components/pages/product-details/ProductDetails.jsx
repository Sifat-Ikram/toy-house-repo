import { useParams } from "react-router-dom";
import useProduct from "../../hooks/useProduct";
import { useState } from "react";

const ProductDetails = () => {
  const { id } = useParams();
  const [products] = useProduct();
  const [isOpenSpecification, setSpecificationIsOpen] = useState(false);
  const [isOpenShipping, setIsOpenShipping] = useState(false);
  const [isOpenSupport, setIsOpenSupport] = useState(false);
  const [largeDivColor, setLargeDivColor] = useState("#0FA958");
  const handleDivClick = (color) => {
    setLargeDivColor(color);
  };

  const selectedProduct = products.find(
    (productItem) => productItem?._id === id
  );

  if (!selectedProduct) {
    return <span className="loading loading-spinner loading-lg"></span>;
  }

  const { name, brand, category, image, details, price, type } =
    selectedProduct;

  return (
    <div className="w-11/12 mx-auto min-h-screen bg-white py-16 px-10">
      <div className="flex justify-center gap-20">
        <div className="w-2/5 space-y-3">
          <div className="breadcrumbs text-base">
            <ul>
              <li>
                <a>{category}</a>
              </li>
              <li>
                <a>{brand}</a>
              </li>
            </ul>
          </div>
          <div>
            <h1 className="text-4xl font-medium">{name}</h1>
            <div className="flex flex-col sm:flex-row gap-2 items-center">
              <p>{type}</p> | <p>{brand}</p>
            </div>
          </div>
          <div>
            <h1>Colors</h1>
            {/* Add color options if applicable */}
          </div>
          <div className="w-4/5">
            <h1>{details.slice(0, 200)}</h1>
          </div>
          <div>
            <div className="flex gap-3 my-8">
              <h1 className="text-lg font-semibold text-gray-500">
                BDT {price}
              </h1>
              <button className="border-l-4 border-solid border-gray-700 hover:underline text-gray-500 text-lg px-3">
                Shop Now
              </button>
            </div>
            <div className="w-4/5">
              <div className="border-t border-black rounded-none">
                <div
                  className="cursor-pointer py-2 flex justify-between items-center"
                  onClick={() => setSpecificationIsOpen(!isOpenSpecification)}
                >
                  <span>Product Specifications</span>
                  <span className="text-2xl">
                    {isOpenSpecification ? "-" : "+"}
                  </span>
                </div>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpenSpecification ? "max-h-[200px] py-2" : "max-h-0"
                  }`}
                >
                  <p>{details}</p>
                </div>
              </div>
              <div className="border-y border-black rounded-none">
                <div
                  className="cursor-pointer py-2 flex justify-between items-center"
                  onClick={() => setIsOpenShipping(!isOpenShipping)}
                >
                  <span>Shipping Options</span>
                  <span className="text-2xl">{isOpenShipping ? "-" : "+"}</span>
                </div>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpenShipping ? "max-h-[200px] py-2" : "max-h-0"
                  }`}
                >
                  <p>{category}</p>
                </div>
              </div>
              <div className="border-b border-black rounded-none">
                <div
                  className="cursor-pointer py-2 flex justify-between items-center"
                  onClick={() => setIsOpenSupport(!isOpenSupport)}
                >
                  <span>Support</span>
                  <span className="text-2xl">{isOpenSupport ? "-" : "+"}</span>
                </div>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpenSupport ? "max-h-[200px] py-2" : "max-h-0"
                  }`}
                >
                  <p>{type}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1">
          <div className="flex justify-center gap-3 max-md:gap-5">
            <div
              className="h-[230px] md:h-[565px] w-[230px] md:w-[500px]"
              style={{ backgroundColor: largeDivColor }}
            ></div>
            <div className="flex flex-col justify-center items-center gap-5">
              <div
                className="bg-[#0FA958] h-[96px] w-[96px]"
                onClick={() => handleDivClick("#0FA958")}
              ></div>
              <div
                className="bg-[#BE92FB] h-[96px] w-[96px]"
                onClick={() => handleDivClick("#BE92FB")}
              ></div>
              <div
                className="bg-[#FFACAC] h-[96px] w-[96px]"
                onClick={() => handleDivClick("#FFACAC")}
              ></div>
              <div
                className="bg-[#DB4126] h-[96px] w-[96px]"
                onClick={() => handleDivClick("#DB4126")}
              ></div>
              <div
                className="bg-[#B126DB] h-[96px] w-[96px]"
                onClick={() => handleDivClick("#B126DB")}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
