import { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useColor from "../../hooks/useColor";

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

    try {
      const response = await axiosPublic.post(
        "/api/v1/admin/colors/create?request-id=1234",
        {
          colorName: data.colorName,
        }
      );

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Color added successfully!",
          timer: 2000,
          showConfirmButton: false,
        });
        reset(); // Resets form fields
        colorRefetch(); // Fetch updated colors after successful addition
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error adding color. Please try again.",
      });
      console.log(error.message);
      
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full mx-auto space-y-14 p-8 rounded-xl">
        <h2 className="text-center text-3xl font-semibold text-gray-800">
          Manage Colors
        </h2>

        {colorIsLoading ? (
          <p className="text-center text-gray-500">Loading colors...</p>
        ) : colorError ? (
          <p className="text-center text-red-500">Failed to load colors.</p>
        ) : (
          <div>
            <h3 className="text-xl font-medium text-gray-700 mb-4">
              Existing Colors:
            </h3>
            <ul className="list-disc list-inside text-gray-600">
              {colors.map((color) => (
                <li key={color.color_id}>{color.color_name}</li>
              ))}
            </ul>
          </div>
        )}

        <form className="mt-6 space-y-10" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="text-center text-3xl font-semibold text-gray-800">
          Add A New Colors
        </h2>
          {/* Color Name Input */}
          <div>
            <label
              htmlFor="colorName"
              className="block text-sm font-medium text-gray-600 mb-2"
            >
              Color Name
            </label>
            <input
              type="text"
              id="colorName"
              {...register("colorName", {
                required: "Color Name is required.",
              })}
              className={`mt-1 block w-full px-3 py-2 border ${
                errors.colorName ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
              placeholder="Enter the name of the color (e.g., Red)"
            />
            {errors.colorName && (
              <span className="text-red-500 text-sm">
                {errors.colorName.message}
              </span>
            )}
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 px-4 rounded-md font-medium focus:outline-none ${
                loading
                  ? "bg-gray-400 text-white"
                  : "bg-[#00C20D] w-full ease-in-out hover:bg-green-700 rounded-md px-4 py-2 text-white font-semibold"
              }`}
            >
              {loading ? "Adding..." : "Add Color"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddColor;
