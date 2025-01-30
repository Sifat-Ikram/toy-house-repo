import { useEffect, useState } from "react";
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
import useImage from "../../hooks/useImage";

const image_hosting_key = import.meta.env.VITE_image_hosting_key;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const Inventories = () => {
  const { id } = useParams();
  const [inventories, inventoryRefetch] = useInventories({ id });
  const [colors] = useColor();
  const axiosPublic = useAxiosPublic();
  const { register, handleSubmit } = useForm();
  const [uploadedImages, setUploadedImages] = useState([]);
  const [isImageVisible, setIsImageVisible] = useState(false);
  const [sentData, setSentData] = useState(false);
  const [isAddingInventory, setIsAddingInventory] = useState(false);
  const [selectedImages, setSelectedImages] = useState(false);
  const [selectedInventoryId, setSelectedInventoryId] = useState(null);
  const [images] = useImage();

  console.log(images);
  

  useEffect(() => {
    if (sentData && inventories.length > 0) {
      inventories.forEach((inventory) => {
        if (inventory.color_id === sentData.color_id) {
          setSelectedImages(sentData);
        } else {
          return;
        }
      });
    }
  }, [inventories, sentData]);

  if (!inventories) {
    return <span className="loading loading-ring loading-lg"></span>;
  }

  const handleEditClick = (inventoryId) => {
    setSelectedInventoryId((prevId) =>
      prevId === inventoryId ? null : inventoryId
    );
  };

  const handleShowHideImage = (inventoryId) => {
    setIsImageVisible((prev) => {
      console.log("Toggling image for:", inventoryId, "Current state:", prev);
      return {
        ...prev,
        [inventoryId]: !prev?.[inventoryId],
      };
    });
  };

  // Function to handle file change event for multiple images
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

  console.log(selectedImages);

  const handleRemoveImage = (inventoryId, imageId) => {
    setUploadedImages((prevImages) => {
      const newImages = { ...prevImages };
      newImages[inventoryId] = newImages[inventoryId].filter(
        (image) => image.image_id !== imageId
      );
      return newImages;
    });
  };

  const handleSaveInventory = async (data) => {
    const formattedData = {
      product_id: id,
      inventory: {
        quantity: Number(data.quantity),
        show_available_quantity: parseFloat(data.show_available_quantity),
        mark_unavailable: false,
        base_price: parseFloat(data.base_price),
        selling_price: parseFloat(data.selling_price),
        applicable_tax_percent: parseFloat(data.applicable_tax_percent),
        color_id: parseFloat(data.color_id || 0),
        product_images: uploadedImages?.map((image) => ({
          image_url: image?.image_url || "",
          is_display_image: true,
        })),
        product_videos: [],
        is_featured: false,
      },
    };

    console.log(formattedData);

    setSentData(formattedData);

    try {
      const response = await axiosPublic.post(
        "/api/v1/admin/product/inventory/upload/inventory?request-id=1234",
        formattedData
      );
      console.log(response.data);
      if (response.status === 200) {
        inventoryRefetch();
        Swal.fire({
          icon: "success",
          title: "Successful!",
          text: "Inventory saved successfully",
        });
        setIsAddingInventory("");
      } else {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "Failed to save inventory. Please try again",
        });
      }
    } catch (error) {
      console.error("Error saving inventory:", error.message);
      if (error.response) {
        console.error("API response:", error.response.data); // Logs the response data from the server
      }
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
              <table className="min-w-full table-auto table-layout-auto">
                <thead className="bg-base-300">
                  <tr className="gap-10">
                    <th className="p-2 text-center text-gray-600">Images</th>
                    <th className="p-4 text-center text-gray-600">Color</th>
                    <th className="p-4 text-center text-gray-600">Quantity</th>
                    <th className="p-4 text-center text-gray-600">
                      Available Quantity
                    </th>
                    <th className="p-4 text-center text-gray-600">
                      Base Price
                    </th>
                    <th className="p-4 text-center text-gray-600">
                      Base Price After Tax
                    </th>
                    <th className="p-4 text-center text-gray-600">
                      Selling Price
                    </th>
                    <th className="p-4 text-center text-gray-600">
                      Selling Price After Tax
                    </th>
                    <th className="py-4 text-center text-gray-600">
                      Applicable Tax Percent
                    </th>
                    <th className="py-4 text-center text-gray-600">
                      Discount Percentage
                    </th>
                    <th className="py-4 text-center text-gray-600">
                      Discount Price
                    </th>
                    <th className="py-4 text-center text-gray-600">
                      Mark Availability
                    </th>
                    <th className="py-4 text-center text-gray-600">New</th>
                    <th className="py-4 text-center text-gray-600">Featured</th>
                    <th className="p-4 text-center text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {inventories?.map((inventory) => (
                    <>
                      <tr
                        key={inventory?.inventory_id}
                        className="bg-white shadow-lg rounded-lg overflow-x-auto px-4 md:px-10"
                      >
                        <td className="p-4 text-center">
                          <button
                            onClick={() =>
                              handleShowHideImage(inventory?.inventory_id)
                            }
                            className="bg-[#00C20D] text-white rounded-md px-4 py-2 transition-all ease-in-out font-roboto"
                          >
                            {isImageVisible[inventory?.inventory_id]
                              ? "Hide Image"
                              : "Show Image"}
                          </button>
                        </td>
                        <td className="p-4 text-center">{inventory.color}</td>
                        <td className="p-4 text-center">
                          {inventory.quantity}
                        </td>
                        <td className="p-4 text-center">
                          {inventory.show_available_quantity}
                        </td>
                        <td className="p-4 text-center">
                          {inventory.base_price}
                        </td>
                        <td className="p-4 text-center">
                          {inventory.base_price_after_tax}
                        </td>
                        <td className="p-4 text-center">
                          {inventory.selling_price}
                        </td>
                        <td className="p-4 text-center">
                          {inventory.selling_price_after_tax}
                        </td>
                        <td className="p-4 text-center">
                          {inventory.applicable_tax_percent}
                        </td>
                        <td className="p-4 text-center">
                          {inventory.discount_percent}
                        </td>
                        <td className="p-4 text-center">
                          {inventory.discount_price}
                        </td>
                        <td className="p-4 text-center">
                          {inventory.mark_unavailable ? "true" : "false"}
                        </td>
                        <td className="p-4 text-center">
                          {inventory.is_new ? "true" : "false"}
                        </td>
                        <td className="p-4 text-center">
                          {inventory.is_featured ? "true" : "false"}
                        </td>
                        <td className="p-4 flex justify-center items-center text-center space-x-4">
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
                      {isImageVisible && (
                        <><h1>No image</h1></>
                        // <div>
                        //   {uploadedImages && (
                        //     <div className="p-4 space-y-4 bg-white rounded-lg shadow-md">
                        //       <div className="flex items-center gap-4 mt-4">
                        //         {uploadedImages.map((image) => (
                        //           <div
                        //             key={image?.image_id}
                        //             className="relative w-24 h-24"
                        //           >
                        //             {/* Image */}
                        //             <img
                        //               src={image.image_url}
                        //               alt={image?.image_id}
                        //               className="rounded-md shadow-md w-full h-full object-cover"
                        //             />
                        //             {/* Close Button */}
                        //             <button
                        //               type="button"
                        //               className="absolute top-0 right-0 bg-white text-black text-xs rounded-full px-1 shadow hover:bg-red-500 hover:text-white"
                        //               onClick={() =>
                        //                 handleRemoveImage(image?.image_id)
                        //               }
                        //             >
                        //               X
                        //             </button>
                        //           </div>
                        //         ))}
                        //       </div>
                        //     </div>
                        //   )}
                        // </div>
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
                      step="0.01"
                    />
                  </td>
                  <td className="py-2 text-center">
                    <button
                      type="submit"
                      className="bg-[#00C20D] text-white rounded-md px-4 py-2 transition-all ease-in-out font-roboto"
                    >
                      Add
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
