import { useState, useEffect } from "react";
import axios from "axios";
import useColor from "../../hooks/useColor";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import useImage from "../../hooks/useImage";

const image_hosting_key = import.meta.env.VITE_image_hosting_key;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const UpdateInventory = ({ inventory, onClose, inventoryRefetch }) => {
  const [colors] = useColor();
  const axiosPublic = useAxiosPublic();
  const [uploadedImages, setUploadedImages] = useState([]);

  // Initialize with inventory values
  const [updateFields, setUpdateFields] = useState({
    color_name: inventory.color || "",
    quantity: inventory.quantity || 0,
    show_available_quantity: inventory.show_available_quantity || 0,
    base_price: inventory.base_price || 0,
    selling_price: inventory.selling_price || 0,
    applicable_tax_percent: inventory.applicable_tax_percent || 0,
    mark_availability: inventory.mark_availability || false,
    is_featured: inventory.is_featured || false,
  });

  useEffect(() => {
    // Set default color if none is selected
    if (colors.length > 0 && !updateFields.color_name) {
      setUpdateFields((prev) => ({
        ...prev,
        color_name: colors[0].name,
      }));
    }
  }, [colors]);

  // Helper function to generate a random alphanumeric ID
  const generateImageId = () => {
    return Math.random().toString(36).substr(2, 9); // generates a random string of 9 characters
  };

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files); // Get the files from input
    let newUploadedImages = [...uploadedImages]; // Preserve previous images

    for (const file of files) {
      const formData = new FormData();
      formData.append("image", file);

      try {
        const res = await axios.post(image_hosting_api, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        if (res.data.data && res.data.data.url) {
          const newImage = {
            image_id: generateImageId(), // Generate a random unique image ID
            image_url: res.data.data.url,
            is_display_image: true, // Assuming each new image can be set as display image
          };
          newUploadedImages.push(newImage); // Add new image object with image_url, is_display_image, and image_id
        }
      } catch (error) {
        console.error(error.message);
        alert("Image upload failed. Please try again");
      }
    }

    // Set the new uploaded images array in state
    setUploadedImages(newUploadedImages);
  };

  const handleRemoveImage = (image_id) => {
    // Remove image from an array (or any state you're using)
    setUploadedImages((prevImages) =>
      prevImages.filter((image) => image.image_id !== image_id)
    );
  };

  const handleSaveImages = async () => {
    const formattedImages = {
      product_inventory_id: inventory?.inventory_id,
      images: uploadedImages,
    };
    console.log(formattedImages);
    try {
      const response = await axiosPublic.post(
        "api/v1/admin/product/inventory/add/images?request-id=1234",
        formattedImages
      );
      console.log(response.data);
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Successful!",
          text: "Images saved successfully",
        });
        setUploadedImages("");
      } else {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "Failed to save image. Please try again",
        });
      }
    } catch (error) {
      console.error("Error saving image:", error.message);
      if (error.response) {
        console.error("API response:", error.response.data); // Logs the response data from the server
      }
      alert("An error occurred. Please try again");
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUpdateFields((prevFields) => ({
      ...prevFields,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = async () => {
    const formattedData = {
      product_inventory_id: inventory?.inventory_id,
      inventory: {
        quantity: updateFields.quantity,
        show_available_quantity: updateFields.show_available_quantity,
        mark_unavailable: updateFields.mark_availability,
        base_price: updateFields.base_price,
        selling_price: updateFields.selling_price,
        applicable_tax_percent: updateFields.applicable_tax_percent,
        color_id: parseFloat(updateFields.color_name),
        product_images: [],
        product_videos: [],
        is_featured: updateFields.is_featured,
      },
    };

    try {
      const response = await axiosPublic.put(
        "/api/v1/admin/product/inventory/update/inventory?request-id=1234",
        formattedData
      );
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Successful!",
          text: "Inventory saved successfully",
        });
        inventoryRefetch(); // Refetch data after update
        onClose(); // Close edit mode after save
      } else {
        alert("Error updating inventory. Please try again.");
      }
    } catch (error) {
      console.error("Error saving update:", error);
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: "Error updating inventory. Please try again.",
      });
    }
  };

  const handleCancel = () => {
    // Reset state to original inventory data
    setUpdateFields({
      color_name: inventory.color || "",
      quantity: inventory.quantity || 0,
      show_available_quantity: inventory.show_available_quantity || 0,
      base_price: inventory.base_price || 0,
      selling_price: inventory.selling_price || 0,
      applicable_tax_percent: inventory.applicable_tax_percent || 0,
      mark_availability: inventory.mark_availability || false,
      is_featured: inventory.is_featured || false,
    });
    onClose(); // Close the update section
  };

  return (
    <div className="w-full">
      <tr
        key={`update-form-${inventory.inventory_id}`}
        className="bg-gray-100 w-11/12 mx-auto"
      >
        <td className="p-2 text-center">
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
            onClick={() => document.getElementById("file-upload").click()}
            className="bg-[#00C20D] text-white rounded-md px-4 py-2 transition-all ease-in-out font-roboto"
          >
            Upload
          </button>
        </td>
        <td className="p-2 text-center">
          <select
            name="color_name"
            value={updateFields.color_name}
            onChange={handleInputChange}
            className="border rounded px-2 py-1 w-20"
          >
            <option value="">{updateFields.color_name}</option>
            {colors.map((color) => (
              <option key={color.color_id} value={color.color_id}>
                {color.color_name}
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
            className="border rounded px-2 py-1 w-20"
          />
        </td>
        <td className="p-2 text-center">
          <input
            type="number"
            name="show_available_quantity"
            value={updateFields.show_available_quantity}
            onChange={handleInputChange}
            className="border rounded px-2 py-1 w-20"
          />
        </td>
        <td className="p-2 text-center">
          <input
            type="number"
            name="base_price"
            value={updateFields.base_price}
            onChange={handleInputChange}
            className="border rounded px-2 py-1 w-20"
          />
        </td>
        <td className="p-2 text-center">
          <input
            type="number"
            name="selling_price"
            value={updateFields.selling_price}
            onChange={handleInputChange}
            className="border rounded px-2 py-1 w-20"
          />
        </td>
        <td className="p-2 text-center">
          <input
            type="number"
            name="applicable_tax_percent"
            value={updateFields.applicable_tax_percent}
            onChange={handleInputChange}
            className="border rounded px-2 py-1 w-20"
          />
        </td>
        <td className="p-2 text-center">
          <div className="flex justify-center space-x-2">
            <button
              onClick={handleSave}
              className="bg-green-500 text-white px-2 py-1 rounded"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="bg-red-500 text-white px-2 py-1 rounded"
            >
              Cancel
            </button>
          </div>
        </td>
      </tr>
      <div>
        {uploadedImages.length > 0 && (
          <div className="p-4 space-y-4 bg-white rounded-lg shadow-md flex flex-col gap-3">
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
            <button
              onClick={handleSaveImages}
              className="bg-green-500 text-white px-2 py-1 rounded"
            >
              Update Images
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UpdateInventory;
