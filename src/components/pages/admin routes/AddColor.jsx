import { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useColor from "../../hooks/useColor";
import { FaPlus } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const AddColor = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const axiosPublic = useAxiosPublic();
  const [loading, setLoading] = useState(false);
  const [colors, colorRefetch, colorIsLoading, colorError] = useColor();

  const onSubmit = async (data) => {
    setLoading(true);

    const colorExists = colors.some(
      (color) => color.color_name.toLowerCase() === data.colorName.toLowerCase()
    );

    if (colorExists) {
      Swal.fire({
        icon: "warning",
        title: "Duplicate Color",
        text: "This color already exists.",
      });
      setLoading(false);
      return;
    }

    try {
      const response = await axiosPublic.post(
        "/api/v1/admin/colors/create?request-id=1234",
        { colorName: data.colorName }
      );

      if (response.status >= 200 && response.status < 300) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Color added successfully!",
          timer: 2000,
          showConfirmButton: false,
        });
        reset();
        colorRefetch();
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Error adding color. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-50 to-green-100 py-12 px-6 sm:px-10 lg:px-24">
      <div className="max-w-3xl mx-auto bg-white rounded-lg p-10 border border-gray-300">
        {/* Page Title */}
        <h2 className="text-center text-4xl font-bold text-green-700">
          🎨 Manage Colors
        </h2>

        {/* Existing Colors */}
        {colorIsLoading ? (
          <p className="text-center text-gray-600 animate-pulse mt-6">Loading colors...</p>
        ) : colorError ? (
          <p className="text-center text-red-500 mt-6">Failed to load colors.</p>
        ) : (
          <div className="mt-6 p-4 border border-gray-300 rounded-lg bg-green-50">
            <h3 className="text-lg font-medium text-green-700 mb-3">Existing Colors:</h3>
            <div className="flex flex-wrap gap-2">
              {colors.map((color) => (
                <span
                  key={color.color_id}
                  className="px-4 py-1 text-sm font-medium rounded-full bg-green-200 text-green-900"
                >
                  {color.color_name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Form */}
        <form className="space-y-6 mt-8" onSubmit={handleSubmit(onSubmit)}>

          {/* Color Name Input */}
          <div>
            <label
              htmlFor="colorName"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Color Name
            </label>
            <input
              type="text"
              id="colorName"
              {...register("colorName", { required: "Color Name is required." })}
              className={`w-full px-4 py-2 border ${
                errors.colorName ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-50`}
              placeholder="Enter color name (e.g., Red)"
            />
            {errors.colorName && (
              <span className="text-red-500 text-sm">{errors.colorName.message}</span>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={loading}
              className={`w-full flex items-center justify-center gap-2 py-3 px-6 rounded-lg font-medium text-lg transition-all duration-300 ${
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
                  <FaPlus className="text-xl" />
                  Add Color
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddColor;
