import { useEffect, useRef, useState } from "react";
import useBrands from "../../hooks/useBrands";
import useCategory from "../../hooks/useCategory";
import { useForm, Controller } from "react-hook-form";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";
import useMaterials from "../../hooks/useMaterials";
import Swal from "sweetalert2";

const AddProduct = () => {
  const axiosPublic = useAxiosPublic();
  const [brands] = useBrands();
  const navigate = useNavigate();
  const [categories] = useCategory();
  const editorRef = useRef();
  const boxRef = useRef();
  const highlightRef = useRef();
  const [description, setDescription] = useState("");
  const [highlightItems, setHighlightItems] = useState("");
  const [boxItem, setBoxItem] = useState("");
  const [selection, setSelection] = useState("box");
  const { register, handleSubmit, reset, control } = useForm();
  const [selectedMaterials, setSelectedMaterials] = useState([]);

  const [allMaterials] = useMaterials();

  // description
  useEffect(() => {
    if (!editorRef.current) {
      editorRef.current = new Quill("#editor", {
        theme: "snow",
        modules: {
          toolbar: [
            ["bold", "italic", "underline"], // Text formatting
            [{ list: "ordered" }, { list: "bullet" }], // Lists
          ],
        },
      });
      editorRef.current.on("text-change", () => {
        // Directly updating the description in state for real-time updates
        setDescription(editorRef.current.root.innerHTML);
      });
    }
  }, []);

  // box items
  useEffect(() => {
    if (!boxRef.current) {
      boxRef.current = new Quill("#boxEditor", {
        theme: "snow",
        modules: {
          toolbar: [
            ["bold", "italic", "underline"], // Text formatting
            [{ list: "ordered" }, { list: "bullet" }], // Lists
          ],
        },
      });
      boxRef.current.on("text-change", () => {
        // Directly updating the description in state for real-time updates
        setBoxItem(boxRef.current.root.innerHTML);
      });
    }
  }, []);

  // highlight
  useEffect(() => {
    if (!highlightRef.current) {
      highlightRef.current = new Quill("#highlightEditor", {
        theme: "snow",
        modules: {
          toolbar: [
            ["bold", "italic", "underline"], // Text formatting
            [{ list: "ordered" }, { list: "bullet" }], // Lists
          ],
        },
      });
      highlightRef.current.on("text-change", () => {
        // Directly updating the description in state for real-time updates
        setHighlightItems(highlightRef.current.root.innerHTML);
      });
    }
  }, []);

  const handleSelectionChange = (event) => {
    setSelection(event.target.value); // Update state based on radio selection
  };

  const onSubmit = async (data) => {
    // Check if box items are provided
    if (!boxItem) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Box items are required!",
        showConfirmButton: false,
        timer: 2000,
        toast: true,
      });
      return; // Prevent the form submission if boxItem is empty
    }

    // Check if highlighted items are provided
    if (!highlightItems) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Highlight items are required!",
        showConfirmButton: false,
        timer: 2000,
        toast: true,
      });
      return; // Prevent the form submission if highlightItems is empty
    }

    const formattedDimensions = [];

    // Conditionally push dimensions based on the user's selection
    if (selection === "box") {
      if (
        !data.boxHeight ||
        !data.boxWidth ||
        !data.boxDepth ||
        !data.boxWeight
      ) {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Please fill all box dimensions!",
          showConfirmButton: false,
          timer: 3000,
          toast: true,
        });
        return;
      }
      formattedDimensions.push({
        type: "BOX",
        height: Number(data.boxHeight),
        width: Number(data.boxWidth),
        depth: Number(data.boxDepth),
        weight: Number(data.boxWeight),
        dimension_unit: data.boxDimensionUnit,
        weight_unit: data.boxWeightUnit,
      });
    } else if (selection === "product") {
      if (
        !data.productHeight ||
        !data.productWidth ||
        !data.productDepth ||
        !data.productWeight
      ) {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Please fill all product dimensions!",
          showConfirmButton: false,
          timer: 3000,
          toast: true,
        });
        return;
      }
      formattedDimensions.push({
        type: "PRODUCT",
        height: Number(data.productHeight),
        width: Number(data.productWidth),
        depth: Number(data.productDepth),
        weight: Number(data.productWeight),
        dimension_unit: data.productDimensionUnit,
        weight_unit: data.productWeightUnit,
      });
    }

    const formattedData = {
      product: {
        category_id: Number(data.category),
        brand_id: Number(data.brand),
        name: data.name,
        number_of_pieces: data.number_of_pieces,
        warranty_info: data.warranty_info,
        minimum_age_range: Number(data.minimum_age_range),
        maximum_age_range: Number(data.maximum_age_range),
        material_ids: selectedMaterials,
        dimensions: formattedDimensions,
        description: description,
        in_the_box: boxItem,
        summary: highlightItems,
        return_and_refund_policy: ""
      }
    };

    console.log(formattedData);

    try {
      // Submit the data to the backend
      const response = await axiosPublic.post(
        "/api/v1/open/products/add/product?request-id=1234",
        formattedData
      );
      console.log(response);

      if (response.status === 201 || response.status === 200) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Product added successfully!",
          showConfirmButton: false,
          timer: 2000,
          toast: true,
        });
      }

      // Reset the form and state after successful submission
      reset();
      setBoxItem("");
      setDescription("");
      setHighlightItems("");
      setSelectedMaterials([]);

      // Navigate to the product page after successful submission
      navigate(`/dashboard/inventories/${response.data?.product?.product_id}`);
    } catch (error) {
      console.error("Error posting data:", error.message);

      // Show error message if something goes wrong during the request
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Failed to add product!",
        text: error.response?.data?.message || error.message,
        showConfirmButton: false,
        timer: 3000,
        toast: true,
      });
    }
  };

  return (
    <div className="text-[#1D1D1D] ml-[1px]">
      <h1 className="font-poppins text-3xl py-[22px] px-10 text-center">
        Add New Product
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="py-5 px-10 bg-base-200 pb-20"
      >
        <div className="flex flex-col md:flex-row justify-center gap-7">
          <div className="md:w-1/2 flex flex-col space-y-7">
            {/* name */}
            <div className="bg-white flex flex-col rounded-xl">
              <h1 className="font-poppins text-lg font-medium p-5 border-b">
                Product Name
              </h1>
              <div className="px-5 py-4 flex flex-col space-y-4">
                <div>
                  <label className="block text-[#757575] font-poppins text-xs">
                    Product Name
                  </label>
                  <input
                    type="text"
                    {...register("name")}
                    className="w-full mt-1 p-2 border rounded-xl bg-base-200"
                  />
                </div>
              </div>
            </div>

            {/* category and brand */}
            <div className="flex justify-center items-center gap-7">
              <div className="w-1/2 bg-white flex flex-col rounded-xl">
                <h1 className="font-poppins text-lg font-medium p-5 border-b">
                  Category
                </h1>
                <div className="px-5 py-4 flex flex-col space-y-4">
                  <div>
                    <select
                      {...register("category", { required: true })}
                      className="w-full mt-1 p-2 border rounded-xl bg-base-200"
                    >
                      <option value="">Select a Category</option>
                      {categories && categories.length > 0 ? (
                        categories?.map((category) => (
                          <option
                            key={category.category_id}
                            value={category.category_id}
                          >
                            {category?.name}
                          </option>
                        ))
                      ) : (
                        <option>No categories available</option>
                      )}
                    </select>
                  </div>
                </div>
              </div>
              <div className="w-1/2 bg-white flex flex-col rounded-xl">
                <h1 className="font-poppins text-lg font-medium p-5 border-b">
                  Brand
                </h1>
                <div className="px-5 py-4 flex flex-col space-y-4">
                  <div>
                    <select
                      {...register("brand", { required: true })}
                      className="w-full mt-1 p-2 border rounded-xl bg-base-200"
                    >
                      <option value="">Select a Brand</option>
                      {brands && brands.length > 0 ? (
                        brands?.map((brand) => (
                          <option key={brand.brand_id} value={brand.brand_id}>
                            {brand?.name}
                          </option>
                        ))
                      ) : (
                        <option>No brands available</option>
                      )}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* box items */}
            <div className="bg-white flex flex-col rounded-xl pb-5 overflow-hidden">
              <h1 className="font-poppins text-lg font-medium p-5 border-b">
                Box items
              </h1>
              <div className="px-5 flex flex-col space-y-4 pt-4 overflow-hidden">
                <div className="relative border-[1px] rounded-xl overflow-hidden">
                  {/* Add parent wrapper */}
                  <div
                    id="boxEditor"
                    style={{ height: "232px" }}
                    className="bg-base-200"
                  />
                </div>
              </div>
            </div>

            {/* highlight Items */}
            <div className="bg-white flex flex-col rounded-xl pb-5 overflow-hidden">
              <h1 className="font-poppins text-lg font-medium p-5 border-b">
                Highlights
              </h1>
              <div className="px-5 flex flex-col space-y-4 pt-4 overflow-hidden">
                <div className="relative border-[1px] rounded-xl overflow-hidden">
                  {/* Add parent wrapper */}
                  <div
                    id="highlightEditor"
                    style={{ height: "230px" }}
                    className="bg-base-200"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="md:flex-1 flex flex-col space-y-7">
            {/* product description */}
            <div className="bg-white flex flex-col rounded-xl pb-5 overflow-hidden">
              <h1 className="font-poppins text-lg font-medium p-5 border-b">
                Product Descriptions
              </h1>
              <div className="px-5 flex flex-col space-y-4 pt-4 overflow-hidden">
                <div className="relative border-[1px] rounded-xl overflow-hidden">
                  {/* Add parent wrapper */}
                  <div
                    id="editor"
                    style={{ height: "200px" }}
                    className="bg-base-200"
                  />
                </div>
              </div>
            </div>

            {/* materials */}
            <div className="bg-white flex flex-col border rounded-xl shadow-md">
              <h1 className="font-poppins text-lg font-semibold p-5 border-b cursor-pointer transition-colors hover:text-indigo-600">
                Materials
              </h1>
              <div className="px-5 py-2 flex flex-col space-y-4 animate-fadeIn">
                <Controller
                  name="materialSelect"
                  control={control}
                  render={() => (
                    <div className="flex flex-col gap-4">
                      {allMaterials.map((material) => (
                        <label
                          key={material.material_id}
                          className="flex items-center gap-3 border border-gray-300 bg-gray-50 rounded-md px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 transition"
                        >
                          <input
                            type="checkbox"
                            value={material.material_id}
                            checked={selectedMaterials.includes(
                              material.material_id
                            )}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedMaterials((prev) => [
                                  ...prev,
                                  material.material_id,
                                ]);
                              } else {
                                setSelectedMaterials((prev) =>
                                  prev.filter(
                                    (id) => id !== material.material_id
                                  )
                                );
                              }
                            }}
                            className="form-checkbox h-5 w-5 text-indigo-600 border-gray-300 rounded focus:ring-2 focus:ring-indigo-500"
                          />
                          <span className="text-gray-800 font-medium">
                            {material.name}
                          </span>
                        </label>
                      ))}
                    </div>
                  )}
                />
              </div>
            </div>

            {/* dimensions */}
            <div className="bg-white flex flex-col rounded-xl">
              <h1 className="font-poppins text-lg font-medium p-5 border-b">
                Dimensions
              </h1>

              {/* Select Box or Product via radio buttons */}
              <div className="p-2 flex flex-col space-y-3 border-b">
                <div className="flex items-center space-x-5 px-3">
                  <div>
                    <input
                      type="radio"
                      id="box"
                      name="dimensionsType"
                      value="box"
                      checked={selection === "box"}
                      onChange={handleSelectionChange}
                      className="mr-2"
                    />
                    <label htmlFor="box" className="font-poppins text-base">
                      Box
                    </label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      id="product"
                      name="dimensionsType"
                      value="product"
                      checked={selection === "product"}
                      onChange={handleSelectionChange}
                      className="mr-2"
                    />
                    <label htmlFor="product" className="font-poppins text-base">
                      Product
                    </label>
                  </div>
                </div>
              </div>

              {/* Box Form */}
              {selection === "box" && (
                <div className="p-2 flex flex-col space-y-3 border-b">
                  <h1 className="font-poppins text-lg font-medium px-3">Box</h1>
                  <div className="grid grid-cols-3 gap-3 px-3">
                    {/* Height */}
                    <div>
                      <label className="block text-[#757575] font-poppins text-xs">
                        Height
                      </label>
                      <input
                        type="number"
                        {...register("boxHeight")}
                        step="0.01"
                        className="w-full mt-1 p-2 border rounded-xl bg-base-200"
                        placeholder="Enter height"
                      />
                    </div>

                    {/* Width */}
                    <div>
                      <label className="block text-[#757575] font-poppins text-xs">
                        Width
                      </label>
                      <input
                        type="number"
                        {...register("boxWidth")}
                        step="0.01"
                        className="w-full mt-1 p-2 border rounded-xl bg-base-200"
                        placeholder="Enter width"
                      />
                    </div>

                    {/* Depth */}
                    <div>
                      <label className="block text-[#757575] font-poppins text-xs">
                        Depth
                      </label>
                      <input
                        type="number"
                        {...register("boxDepth")}
                        step="0.01"
                        className="w-full mt-1 p-2 border rounded-xl bg-base-200"
                        placeholder="Enter depth"
                      />
                    </div>

                    {/* Weight */}
                    <div>
                      <label className="block text-[#757575] font-poppins text-xs">
                        Weight
                      </label>
                      <input
                        type="number"
                        {...register("boxWeight")}
                        step="0.01"
                        className="w-full mt-1 p-2 border rounded-xl bg-base-200"
                        placeholder="Enter weight"
                      />
                    </div>

                    {/* Dimension Unit */}
                    <div>
                      <label className="block text-[#757575] font-poppins text-xs">
                        Dimension Unit
                      </label>
                      <select
                        {...register("boxDimensionUnit")}
                        className="w-full mt-1 p-2 border rounded-xl bg-base-200"
                      >
                        <option value="INCH">INCH</option>
                        <option value="CM">CM</option>
                      </select>
                    </div>

                    {/* Weight Unit */}
                    <div>
                      <label className="block text-[#757575] font-poppins text-xs">
                        Weight Unit
                      </label>
                      <select
                        {...register("boxWeightUnit")}
                        className="w-full mt-1 p-2 border rounded-xl bg-base-200"
                      >
                        <option value="KG">KG</option>
                        <option value="GRAM">GRAM</option>
                        <option value="POUND">POUND</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Product Form */}
              {selection === "product" && (
                <div className="p-2 flex flex-col space-y-3 border-b">
                  <h1 className="font-poppins text-lg font-medium px-3">
                    Product
                  </h1>
                  <div className="grid grid-cols-3 gap-3 px-3">
                    {/* Height */}
                    <div>
                      <label className="block text-[#757575] font-poppins text-xs">
                        Height
                      </label>
                      <input
                        type="number"
                        {...register("productHeight")}
                        step="0.01"
                        className="w-full mt-1 p-2 border rounded-xl bg-base-200"
                        placeholder="Enter height"
                      />
                    </div>

                    {/* Width */}
                    <div>
                      <label className="block text-[#757575] font-poppins text-xs">
                        Width
                      </label>
                      <input
                        type="number"
                        {...register("productWidth")}
                        step="0.01"
                        className="w-full mt-1 p-2 border rounded-xl bg-base-200"
                        placeholder="Enter width"
                      />
                    </div>

                    {/* Depth */}
                    <div>
                      <label className="block text-[#757575] font-poppins text-xs">
                        Depth
                      </label>
                      <input
                        type="number"
                        {...register("productDepth")}
                        step="0.01"
                        className="w-full mt-1 p-2 border rounded-xl bg-base-200"
                        placeholder="Enter depth"
                      />
                    </div>

                    {/* Weight */}
                    <div>
                      <label className="block text-[#757575] font-poppins text-xs">
                        Weight
                      </label>
                      <input
                        type="number"
                        {...register("productWeight")}
                        step="0.01"
                        className="w-full mt-1 p-2 border rounded-xl bg-base-200"
                        placeholder="Enter weight"
                      />
                    </div>

                    {/* Dimension Unit */}
                    <div>
                      <label className="block text-[#757575] font-poppins text-xs">
                        Dimension Unit
                      </label>
                      <select
                        {...register("productDimensionUnit")}
                        className="w-full mt-1 p-2 border rounded-xl bg-base-200"
                      >
                        <option value="INCH">INCH</option>
                        <option value="CM">CM</option>
                      </select>
                    </div>

                    {/* Weight Unit */}
                    <div>
                      <label className="block text-[#757575] font-poppins text-xs">
                        Weight Unit
                      </label>
                      <select
                        {...register("productWeightUnit")}
                        className="w-full mt-1 p-2 border rounded-xl bg-base-200"
                      >
                        <option value="KG">KG</option>
                        <option value="GRAM">GRAM</option>
                        <option value="POUND">POUND</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-white flex flex-col rounded-xl">
              <h1 className="font-poppins text-lg font-medium p-5 border-b">
                Additional Details
              </h1>
              <div className="flex flex-col px-5 py-4 space-y-3">
                <div className="grid grid-cols-3 gap-3">
                  {/* Number of Pieces */}
                  <div>
                    <label className="block text-[#757575] font-poppins text-xs">
                      Number of Pieces
                    </label>
                    <input
                      type="number"
                      {...register("number_of_pieces")}
                      className="w-full mt-1 p-2 border rounded-xl bg-base-200"
                    />
                  </div>

                  {/* Minimum Age */}
                  <div>
                    <label className="block text-[#757575] font-poppins text-xs">
                      Minimum Age
                    </label>
                    <input
                      type="number"
                      {...register("minimum_age_range")}
                      className="w-full mt-1 p-2 border rounded-xl bg-base-200"
                    />
                  </div>

                  {/* Maximum Age */}
                  <div>
                    <label className="block text-[#757575] font-poppins text-xs">
                      Maximum Age
                    </label>
                    <input
                      type="number"
                      {...register("maximum_age_range")}
                      className="w-full mt-1 p-2 border rounded-xl bg-base-200"
                    />
                  </div>
                </div>
                {/* Warranty Information */}
                <div>
                  <label className="block text-[#757575] font-poppins text-xs">
                    Warranty Information
                  </label>
                  <input
                    type="text"
                    {...register("warranty_info")}
                    className="w-full mt-1 p-2 border rounded-xl bg-base-200"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-[#00C20D] mt-7 text-white rounded-md px-4 py-3 font-normal text-base font-roboto"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
