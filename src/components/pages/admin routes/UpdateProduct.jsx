import { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import useProducts from "../../hooks/useProducts";

const UpdateProduct = () => {
  const [products] = useProducts();

  // You may get the selected product ID from route params
  // const { id } = useParams();
  const selectedProduct = products;

  const { register, control, handleSubmit, reset } = useForm({
    defaultValues: selectedProduct,
  });

  // Use useFieldArray hook for managing inventory array
  const {
    fields: inventoryFields,
    append: addInventory,
    remove: removeInventory,
  } = useFieldArray({
    control, // from useForm
    name: "inventory",
  });

  // Function to add a new inventory item
  const handleAddInventory = () => {
    addInventory({
      discount_percent: 0,
      discount_price: 0,
      is_feature_product: false,
      is_new_product: false,
      mark_unavailable: false,
      quantity: 0,
      show_available_quantity: 0,
      product_inventory_id: "",
    });
  };

  // Function to remove an inventory item by index
  const handleRemoveInventory = (index) => {
    removeInventory(index);
  };

  const {
    fields: colorFields,
    append: addColor,
    remove: removeColor,
  } = useFieldArray({ control, name: "colors" });

  const {
    fields: materialFields,
    append: addMaterial,
    remove: removeMaterial,
  } = useFieldArray({ control, name: "materials" });

  const {
    fields: imageFields,
    append: addImage,
    remove: removeImage,
  } = useFieldArray({ control, name: "images" });

  const {
    fields: dimensionFields,
    append: addDimension,
    remove: removeDimension,
  } = useFieldArray({ control, name: "dimensions" });

  const {
    fields: descriptionFields,
    append: addDescription,
    remove: removeDescription,
  } = useFieldArray({ control, name: "product_descriptions" });

  const {
    fields: videoFields,
    append: addVideo,
    remove: removeVideo,
  } = useFieldArray({ control, name: "videos" });

  useEffect(() => {
    if (selectedProduct) {
      reset(selectedProduct);
    }
  }, [selectedProduct, reset]);

  if (!selectedProduct) {
    return <p className="text-center mt-10 text-gray-500">Loading...</p>;
  }

  const onSubmit = (data) => {
    console.log("Updated Product Data:", data);
    // Make your API call to update the product here
  };
  

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Update Product
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Name */}
        <div>
          <label className="block text-gray-700 font-medium">Name</label>
          <input
            type="text"
            {...register("name")}
            className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300"
          />
        </div>

        {/* Colors */}
        <div>
          <label className="block text-gray-700 font-medium">Colors</label>
          {colorFields.map((field, index) => (
            <div key={field.id} className="flex items-center space-x-2 mt-1">
              <input
                type="text"
                {...register(`colors.${index}.color_name`)}
                placeholder="Color Name"
                className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
              />
              <button
                type="button"
                onClick={() => removeColor(index)}
                className="px-3 py-1 bg-red-500 text-white rounded"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addColor({ color_name: "" })}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Add Color
          </button>
        </div>

        {/* Category */}
        <div>
          <label className="block text-gray-700 font-medium">Category</label>
          <input
            type="text"
            {...register("category.name")}
            className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300"
          />
        </div>

        {/* Brand */}
        <div>
          <label className="block text-gray-700 font-medium">Brand</label>
          <input
            type="text"
            {...register("brand.name")}
            className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300"
          />
        </div>

        {/* Base Price */}
        <div>
          <label className="block text-gray-700 font-medium">Base Price</label>
          <input
            type="number"
            {...register("base_price")}
            step="any"
            className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300"
          />
        </div>

        {/* Images */}
        <div>
          <label className="block text-gray-700 font-medium">Images</label>
          {imageFields.map((field, index) => (
            <div key={field.id} className="flex items-center space-x-2 mt-1">
              <input
                type="text"
                {...register(`images.${index}.image_url`)}
                placeholder="Image URL"
                className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="px-3 py-1 bg-red-500 text-white rounded"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addImage({ url: "" })}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Add Image
          </button>
        </div>

        {/* Dimensions */}
        <div>
          <label className="block text-gray-700 font-medium">
            Dimensions (CM)
          </label>
          {dimensionFields.map((field, index) => (
            <div key={field.id} className="flex items-center space-x-2 mt-1">
              <input
                type="number"
                {...register(`dimensions.${index}.depth`)}
                step="any"
                placeholder="Depth"
                className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
              />
              <input
                type="number"
                {...register(`dimensions.${index}.height`)}
                placeholder="Height"
                step="any"
                className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
              />
              <input
                type="number"
                {...register(`dimensions.${index}.width`)}
                placeholder="Width"
                step="any"
                className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
              />
              <button
                type="button"
                onClick={() => removeDimension(index)}
                className="px-3 py-1 bg-red-500 text-white rounded"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addDimension({ depth: "", height: "", width: "" })}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Add Dimension
          </button>
        </div>

        {/* display image url */}
        <div>
          <label className="block text-gray-700 font-medium">
            display image url
          </label>
          <input
            type="text"
            {...register("display_image_url")}
            className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300"
          />
        </div>

        {/* Inventory */}
        <div>
          <label className="block text-gray-700 font-medium">Inventory</label>
          {inventoryFields.map((field, index) => (
            <div key={field.id} className="space-y-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-gray-600 font-medium">
                    Discount Percent (%)
                  </label>
                  <input
                    type="number"
                    {...register(`inventory.${index}.discount_percent`)}
                    placeholder="Enter discount percent"
                    className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-blue-300"
                  />
                </div>

                <div>
                  <label className="block text-gray-600 font-medium">
                    Discount Price ($)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    {...register(`inventory.${index}.discount_price`)}
                    placeholder="Enter discount price"
                    className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-blue-300"
                  />
                </div>

                <div>
                  <label className="block text-gray-600 font-medium">
                    Quantity
                  </label>
                  <input
                    type="number"
                    {...register(`inventory.${index}.quantity`)}
                    placeholder="Enter quantity"
                    className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-blue-300"
                  />
                </div>

                <div>
                  <label className="block text-gray-600 font-medium">
                    Available Quantity
                  </label>
                  <input
                    type="number"
                    {...register(`inventory.${index}.show_available_quantity`)}
                    placeholder="Enter available quantity"
                    className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-blue-300"
                  />
                </div>

                <div>
                  <label className="block text-gray-600 font-medium">
                    Inventory ID
                  </label>
                  <input
                    type="text"
                    {...register(`inventory.${index}.product_inventory_id`)}
                    placeholder="Enter inventory ID"
                    className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-blue-300"
                  />
                </div>

                <div>
                  <label className="block text-gray-600 font-medium">
                    Is Feature Product
                  </label>
                  <select
                    {...register(`inventory.${index}.is_feature_product`)}
                    className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-blue-300"
                  >
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-600 font-medium">
                    Is New Product
                  </label>
                  <select
                    {...register(`inventory.${index}.is_new_product`)}
                    className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-blue-300"
                  >
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-600 font-medium">
                    Mark Unavailable
                  </label>
                  <select
                    {...register(`inventory.${index}.mark_unavailable`)}
                    className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-blue-300"
                  >
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                  </select>
                </div>
              </div>
              <button
                type="button"
                onClick={() => handleRemoveInventory(index)}
                className="mt-2 px-3 py-1 bg-red-500 text-white rounded"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              handleAddInventory({
                discount_percent: 0,
                discount_price: 0,
                is_feature_product: false,
                is_new_product: false,
                mark_unavailable: false,
                quantity: 0,
                show_available_quantity: 0,
                product_inventory_id: "",
              })
            }
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Add Inventory
          </button>
        </div>

        {/* in_the_box */}
        <div>
          <label className="block text-gray-700 font-medium">Box items</label>
          <input
            type="text"
            {...register("in_the_box")}
            className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300"
          />
        </div>

        <div className="flex flex-row justify-between items-center gap-5 lg:gap-10">
          {/* maximum age Range */}
          <div className="w-1/2">
            <label className="block text-gray-700 font-medium">
              Maximum Age Range
            </label>
            <input
              type="number"
              {...register("maximum_age_range")}
              className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300"
            />
          </div>

          {/* minimum Age Range */}
          <div className="flex-1">
            <label className="block text-gray-700 font-medium">
              minimum Age Range
            </label>
            <input
              type="number"
              {...register("minimum_age_range")}
              className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300"
            />
          </div>
        </div>

        {/* Materials */}
        <div>
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="materials"
          >
            Materials
          </label>
          {materialFields.map((field, index) => (
            <div key={field.id} className="flex items-center space-x-2 mt-2">
              <input
                type="text"
                {...register(`materials.${index}.name`, {
                  required: "Material name is required",
                })}
                placeholder="Enter material name"
                id={`material-${index}`}
                className="flex-grow p-2 border rounded-md focus:ring focus:ring-blue-300"
              />
              <button
                type="button"
                onClick={() => removeMaterial(index)}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300"
                aria-label={`Remove material ${index + 1}`}
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addMaterial({ material_name: "" })}
            className="mt-3 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
          >
            Add Material
          </button>
        </div>

        {/* Sku */}
        <div>
          <label className="block text-gray-700 font-medium">SKU</label>
          <input
            type="text"
            {...register("sku")}
            className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300"
          />
        </div>

        {/* number_of_pieces */}
        <div>
          <label className="block text-gray-700 font-medium">
            Number of Pieces
          </label>
          <input
            type="number"
            {...register("number_of_pieces")}
            className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300"
          />
        </div>

        {/* Descriptions (Product Descriptions) */}
        <div>
          <label className="block text-gray-700 font-medium">
            Product Descriptions
          </label>
          {descriptionFields.map((field, index) => (
            <div key={field.id} className="flex items-center space-x-2 mt-1">
              <input
                type="text"
                {...register(`product_descriptions.${index}.title`)}
                placeholder="Description Title"
                className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
              />
              <textarea
                {...register(`product_descriptions.${index}.description`)}
                placeholder="Description"
                className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
              ></textarea>
              <button
                type="button"
                onClick={() => removeDescription(index)}
                className="px-3 py-1 bg-red-500 text-white rounded"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addDescription({ title: "", description: "" })}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Add Description
          </button>
        </div>

        {/* Videos */}
        <div>
          <label className="block text-gray-700 font-medium">Videos</label>
          {videoFields.map((field, index) => (
            <div key={field.id} className="flex items-center space-x-2 mt-1">
              <input
                type="text"
                {...register(`videos.${index}.video_url`)}
                placeholder="Video URL"
                className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
              />
              <button
                type="button"
                onClick={() => removeVideo(index)}
                className="px-3 py-1 bg-red-500 text-white rounded"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addVideo({ video_url: "" })}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Add Video
          </button>
        </div>

        {/* summery */}
        <div>
          <label className="block text-gray-700 font-medium">Summary</label>
          <textarea
            {...register("summary")}
            className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300"
          ></textarea>
        </div>

        {/* Warranty */}
        <div>
          <label className="block text-gray-700 font-medium">
            Warranty Info
          </label>
          <input
            type="text"
            {...register("warranty_info")}
            className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300"
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button type="submit" className="px-4 py-2 buttons w-full">
            Update Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProduct;
