import { useState } from "react";
import { useForm } from "react-hook-form"; // Import useForm
import axios from "axios";
import { BiEdit } from "react-icons/bi";
import { useParams } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const image_hosting_key = import.meta.env.VITE_image_hosting_key;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const Inventories = () => {
  const { id } = useParams();
  const axiosPublic = useAxiosPublic();
  const [showImages, setShowImages] = useState({});
  const [inventories, setInventories] = useState([]);
  const { register, handleSubmit, reset } = useForm();
  const [uploadedImages, setUploadedImages] = useState([]);
  const [isAddingInventory, setIsAddingInventory] = useState(false);
  const [isUpdateFormVisible, setIsUpdateFormVisible] = useState(false);
  const [updatedItem, setUpdatedItem] = useState(null);
  const [updateFields, setUpdateFields] = useState({
    color_name: "",
    quantity: "",
    show_available_quantity: "",
    base_price: "",
    selling_price: "",
    applicable_tax_percent: "",
    base_price_after_tax: "",
    selling_price_after_tax: "",
    discount_price: "",
    mark_availability: "",
    is_featured: "",
    is_new: "",
  });

  const colors = [
    { id: 1, name: "Red" },
    { id: 2, name: "Green" },
    { id: 3, name: "Blue" },
    { id: 4, name: "Yellow" },
    { id: 5, name: "Purple" },
  ];

  // Function to handle file change event for multiple images
  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files); // Get the files from input
    let newUploadedImages = [...uploadedImages]; // Preserve previous images

    for (const file of files) {
      const formData = new FormData();
      formData.append("image", file);

      const res = await axios
        .post(image_hosting_api, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .catch((error) => {
          console.error(error.message);
          alert("Image upload failed. Please try again");
        });

      if (res.data.data && res.data.data.url) {
        const newImage = {
          image_url: res.data.data.url,
          is_display_image: true, // Assuming each new image can be set as display image
        };
        newUploadedImages.push(newImage); // Add new image object with image_url and is_display_image
      }
    }

    // Set the new uploaded images array in state
    setUploadedImages(newUploadedImages);
  };

  const handleAddInventory = (data) => {
    const updatedInventory = { ...data, product_images: uploadedImages };
    console.log(updatedInventory);

    setInventories((prev) => [...prev, updatedInventory]);
    setIsAddingInventory(false);
    reset();
    setUploadedImages([]);
  };

  const handleRemoveImage = (index) => {
    setUploadedImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleToggleImages = (index) => {
    setShowImages((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleUpdateClick = (index) => {
    setIsUpdateFormVisible(index); // Show the update form for the selected item
    const selectedItem = inventories[index]; // Store the selected item

    setUpdatedItem(selectedItem); // Save the selected item for updates
    setUpdateFields({
      color_name: selectedItem.color_name || "", // Set the field or default to an empty string
      quantity: selectedItem.quantity || 0, // Default to 0 if undefined
      show_available_quantity: selectedItem.show_available_quantity || 0,
      base_price: selectedItem.base_price || 0,
      selling_price: selectedItem.selling_price || 0,
      applicable_tax_percent: selectedItem.applicable_tax_percent || 0,
      base_price_after_tax: selectedItem.base_price_after_tax || 0,
      selling_price_after_tax: selectedItem.selling_price_after_tax || 0,
      discount_price: selectedItem.discount_price || 0,
      mark_availability: selectedItem.mark_availability || false, // Default to false if undefined
      is_featured: selectedItem.is_featured || false,
      is_new: selectedItem.is_new || false,
    });
  };

  const handleInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUpdateFields((prevFields) => ({
      ...prevFields,
      [name]: value,
    }));
  };

  const handleSaveUpdate = (index) => {
    const updatedInventory = {
      ...inventories[index], // Keep existing properties
      ...updateFields, // Overwrite with the updated fields
    };

    const updatedInventories = inventories.map((inventory, i) =>
      i === index ? updatedInventory : inventory
    );

    setInventories(updatedInventories);
    setIsUpdateFormVisible(false); // Hide the update form
  };

  console.log(inventories);

  const handleCancellingAddingInventory = (index) => {
    setInventories((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSaveInventory = async () => {
    const formattedData = {
      product_id: id,
      inventory: inventories.map((inventory) => ({
        quantity: Number(inventory.quantity),
        show_available_quantity: Boolean(
          Number(inventory.show_available_quantity)
        ),
        base_price: parseFloat(inventory.base_price),
        selling_price: parseFloat(inventory.selling_price),
        mark_availability: inventory.mark_availability, // Directly use the boolean value
        applicable_tax_percent: parseFloat(inventory.applicable_tax_percent),
        base_price_after_tax: parseFloat(inventory.base_price_after_tax),
        selling_price_after_tax: parseFloat(inventory.selling_price_after_tax),
        discount_price: parseFloat(inventory.discount_price),
        is_featured: inventory.is_featured, // Directly use the boolean value
        is_new: inventory.is_new, // Directly use the boolean value
        color_name: inventory.color_name || "",
        product_images: inventory.product_images || [],
      })),
    };

    console.log("Formatted Data:", formattedData);

    try {
      // Send the formatted inventory data to the backend
      const response = await axiosPublic.post(
        "/api/v1/admin/product/inventory/upload/inventory?request-id=1234",
        formattedData
      );

      // Check if the request was successful
      if (response.status === 200) {
        alert("Inventories saved successfully");
        // Optionally, clear inventories after successful save (if needed)
        setInventories([]); // Reset inventory state after saving
      } else {
        alert("Failed to save inventories. Please try again");
      }
    } catch (error) {
      // Handle any error during the request
      console.error("Error saving inventory:", error.message);
      alert("An error occurred. Please try again");
    }
  };

  return (
    <div className="text-[#1D1D1D] ml-[1px] bg-base-200 space-y-5 min-h-screen">
      <h1 className="font-poppins text-3xl py-[22px] px-10 text-center bg-white">
        Inventories
      </h1>
      <div className="px-4">
        {inventories.length > 0 ? (
          <>
            <div className="flex flex-col sm:flex-row justify-between items-center p-3 bg-white space-y-4 md:space-y-0">
              <h1>Total Products: {inventories.length}</h1>
              <button
                onClick={() => setIsAddingInventory(true)}
                className="bg-[#00C20D] text-white rounded-md px-4 py-2 transition-all ease-in-out font-roboto"
              >
                Add Inventory
              </button>
            </div>
            <div>
              <table className="min-w-full table-auto">
                <thead className="bg-base-300">
                  <tr>
                    <th className="p-2 text-center text-gray-600">Images</th>
                    <th className="p-2 text-center text-gray-600">Color</th>
                    <th className="p-2 text-center text-gray-600">Quantity</th>
                    <th className="p-2 text-center text-gray-600">
                      Available Quantity
                    </th>
                    <th className="p-2 text-center text-gray-600">
                      Base Price
                    </th>
                    <th className="p-2 text-center text-gray-600">
                      Selling Price
                    </th>
                    <th className="py-2 text-center text-gray-600">
                      Applicable Tax Percent
                    </th>
                    <th className="py-2 text-center text-gray-600">
                      Mark Availability
                    </th>
                    <th className="p-2 text-center text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {inventories.map((inventory, index) => (
                    <>
                      {/* Regular Row */}
                      <tr
                        key={`row-${index}`}
                        className="bg-white shadow-lg rounded-lg overflow-x-auto px-4 md:px-10"
                      >
                        <td className="p-2 text-center">
                          <button
                            className="text-blue-500 hover:underline"
                            onClick={() => handleToggleImages(index)}
                          >
                            {showImages[index] ? "Hide" : "Show"}
                          </button>
                        </td>
                        <td className="p-2 text-center">
                          {inventory.color_name}
                        </td>
                        <td className="p-2 text-center">
                          {inventory.quantity}
                        </td>
                        <td className="p-2 text-center">
                          {inventory.show_available_quantity}
                        </td>
                        <td className="p-2 text-center">
                          {inventory.base_price}
                        </td>
                        <td className="p-2 text-center">
                          {inventory.selling_price}
                        </td>
                        <td className="p-2 text-center">
                          {inventory.applicable_tax_percent}
                        </td>
                        <td className="p-2 text-center">
                          {inventory.base_price_after_tax}
                        </td>
                        <td className="p-2 text-center">
                          {inventory.selling_price_after_tax}
                        </td>
                        <td className="p-2 text-center">
                          {inventory.discount_price}
                        </td>
                        <td className="p-2 text-center">
                          {inventory.mark_availability}
                        </td>
                        <td className="p-2 text-center">
                          {inventory.is_featured}
                        </td>
                        <td className="p-2 text-center">{inventory.is_new}</td>
                        <td className="p-2 flex justify-center items-center text-center space-y-2 md:space-y-0 md:space-x-2">
                          <button
                            aria-label="Edit this inventory"
                            onClick={() => handleUpdateClick(index)}
                            className="bg-yellow-500 text-white rounded-full p-[5px] transition-all ease-in-out font-normal"
                          >
                            <BiEdit className="text-base" />
                          </button>
                          <button
                            aria-label="Cancel this inventory addition"
                            onClick={() =>
                              handleCancellingAddingInventory(index)
                            }
                            className="bg-red-500 text-white rounded-full hover:bg-red-700 px-2 py-1 transition-all ease-in-out font-normal text-xs"
                          >
                            X
                          </button>
                        </td>
                      </tr>

                      {showImages[index] && (
                        <div className="flex flex-wrap gap-4 justify-center bg-white w-full mt-3 mb-6">
                          {inventory?.product_images?.map(
                            (image, imageIndex) => (
                              <div key={imageIndex} className="flex-none">
                                <img
                                  src={image.image_url}
                                  alt={`Inventory Image ${imageIndex}`}
                                  className="rounded-md shadow-md h-28 w-28"
                                />
                              </div>
                            )
                          )}
                        </div>
                      )}
                      {/* Update Form Row */}
                      {isUpdateFormVisible === index && (
                        <tr
                          key={`update-form-${index}`}
                          className="bg-gray-100"
                        >
                          <td className="p-2 text-center">
                            {/* Empty space for "Show/Hide" */}
                          </td>
                          <td className="p-2 text-center">
                            <select
                              name="color_name"
                              value={updateFields.color_name}
                              onChange={handleInputChange}
                              className="border rounded px-2 py-1 w-20"
                            >
                              <option value="" disabled>
                                Select Color
                              </option>
                              {colors.map((color) => (
                                <option key={color.id} value={color.name}>
                                  {color.name}
                                </option>
                              ))}
                            </select>
                          </td>
                          <td className="p-2 text-center">
                            <input
                              type="number"
                              name="quantity"
                              value={updateFields.quantity}
                              onChange={handleInputChange}
                              placeholder="Quantity"
                              className="border rounded px-2 py-1 w-20"
                            />
                          </td>
                          <td className="p-2 text-center">
                            <input
                              type="number"
                              name="show_available_quantity"
                              value={updateFields.show_available_quantity}
                              onChange={handleInputChange}
                              placeholder="Available Quantity"
                              className="border rounded px-2 py-1 w-20"
                            />
                          </td>
                          <td className="p-2 text-center">
                            <input
                              type="number"
                              name="base_price"
                              value={updateFields.base_price}
                              onChange={handleInputChange}
                              placeholder="Base Price"
                              className="border rounded px-2 py-1 w-20"
                            />
                          </td>
                          <td className="p-2 text-center">
                            <input
                              type="number"
                              name="selling_price"
                              value={updateFields.selling_price}
                              onChange={handleInputChange}
                              placeholder="Selling Price"
                              className="border rounded px-2 py-1 w-20"
                            />
                          </td>
                          <td className="p-2 text-center">
                            <input
                              type="number"
                              name="applicable_tax_percent"
                              value={updateFields.applicable_tax_percent}
                              onChange={handleInputChange}
                              placeholder="Applicable Tax Percent"
                              className="border rounded px-2 py-1 w-20"
                            />
                          </td>
                          <td className="p-2 text-center">
                            <input
                              type="number"
                              name="base_price_after_tax"
                              value={updateFields.base_price_after_tax}
                              onChange={handleInputChange}
                              placeholder="Base Price After Tax"
                              className="border rounded px-2 py-1 w-20"
                            />
                          </td>
                          <td className="p-2 text-center">
                            <input
                              type="number"
                              name="selling_price_after_tax"
                              value={updateFields.selling_price_after_tax}
                              onChange={handleInputChange}
                              placeholder="Selling Price After Tax"
                              className="border rounded px-2 py-1 w-20"
                            />
                          </td>
                          <td className="p-2 text-center">
                            <input
                              type="number"
                              name="discount_price"
                              value={updateFields.discount_price}
                              onChange={handleInputChange}
                              placeholder="Discount Price"
                              className="border rounded px-2 py-1 w-20"
                            />
                          </td>
                          <td className="p-2 text-center">
                            <select
                              name="mark_availability"
                              value={updateFields.mark_availability}
                              onChange={handleInputChange}
                              className="border rounded px-2 py-1 w-28"
                            >
                              <option value="true">True</option>
                              <option value="false">False</option>
                            </select>
                          </td>
                          <td className="p-2 text-center">
                            <select
                              name="is_featured"
                              value={updateFields.is_featured}
                              onChange={handleInputChange}
                              className="border rounded px-2 py-1 w-28"
                            >
                              <option value="true">True</option>
                              <option value="false">False</option>
                            </select>
                          </td>
                          <td className="p-2 text-center">
                            <select
                              name="is_new"
                              value={updateFields.is_new}
                              onChange={handleInputChange}
                              className="border rounded px-2 py-1 w-28"
                            >
                              <option value="true">True</option>
                              <option value="false">False</option>
                            </select>
                          </td>
                          <td className="p-2 text-center">
                            <div className="flex justify-center space-x-2">
                              <button
                                onClick={() => handleSaveUpdate(index)}
                                className="bg-green-500 text-white px-2 py-1 rounded"
                              >
                                Save
                              </button>
                              <button
                                onClick={() => setIsUpdateFormVisible(false)}
                                className="bg-gray-500 text-white px-2 py-1 rounded"
                              >
                                Cancel
                              </button>
                            </div>
                          </td>
                        </tr>
                      )}
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center space-y-4 bg-white shadow-lg p-10 rounded-lg">
            <h2 className="text-xl text-gray-600 font-semibold">
              No inventories found
            </h2>
            <button
              onClick={() => setIsAddingInventory(true)}
              className="bg-[#00C20D] text-white rounded-md px-4 py-2 transition-all ease-in-out font-roboto"
            >
              Add Inventory
            </button>
          </div>
        )}

        {/* Form to Add New Inventory */}
        {isAddingInventory && (
          <form onSubmit={handleSubmit(handleAddInventory)} className="mt-20">
            <table className="min-w-full table-auto">
              <thead className="bg-base-300">
                <tr>
                  <th className="py-2 text-center text-gray-600">Image</th>
                  <th className="py-2 text-center text-gray-600">Color</th>
                  <th className="py-2 text-center text-gray-600">Quantity</th>
                  <th className="py-2 text-center text-gray-600">
                    Available Quantity
                  </th>
                  <th className="py-2 text-center text-gray-600">Base Price</th>
                  <th className="py-2 text-center text-gray-600">
                    Selling Price
                  </th>
                  <th className="py-2 text-center text-gray-600">
                    Applicable Tax Percent
                  </th>
                  <th className="py-2 text-center text-gray-600">
                    Base Price After Tax
                  </th>
                  <th className="py-2 text-center text-gray-600">
                    Selling Price After Tax
                  </th>
                  <th className="py-2 text-center text-gray-600">
                    Discount Price
                  </th>
                  <th className="py-2 text-center text-gray-600">
                    Mark Availability
                  </th>
                  <th className="py-2 text-center text-gray-600">
                    Featured Availability
                  </th>
                  <th className="py-2 text-center text-gray-600">Is New</th>
                  <th className="py-2 text-center text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-2 text-center">
                    <input
                      type="file"
                      id="file-upload"
                      onChange={handleFileChange}
                      multiple
                      className="sr-only"
                    />

                    {/* Button to Trigger File Input */}
                    <button
                      type="button"
                      onClick={() =>
                        document.getElementById("file-upload").click()
                      }
                      className="bg-[#00C20D] text-white rounded-md px-4 py-2 transition-all ease-in-out font-roboto"
                    >
                      Upload
                    </button>
                  </td>
                  <td className="py-2 text-center">
                    <select
                      {...register("color_name")}
                      className="border rounded px-2 py-1 w-28"
                    >
                      <option value="" disabled>
                        Select Color
                      </option>
                      {colors.map((color) => (
                        <option key={color.id} value={color.name}>
                          {color.name}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="py-2 text-center">
                    <input
                      type="number"
                      {...register("quantity")}
                      placeholder="Quantity"
                      className="border rounded px-2 py-1 w-28"
                    />
                  </td>
                  <td className="py-2 text-center">
                    <input
                      type="number"
                      {...register("show_available_quantity")}
                      placeholder="Available Quantity"
                      className="border rounded px-2 py-1 w-28"
                    />
                  </td>
                  <td className="py-2 text-center">
                    <input
                      type="number"
                      {...register("base_price")}
                      placeholder="Base Price"
                      className="border rounded px-2 py-1 w-28"
                    />
                  </td>
                  <td className="py-2 text-center">
                    <input
                      type="number"
                      {...register("selling_price")}
                      placeholder="Selling Price"
                      className="border rounded px-2 py-1 w-28"
                    />
                  </td>
                  <td className="py-2 text-center">
                    <input
                      type="number"
                      {...register("applicable_tax_percent")}
                      placeholder="Applicable Tax Percent"
                      className="border rounded px-2 py-1 w-28"
                    />
                  </td>
                  <td className="py-2 text-center">
                    <input
                      type="number"
                      {...register("base_price_after_tax")}
                      placeholder="Base Price After Tax"
                      className="border rounded px-2 py-1 w-28"
                    />
                  </td>
                  <td className="py-2 text-center">
                    <input
                      type="number"
                      {...register("selling_price_after_tax")}
                      placeholder="Selling Price After Tax"
                      className="border rounded px-2 py-1 w-28"
                    />
                  </td>
                  <td className="py-2 text-center">
                    <input
                      type="number"
                      {...register("discount_price")}
                      placeholder="Discount Price"
                      className="border rounded px-2 py-1 w-28"
                    />
                  </td>
                  <td className="py-2 text-center">
                    <select
                      {...register("mark_availability")}
                      className="border rounded px-2 py-1 w-28"
                    >
                      <option value="true">True</option>
                      <option value="false">False</option>
                    </select>
                  </td>
                  <td className="py-2 text-center">
                    <select
                      {...register("is_featured")}
                      className="border rounded px-2 py-1 w-28"
                    >
                      <option value="true">True</option>
                      <option value="false">False</option>
                    </select>
                  </td>
                  <td className="py-2 text-center">
                    <select
                      {...register("is_new")}
                      className="border rounded px-2 py-1 w-28"
                    >
                      <option value="true">True</option>
                      <option value="false">False</option>
                    </select>
                  </td>

                  <td className="py-2 text-center">
                    <button
                      type="submit"
                      className="bg-[#00C20D] text-white rounded-md px-4 py-2 transition-all ease-in-out font-roboto"
                    >
                      Add Inventory
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
            {/* Uploaded Images */}
            <div className="p-4 space-y-4 bg-white rounded-lg shadow-md">
              {uploadedImages.length > 0 && (
                <div className="flex items-center gap-4 mt-4">
                  {uploadedImages.map((image, index) => (
                    <div key={index} className="relative w-24 h-24">
                      {/* Image */}
                      <img
                        src={image.image_url}
                        alt={`inventory-image-${index}`}
                        className="rounded-md shadow-md w-full h-full object-cover"
                      />
                      {/* Close Button */}
                      <button
                        className="absolute top-0 right-0 bg-white text-black text-xs rounded-full px-1 shadow hover:bg-red-500 hover:text-white"
                        onClick={() => handleRemoveImage(index)}
                      >
                        X
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </form>
        )}
      </div>
      {inventories.length > 0 && (
        <button
          onClick={handleSaveInventory}
          className="ml-5 bg-[#00C20D] text-white rounded-md px-4 py-2 transition-all ease-in-out font-roboto"
        >
          Save Inventory
        </button>
      )}
    </div>
  );
};

export default Inventories;

// "inventories": [
//   {
//     "quantity": 0,
//     "show_available_quantity": 0,
//     "mark_unavailable": true,
//     "base_price": 0,
//     "selling_price": 0,
//     "applicable_tax_percent": 0,
//     "color_id": 0,
//     "product_images": [
//       {
//         "image_url": "string",
//         "is_display_image": true
//       }
//     ],
//     "product_videos": [
//       {
//         "video_url": "string"
//       }
//     ]
//   }
