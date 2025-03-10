import { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useMaterials from "../../hooks/useMaterials";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { FaPlusCircle } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const AddMaterials = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [materialsColors, materialRefetch, materialIsLoading, materialError] =
    useMaterials();
  const axiosPublic = useAxiosPublic();

  const onSubmit = async (data) => {
    setLoading(true);

    const materialExists = materialsColors.some(
      (material) =>
        material.name.toLowerCase() === data.materialName.toLowerCase()
    );

    if (materialExists) {
      Swal.fire({
        icon: "warning",
        title: "Duplicate Material",
        text: "This material already exists.",
      });
      setLoading(false);
      return;
    }

    try {
      const response = await axiosPublic.post(
        "api/v1/admin/materials/add?request-id=1234",
        {
          name: data.materialName,
        }
      );

      if (response.status >= 200 && response.status < 300) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Material added successfully!",
          timer: 2000,
          showConfirmButton: false,
        });
        reset();
        materialRefetch();
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          error.response?.data?.message ||
          "Error adding material. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 py-12 px-6 sm:px-8 lg:px-16">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-8 space-y-8">
        {/* Page Title */}
        <h2 className="text-center text-4xl font-bold text-gray-800">
          Manage Materials
        </h2>

        {/* Existing Materials */}
        {materialIsLoading ? (
          <p className="text-center text-gray-500 animate-pulse">
            Loading materials...
          </p>
        ) : materialError ? (
          <p className="text-center text-red-500">Failed to load materials.</p>
        ) : (
          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-gray-700 mb-3">
              Existing Materials:
            </h3>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              {materialsColors.map((material) => (
                <li key={material.material_id} className="text-sm font-medium">
                  {material?.name}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Form */}
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <h2 className="text-center text-2xl font-semibold text-gray-800">
            Add A New Material
          </h2>

          {/* Material Name Input */}
          <div className="relative">
            <label
              htmlFor="materialName"
              className="block text-sm font-medium text-gray-600 mb-2"
            >
              Material Name
            </label>
            <input
              type="text"
              id="materialName"
              {...register("materialName", {
                required: "Material Name is required.",
              })}
              className={`w-full px-4 py-2 border ${
                errors.materialName ? "border-red-500" : "border-gray-300"
              } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="Enter material name (e.g., Steel)"
            />
            {errors.materialName && (
              <span className="text-red-500 text-sm">
                {errors.materialName.message}
              </span>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={loading}
              className={`w-full flex items-center justify-center gap-2 py-3 px-6 rounded-lg font-medium text-lg transition-all duration-300 shadow-md ${
                loading
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : "bg-green-600 text-white hover:bg-green-700"
              }`}
            >
              {loading ? (
                <>
                  <AiOutlineLoading3Quarters className="animate-spin text-xl" />
                  Adding...
                </>
              ) : (
                <>
                  <FaPlusCircle className="text-xl" />
                  Add Material
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMaterials;
