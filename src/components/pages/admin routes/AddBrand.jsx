import axios from "axios";
import Swal from "sweetalert2";
import { useState } from "react";
import { useForm } from "react-hook-form";
import useBrands from "../../hooks/useBrands";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { FaTrash } from "react-icons/fa";

const AddBrand = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const axiosPublic = useAxiosPublic();
  const [brands, brandRefetch] = useBrands();
  const [brandImage, setBrandImage] = useState(null);

  const image_hosting_key = import.meta.env.VITE_image_hosting_key;
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

  const handleAddBrand = async (data) => {
    const { name, description } = data;

    // Check if the category name already exists
    const isExistingCategory = brands.some(
      (category) => category.name.toLowerCase() === name.trim().toLowerCase()
    );
    if (isExistingCategory) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "This category name already exists!",
      });
      return;
    }

    // Check if an image is uploaded
    if (!brandImage) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please upload a brand image!",
      });
      return;
    }

    try {
      // Upload the image to ImgBB
      const formData = new FormData();
      formData.append("image", brandImage);

      const imageUploadResponse = await axios.post(image_hosting_api, formData);
      if (imageUploadResponse.status === 200) {
        const imageUrl = imageUploadResponse.data.data.url;
        const formattedData = {
          name: name,
          description: description,
          brandLogoUrl: imageUrl,
        };

        // After successful image upload, send category details to the backend
        const response = await axiosPublic.post(
          "api/v1/admin/brands/add?request-id=1234",
          formattedData
        );

        console.log(response);

        if (response.status === 200) {
          // Reset the form and fetch the updated categories
          reset();
          setBrandImage(null);
          //   setImagePreview(null);
          brandRefetch();

          Swal.fire({
            icon: "success",
            title: "Success!",
            text: "Brand added successfully!",
          });
        } else {
          throw new Error("Failed to add category");
        }
      } else {
        throw new Error("Image upload failed");
      }
    } catch (error) {
      console.error("Error adding category:", error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "There was an issue adding the category.",
      });
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBrandImage(file);
    }
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic
          .delete(`/api/v1/admin/brands/delete/${id}?request-id=1234`)
          .then((response) => {
            brandRefetch();
            if (response.status === 200) {
              Swal.fire("Deleted!", "Brand has been deleted.", "success");
            }
          })
          .catch((error) => {
            console.log(error.message);
            Swal.fire("Error!", "Something went wrong.", "error");
          });
      }
    });
  };

  return (
    <div className="container mx-auto p-4 bg-base-200 text-gray-700">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold">Manage Brands</h1>
      </div>
      <form onSubmit={handleSubmit(handleAddBrand)}>
        <div className="w-11/12 mx-auto flex flex-col items-center justify-between space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-2">
            {/* Brand Name */}
            <div className="flex flex-col w-full items-center">
              <label htmlFor="name" className="font-semibold mb-1">
                Brand Name
              </label>
              <input
                id="name"
                {...register("name")}
                type="text"
                placeholder="Category name"
                className="input input-bordered w-full"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>

            {/* Brand Description */}
            <div className="flex flex-col w-full items-center">
              <label htmlFor="description" className="font-semibold mb-1">
                Description
              </label>
              <input
                id="description"
                {...register("description")}
                placeholder="Category description"
                className="input input-bordered w-full"
              />
              {errors.description && (
                <p className="text-red-500 text-sm">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Upload Image Button */}
            <div className="flex flex-col w-full items-center">
              <label htmlFor="imageInput" className="font-semibold mb-1">
                Upload Image
              </label>
              <button
                type="button"
                onClick={() => document.getElementById("imageInput").click()}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md font-semibold"
              >
                Upload Image
              </button>
              <input
                id="imageInput"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-[#00C20D] w-full ease-in-out hover:bg-green-700 rounded-md px-4 py-2 text-white font-semibold"
            >
              Add Brand
            </button>
          </div>
        </div>
      </form>

      <div className="mt-14">
        <h2 className="text-xl font-bold">Existing Brand</h2>
        <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-8">
          {brands.length > 0 ? (
            brands.map((brand) => (
              <li key={brand.brand_id} className="text-lg">
                <div className="relative flex flex-col items-center gap-2 shadow rounded-lg bg-white border">
                  <img
                    src={brand.brand_logo_url}
                    alt={brand.name}
                    className="w-full h-32 object-cover"
                  />
                  <div className="flex flex-col items-center gap-[6px] p-2">
                    <h3 className="font-semibold font-poppins text-lg">
                      {brand.name}
                    </h3>
                    <p className="text-sm font-roboto min-h-10">
                      {brand.description}
                    </p>
                  </div>
                  <div>
                    <button
                      className="bg-red-600 absolute top-[2px] right-[2px] text-white p-2 rounded-full hover:bg-red-700"
                      onClick={() => handleDelete(brand.brand_id)}
                    >
                      <FaTrash className="text-xs" />
                    </button>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <p className="text-center text-gray-500">
              No categories available yet.
            </p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default AddBrand;
