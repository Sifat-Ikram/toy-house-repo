import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const OtpVerification = () => {
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      //   const response = await axiosPublic.post("/verify-otp", {
      //     phone: data.phone,
      //     otp: data.otp,
      //   });

      navigate("/newPassword");
    } catch (error) {
      setError(error.response?.data?.message || "Invalid OTP. Try again.");
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="w-full max-w-md p-8 shadow-lg rounded-lg border border-gray-200">
        <h2 className="text-2xl font-bold text-center mb-4">Enter OTP</h2>
        <p className="text-center text-gray-600 mb-4">
          Enter the OTP sent to your phone
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            type="text"
            placeholder="Enter 4-6 digit OTP"
            {...register("otp", {
              required: "OTP is required",
              pattern: { value: /^\d{4,6}$/, message: "Invalid OTP format" },
            })}
            className="input input-bordered w-full"
          />
          {errors.otp && (
            <p className="text-red-500 text-sm">{errors.otp.message}</p>
          )}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
          {error && <p className="text-red-500 text-center">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default OtpVerification;
