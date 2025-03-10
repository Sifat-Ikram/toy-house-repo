import { useState } from "react";
import { useForm } from "react-hook-form"; // Import useForm
import axios from "axios";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { useParams } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useColor from "../../hooks/useColor";
import useInventories from "../../hooks/useInventories";
import Swal from "sweetalert2";
import UpdateInventory from "./UpdateInventory";
import InventoryImages from "./InventoryImages";
import ProductOnInventory from "./ProductOnInventory";

const image_hosting_key = import.meta.env.VITE_image_hosting_key;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const Inventories = () => {
  const { id } = useParams();
  const [inventories, inventoryRefetch] = useInventories({ id });
  const [colors] = useColor();
  const axiosPublic = useAxiosPublic();
  const { register, handleSubmit, reset } = useForm();
  const [uploadedImages, setUploadedImages] = useState([]);
  const [isImageVisible, setIsImageVisible] = useState({});
  const [isAddingInventory, setIsAddingInventory] = useState(false);
  const [selectedInventoryId, setSelectedInventoryId] = useState(null);
  const [loading, setLoading] = useState(false);

  if (!inventories) {
    return <span className="loading loading-ring loading-lg"></span>;
  }

  const handleEditClick = (inventoryId) => {
    setSelectedInventoryId((prevId) =>
      prevId === inventoryId ? null : inventoryId
    );
  };

  const handleShowHideImage = (inventoryId) => {
    setIsImageVisible((prev) => ({
      ...prev,
      [inventoryId]: !prev?.[inventoryId] || false,
    }));
  };

  // Function to handle file change event for multiple images
  // Helper function to generate a random alphanumeric ID
  const generateImageId = () => {
    return Math.random().toString(36).substr(2, 9); // generates a random string of 9 characters
  };

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    setLoading(true);

    let uploadedImagesArray = [];

    await Promise.all(
      files.map(async (file) => {
        const formData = new FormData();
        formData.append("image", file);

        try {
          const res = await axios.post(image_hosting_api, formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });

          if (res.data.data?.url) {
            uploadedImagesArray.push({
              image_id: generateImageId(),
              image_url: res.data.data.url,
              is_display_image: true,
            });
          }
        } catch (error) {
          console.error("Image upload failed:", error.message);
          Swal.fire({
            icon: "error",
            title: "Upload Failed",
            text: "Some images failed to upload. Please try again.",
          });
        }
      })
    );

    setUploadedImages((prev) => [...prev, ...uploadedImagesArray]);
    setLoading(false);
  };

  const handleRemoveImage = (inventoryId, imageId) => {
    setUploadedImages((prevImages) => {
      const newImages = { ...prevImages };
      newImages[inventoryId] = newImages[inventoryId]?.filter(
        (image) => image.image_id !== imageId
      );
      return newImages;
    });
  };

  const handleCancelInventory = () => {
    // Reset uploaded images
    setUploadedImages([]);

    // Hide the add inventory form
    setIsAddingInventory(false);
  };

  const handleSaveInventory = async (data) => {
    // Check if images are still uploading
    if (loading) {
      Swal.fire({
        icon: "warning",
        title: "Uploading...",
        text: "Please wait until images finish uploading.",
      });
      return;
    }

    // Format the data before sending it to the backend
    const formattedData = {
      product_id: id,
      inventory: {
        quantity: Number(data.quantity) || 0, // Default to 0 if blank
        mark_unavailable: false, // Default to false
        base_price: parseFloat(data.base_price) || 0, // Default to 0 if blank
        selling_price: parseFloat(data.selling_price) || 0, // Default to 0 if blank
        applicable_tax_percent: parseFloat(data.applicable_tax_percent) || 0, // Default to 0 if blank
        color_id: parseFloat(data.color_id) || 0, // Default to 0 if blank
        product_images:
          uploadedImages?.map((image) => ({
            image_url: image?.image_url || "", // Default to empty string if no image URL
            is_display_image: true,
          })) || [], // Ensure product_images is an empty array if no images
        product_videos: [], // No videos by default
        is_featured: false, // Default to false
      },
    };

    try {
      // Send the formatted data to the backend
      const response = await axiosPublic.post(
        "/api/v1/admin/product/inventory/upload/inventory?request-id=1234",
        formattedData
      );

      // Handle the API response
      if (response.status === 200) {
        inventoryRefetch(); // Refetch inventory data after successful save
        Swal.fire({
          icon: "success",
          title: "Successful!",
          text: "Inventory saved successfully",
        });
        reset(); // Reset form after successful save
        setIsAddingInventory(""); // Clear the state
      } else {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "Failed to save inventory. Please try again",
        });
      }
    } catch (error) {
      // Log error for debugging
      console.error("Error saving inventory:", error.message);
      if (error.response) {
        console.error("API response:", error.response.data); // Logs the response data from the server
      }
      alert("An error occurred. Please try again"); // Alert user about the error
    }
  };

  return (
    <div className="text-[#1D1D1D] ml-[1px] bg-base-200 space-y-5 min-h-screen overflow-x-visible pb-20">
      <div className="overflow-x-visible">
        <ProductOnInventory id={id} />
      </div>
      <h1 className="font-poppins text-3xl py-[22px] px-10 text-center bg-white">
        Inventories
      </h1>
      <div className="px-4 overflow-x-visible">
        {inventories.length > 0 ? (
          <>
            <div className="flex flex-col sm:flex-row justify-between overflow-x-visible items-center p-3 bg-white space-y-4 md:space-y-0">
              <h1>Total Products: {inventories.length}</h1>
              <button
                onClick={() => setIsAddingInventory(true)}
                className="bg-[#00C20D] text-white rounded-md px-4 py-2 transition-all ease-in-out font-roboto"
              >
                Add Inventory
              </button>
            </div>
            <div className=" overflow-x-visible">
              <table className="min-w-full">
                <thead className="bg-base-300">
                  <tr>
                    <th className="p-4 text-center text-gray-600 whitespace-nowrap">
                      Images
                    </th>
                    <th className="p-4 text-center text-gray-600 whitespace-nowrap">
                      Color
                    </th>
                    <th className="p-4 text-center text-gray-600 whitespace-nowrap">
                      Quantity
                    </th>
                    <th className="p-4 text-center text-gray-600 whitespace-nowrap">
                      Base Price
                    </th>
                    <th className="p-4 text-center text-gray-600 whitespace-nowrap">
                      Base Price After Tax
                    </th>
                    <th className="p-4 text-center text-gray-600 whitespace-nowrap">
                      Selling Price
                    </th>
                    <th className="p-4 text-center text-gray-600 whitespace-nowrap">
                      Selling Price After Tax
                    </th>
                    <th className="p-4 text-center text-gray-600 whitespace-nowrap">
                      Applicable Tax Percent
                    </th>
                    <th className="p-4 text-center text-gray-600 whitespace-nowrap">
                      Discount Percentage
                    </th>
                    <th className="p-4 text-center text-gray-600 whitespace-nowrap">
                      Discount Price
                    </th>
                    <th className="p-4 text-center text-gray-600 whitespace-nowrap">
                      Mark Availability
                    </th>
                    <th className="p-4 text-center text-gray-600 whitespace-nowrap">
                      New
                    </th>
                    <th className="p-4 text-center text-gray-600 whitespace-nowrap">
                      Featured
                    </th>
                    <th className="p-4 text-center text-gray-600 whitespace-nowrap">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {inventories?.map((inventory) => (
                    <>
                      <tr
                        key={inventory.inventory_id}
                        className="bg-white shadow-lg rounded-lg overflow-x-auto px-4 md:px-10"
                      >
                        <td className="px-2 py-4 text-center">
                          <button
                            onClick={() =>
                              handleShowHideImage(inventory?.inventory_id)
                            }
                            className="bg-[#00C20D] text-white text-sm rounded-md px-4 py-2 transition-all ease-in-out font-roboto"
                          >
                            {isImageVisible[inventory?.inventory_id]
                              ? "Hide"
                              : "Show"}
                          </button>
                        </td>
                        <td className="px-2 py-4 text-center">
                          {inventory.color}
                        </td>
                        <td className="px-2 py-4 text-center">
                          {inventory.quantity}
                        </td>
                        <td className="px-2 py-4 text-center">
                          {inventory.base_price}
                        </td>
                        <td className="px-2 py-4 text-center">
                          {inventory.base_price_after_tax}
                        </td>
                        <td className="px-2 py-4 text-center">
                          {inventory.selling_price}
                        </td>
                        <td className="px-2 py-4 text-center">
                          {inventory.selling_price_after_tax}
                        </td>
                        <td className="px-2 py-4 text-center">
                          {inventory.applicable_tax_percent}
                        </td>
                        <td className="px-2 py-4 text-center">
                          {inventory.discount_percent}
                        </td>
                        <td className="px-2 py-4 text-center">
                          {inventory.discount_price}
                        </td>
                        <td className="px-2 py-4 text-center">
                          {inventory.mark_unavailable ? "true" : "false"}
                        </td>
                        <td className="px-2 py-4 text-center">
                          {inventory.is_new ? "true" : "false"}
                        </td>
                        <td className="px-2 py-4 text-center">
                          {inventory.is_featured ? "true" : "false"}
                        </td>
                        <td className="px-2 py-4 flex justify-center items-center text-center space-x-4">
                          <button
                            onClick={() =>
                              handleEditClick(inventory.inventory_id)
                            }
                            className="bg-yellow-500 text-white rounded-full p-[6px] transition-all ease-in-out font-normal"
                          >
                            <BiEdit className="text-base" />
                          </button>
                          <button
                            aria-label="Cancel this inventory addition"
                            className="bg-red-500 text-white rounded-full hover:bg-red-700 p-[6px] transition-all ease-in-out font-normal text-xs"
                          >
                            <MdDelete className="text-base" />
                          </button>
                        </td>
                      </tr>
                      {isImageVisible[inventory.inventory_id] && (
                        <tr>
                          <td colSpan="13">
                            <InventoryImages
                              inventoryId={inventory?.inventory_id}
                            />
                          </td>
                        </tr>
                      )}
                      {selectedInventoryId === inventory.inventory_id && (
                        <tr>
                          <td colSpan="5">
                            <UpdateInventory
                              inventory={inventory}
                              onClose={() => setSelectedInventoryId(null)}
                              inventoryRefetch={inventoryRefetch}
                            />
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
          <form onSubmit={handleSubmit(handleSaveInventory)} className="mt-20">
            <table className="min-w-full overflow-x-visible">
              <thead className="bg-base-300 gap-4">
                <tr>
                  <th className="p-2 text-center text-gray-600 whitespace-nowrap">
                    Image
                  </th>
                  <th className="p-2 text-center text-gray-600 whitespace-nowrap">
                    Color
                  </th>
                  <th className="p-2 text-center text-gray-600 whitespace-nowrap">
                    Quantity
                  </th>
                  <th className="p-2 text-center text-gray-600 whitespace-nowrap">
                    Base Price
                  </th>
                  <th className="p-2 text-center text-gray-600 whitespace-nowrap">
                    Selling Price
                  </th>
                  <th className="p-2 text-center text-gray-600 whitespace-nowrap">
                    Applicable Tax Percent
                  </th>
                  <th className="p-2 text-center text-gray-600 whitespace-nowrap">
                    Actions
                  </th>
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
                      {...register("color_id")}
                      className="border rounded px-2 py-1 w-28"
                    >
                      <option value="" disabled>
                        Select Color
                      </option>
                      {colors?.map((color) => (
                        <option key={color.color_id} value={color.color_id}>
                          {color.color_name}
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
                      {...register("base_price", {
                        required: "Base price is required",
                      })}
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
                      step="0.01"
                    />
                  </td>
                  <td className="py-2 text-center flex flex-row items-center gap-3">
                    <button
                      type="submit"
                      className="bg-[#00C20D] text-white rounded-md px-4 py-2 transition-all ease-in-out font-roboto"
                    >
                      Add
                    </button>
                    <button
                      type="button"
                      onClick={() => handleCancelInventory()}
                      className="bg-red-500 text-white rounded-md px-4 py-2 transition-all ease-in-out font-roboto"
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
            {/* Uploaded Images */}
            <div>
              {uploadedImages.length > 0 && (
                <div className="p-4 space-y-4 bg-white rounded-lg shadow-md">
                  <div className="flex items-center gap-4 mt-4">
                    {uploadedImages.map((image) => (
                      <div key={image?.image_id} className="relative w-24 h-24">
                        {/* Image */}
                        <img
                          src={image.image_url}
                          alt={image?.image_id}
                          className="rounded-md shadow-md w-full h-full object-cover"
                        />
                        {/* Close Button */}
                        <button
                          type="button"
                          className="absolute top-0 right-0 bg-white text-black text-xs rounded-full px-1 shadow hover:bg-red-500 hover:text-white"
                          onClick={() => handleRemoveImage(image?.image_id)}
                        >
                          X
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Inventories;
