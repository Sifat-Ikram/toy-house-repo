import { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useMaterials from "../../hooks/useMaterials";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const AddMaterials = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [materialsColors, materialRefetch, materialIsLoading, materialError] = useMaterials();
  const axiosPublic = useAxiosPublic();

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      const response = await axiosPublic.post("api/v1/admin/materials/add?request-id=1234", {
        name: data.materialName,
      });
console.log(response.data);

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Material added successfully!",
          timer: 2000,
          showConfirmButton: false,
        });
        reset(); // Reset the form fields
        materialRefetch(); // Refetch materials
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error adding material. Please try again.",
      });
      console.log(error.message);
      
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-4xl mx-auto p-8 space-y-10">
        <h2 className="text-center text-3xl font-semibold text-gray-800">
          Manage Materials
        </h2>

        {materialIsLoading ? (
          <p className="text-center text-gray-500">Loading materials...</p>
        ) : materialError ? (
          <p className="text-center text-red-500">Failed to load materials.</p>
        ) : (
          <div>
            <h3 className="text-xl font-medium text-gray-700 mb-4">Existing Materials:</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              {materialsColors.map((material) => (
                <li key={material.material_id}>{material?.name}</li>
              ))}
            </ul>
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="text-center text-3xl font-semibold text-gray-800">
          Add A New Material
        </h2>
          {/* Material Name Input */}
          <div>
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
              className={`mt-1 block w-full px-3 py-2 border ${
                errors.materialName ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
              placeholder="Enter material name (e.g., Steel)"
            />
            {errors.materialName && (
              <span className="text-red-500 text-sm">{errors.materialName.message}</span>
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
                  : "bg-green-600 text-white hover:bg-green-700"
              }`}
            >
              {loading ? "Adding..." : "Add Material"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMaterials;
