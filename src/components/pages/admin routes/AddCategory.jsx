import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import useCategory from "../../hooks/useCategory";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { FaTrash } from "react-icons/fa";

const image_hosting_key = import.meta.env.VITE_image_hosting_key;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const AddCategory = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const axiosPublic = useAxiosPublic();
  const [categories, refetch] = useCategory();
  const [categoryImage, setCategoryImage] = useState(null);

  const handleAddCategory = async (data) => {
    const { name, description } = data;

    // Check if the category name already exists
    const isExistingCategory = categories.some(
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
    if (!categoryImage) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please upload a category image!",
      });
      return;
    }

    try {
      // Upload the image to ImgBB
      const formData = new FormData();
      formData.append("image", categoryImage);

      const imageUploadResponse = await axios.post(image_hosting_api, formData);

      if (imageUploadResponse.status === 200) {
        const imageUrl = imageUploadResponse.data.data.url;
        const formattedData = {
          name: name,
          description: description,
          categoryLogoUrl: imageUrl,
        };

        // Send category details to the backend
        const response = await axiosPublic.post(
          "/api/v1/admin/categories/create?request-id=1234",
          formattedData
        );
        console.log(response);

        if (response.status === 200) {
          reset();
          setCategoryImage(null);
          refetch();

          Swal.fire({
            icon: "success",
            title: "Success!",
            text: "Category added successfully!",
          });
        } else {
          throw new Error(
            `Category creation failed. Status: ${response.status}`
          );
        }
      } else {
        throw new Error(
          "Image upload failed with status: " + imageUploadResponse.status
        );
      }
    } catch (error) {
      console.error("Error adding category:", error);

      // Handle detailed error
      if (error.response) {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: `There was an issue adding the category: ${
            error.response.data.message || "Unknown Error"
          }`,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "There was an issue adding the category. Please try again.",
        });
      }
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCategoryImage(file);
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
          .delete(`/api/v1/admin/categories/delete/${id}?request-id=1234`)
          .then((response) => {
            refetch();
            if (response.status === 200) {
              Swal.fire("Deleted!", "Category has been deleted.", "success");
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
    <div className="container mx-auto px-4 pt-14 min-h-screen bg-base-200 text-gray-700">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold">Manage Categories</h1>
      </div>
      <form onSubmit={handleSubmit(handleAddCategory)}>
        <div className="w-11/12 mx-auto flex flex-col items-center justify-between space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-2">
            {/* Category Name */}
            <div className="flex flex-col w-full items-center">
              <label htmlFor="name" className="font-semibold mb-1">
                Category Name
              </label>
              <input
                id="name"
                {...register("name", { required: "Category name is required" })}
                type="text"
                placeholder="Category name"
                className="input input-bordered w-full"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>

            {/* Category Description */}
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
              Add Category
            </button>
          </div>
        </div>
      </form>

      <div className="mt-14">
        <h2 className="text-xl font-bold">Existing Categories</h2>
        <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-8">
          {categories.length > 0 ? (
            categories.map((category) => (
              <li key={category.category_id} className="text-lg">
                <div className="relative flex flex-col items-center gap-2 shadow rounded-lg bg-white border">
                  <img
                    src={category.category_logo_url}
                    alt={category.name}
                    className="w-full h-32 object-cover"
                  />
                  <div className="flex flex-col items-center gap-[6px] p-2">
                    <h3 className="font-semibold font-poppins text-lg">
                      {category.name}
                    </h3>
                    <p className="text-sm font-roboto min-h-12">
                      {category.description}
                    </p>
                  </div>
                  <div>
                    <button
                      className="bg-red-600 absolute top-[2px] right-[2px] text-white p-2 rounded-full hover:bg-red-700"
                      onClick={() => handleDelete(category.category_id)}
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

export default AddCategory;
