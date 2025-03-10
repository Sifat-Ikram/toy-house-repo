import { useState } from "react";
import useProducts from "../../hooks/useProducts";
import ProductDescription from "./ProductDescription";

const ProductOnInventory = ({ id }) => {
  const { selectedProduct } = useProducts({ id });
  const [selectedType, setSelectedType] = useState("BOX");

  const filteredDimensions = selectedProduct?.dimensions?.filter(
    (dimension) => dimension.type === selectedType
  );

  return (
    <div className="w-full max-lg:px-2 lg:w-11/12 mx-auto bg-white p-2 md:p-3 lg:p-5 rounded-xl flex flex-col md:flex-row justify-center gap-4 md:gap-6 lg:gap-8 overflow-x-visible">
      <div className="w-full md:w-5/12 flex flex-col border rounded-lg overflow-x-visible">
        <h1 className="text-[#1E1E1E] font-poppins text-xl p-5 border-b">
          Basic Info
        </h1>
        <div className="flex flex-col p-5 space-y-[10px]">
          <div className="flex items-center">
            <h1 className="p-2 bg-[#E9E9E9] rounded-l-lg text-base font-medium">
              Category
            </h1>
            <h1 className="p-2 rounded-r-lg text-white text-base font-normal bg-[#757575]">
              {selectedProduct?.category?.name || 0}
            </h1>
          </div>
          <div className="flex items-center">
            <h1 className="p-2 bg-[#E9E9E9] rounded-l-lg text-base font-medium">
              Brand
            </h1>
            <h1 className="p-2 rounded-r-lg text-white text-base font-normal bg-[#757575]">
              {selectedProduct?.brand?.name || 0}
            </h1>
          </div>
          <div className="flex items-center">
            <h1 className="p-2 bg-[#E9E9E9] rounded-l-lg text-base font-medium">
              Product Name
            </h1>
            <h1 className="p-2 rounded-r-lg text-white text-base font-normal bg-[#757575]">
              {selectedProduct?.product_name || 0}
            </h1>
          </div>
          <div className="flex items-center">
            <h1 className="p-2 bg-[#E9E9E9] rounded-l-lg text-base font-medium">
              Stock Keeping Unit
            </h1>
            <h1 className="p-2 rounded-r-lg text-white text-base font-normal bg-[#757575]">
              {selectedProduct?.sku || 0}
            </h1>
          </div>
          <div className="flex items-center">
            <h1 className="p-2 bg-[#E9E9E9] rounded-l-lg text-base font-medium">
              Number of Pieces
            </h1>
            <h1 className="p-2 rounded-r-lg text-white text-base font-normal bg-[#757575]">
              {selectedProduct?.number_of_pieces || 0}
            </h1>
          </div>
          <div className="flex items-center">
            <h1 className="p-2 bg-[#E9E9E9] rounded-l-lg text-base font-medium">
              Warranty Info
            </h1>
            <h1 className="p-2 rounded-r-lg text-white text-base font-normal bg-[#757575]">
              {selectedProduct?.warranty_info || 0}
            </h1>
          </div>
          <div className="flex items-center">
            <h1 className="p-2 bg-[#E9E9E9] rounded-l-lg text-base font-medium">
              Maximum Age Range
            </h1>
            <h1 className="p-2 rounded-r-lg text-white text-base font-normal bg-[#757575]">
              {selectedProduct?.maximum_age_range || 0} years
            </h1>
          </div>
          <div className="flex items-center">
            <h1 className="p-2 bg-[#E9E9E9] rounded-l-lg text-base font-medium">
              Minimum Age Range
            </h1>
            <h1 className="p-2 rounded-r-lg text-white text-base font-normal bg-[#757575]">
              {selectedProduct?.minimum_age_range || 0} years
            </h1>
          </div>
          <div className="flex items-center">
            <h1 className="p-2 bg-[#E9E9E9] rounded-l-lg text-base font-medium">
              Materials
            </h1>
            <h1 className="p-2 rounded-r-lg text-white flex items-center gap-2 text-base font-normal bg-[#757575]">
              {selectedProduct?.materials?.map((material) => {
                return (
                  <h1 key={material?.material_id}>{material?.name || 0}</h1>
                );
              })}
            </h1>
          </div>
        </div>
      </div>
      <div className="w-full max-lg:px-2 md:flex-1 space-y-3">
        <div className="flex flex-col border rounded-lg">
          <h1 className="text-[#1E1E1E] font-poppins text-xl px-5 py-4 border-b">
            Dimension
          </h1>
          <div className="py-5 pl-5 pr-8">
            {/* Radio buttons for selecting type */}
            <div className="flex space-x-4 mb-4">
              <label className="flex items-center cursor-pointer text-[#1E1E1E] font-poppins text-xl">
                <input
                  type="radio"
                  name="dimensionType"
                  value="BOX"
                  checked={selectedType === "BOX"}
                  onChange={() => setSelectedType("BOX")}
                  className="mr-2"
                />
                Box
              </label>
              <label className="flex items-center cursor-pointer text-[#1E1E1E] font-poppins text-xl">
                <input
                  type="radio"
                  name="dimensionType"
                  value="PRODUCT"
                  checked={selectedType === "PRODUCT"}
                  onChange={() => setSelectedType("PRODUCT")}
                  className="mr-2"
                />
                Product
              </label>
            </div>

            {/* Display filtered dimension info */}
            <div>
              {filteredDimensions?.length > 0 ? (
                filteredDimensions.map((dimension) => (
                  <div
                    key={dimension?.dimension_id}
                    className="flex flex-wrap gap-8"
                  >
                    <p className="flex items-center">
                      <strong className="px-3 py-[10px] bg-[#E9E9E9] rounded-l-lg text-[13px] font-medium">
                        Height
                      </strong>{" "}
                      <h1 className="px-3 py-[10px] rounded-r-lg text-white text-[13px] font-normal bg-[#757575]">
                        <h1>{dimension.height}</h1>
                      </h1>
                    </p>
                    <p className="flex items-center">
                      <strong className="px-3 py-[10px] bg-[#E9E9E9] rounded-l-lg text-[13px] font-medium">
                        Width
                      </strong>{" "}
                      <h1 className="px-3 py-[10px] rounded-r-lg text-white text-[13px] font-normal bg-[#757575]">
                        <h1>{dimension.width}</h1>
                      </h1>
                    </p>
                    <p className="flex items-center">
                      <strong className="px-3 py-[10px] bg-[#E9E9E9] rounded-l-lg text-[13px] font-medium">
                        Depth
                      </strong>{" "}
                      <h1 className="px-3 py-[10px] rounded-r-lg text-white text-[13px] font-normal bg-[#757575]">
                        <h1>{dimension.depth}</h1>
                      </h1>
                    </p>
                    <p className="flex items-center">
                      <strong className="px-3 py-[10px] bg-[#E9E9E9] rounded-l-lg text-[13px] font-medium">
                        Weight
                      </strong>{" "}
                      <h1 className="px-3 py-[10px] rounded-r-lg text-white text-[13px] font-normal bg-[#757575]">
                        <h1>{dimension.weight}</h1>{" "}
                      </h1>
                    </p>
                    <p className="flex items-center">
                      <strong className="px-3 py-[10px] bg-[#E9E9E9] rounded-l-lg text-[13px] font-medium">
                        Dimension Unit
                      </strong>{" "}
                      <h1 className="px-3 py-[10px] rounded-r-lg text-white text-[13px] font-normal bg-[#757575]">
                        <h1>{dimension.dimension_unit}</h1>
                      </h1>
                    </p>
                    <p className="flex items-center">
                      <strong className="px-3 py-[10px] bg-[#E9E9E9] rounded-l-lg text-[13px] font-medium">
                        Weight Unit
                      </strong>{" "}
                      <h1 className="px-3 py-[10px] rounded-r-lg text-white text-[13px] font-normal bg-[#757575]">
                        <h1>{dimension.weight_unit}</h1>
                      </h1>
                    </p>
                  </div>
                ))
              ) : (
                <p>No {selectedType.toLowerCase()} dimensions available.</p>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col border rounded-lg">
          <h1 className="text-[#1E1E1E] font-poppins text-xl px-5 py-4 border-b">
            Product Description
          </h1>
          <div className="py-5 px-10">
            <ProductDescription
              description={selectedProduct?.product_description}
            />
          </div>
        </div>
        <div className="flex flex-col border rounded-lg">
          <h1 className="text-[#1E1E1E] font-poppins text-xl px-5 py-4 border-b">
            In The Box
          </h1>
          <div className="py-5 px-10">
            <ProductDescription description={selectedProduct?.in_the_box} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductOnInventory;
