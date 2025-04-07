import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const PasswordReset = () => {
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const [error, setErrorState] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      // const response = await axiosPublic.post("/password-reset", {
      //   phone: data.phone,
      // });

      setSuccessMessage("An OTP has been sent to your phone.");
      setErrorState("");
      clearErrors();
      setLoading(false);

      // Redirect to login page after 3 seconds
      setTimeout(() => {
        navigate("/OtpVerification");
      }, 3000);
    } catch (error) {
      setErrorState(
        error.response?.data?.message ||
          "Something went wrong. Please try again."
      );
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen max-sm:w-11/12 mx-auto flex justify-center items-center px-2 sm:px-4 py-6 sm:py-8">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-lg p-6 md:p-8">
        {/* Heading */}
        <div className="text-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Forgot Your Password?
          </h1>
          <p className="text-gray-600 dark:text-gray-600 text-sm md:text-base mt-1">
          Enter your phone number to receive an OTP for password reset
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Phone Input */}
          <div>
            <input
              name="phone"
              type="text"
              placeholder="Enter your 11-digit phone number"
              {...register("phone", {
                required: "Phone number is required",
                pattern: {
                  value: /^\d{11}$/,
                  message: "Phone number must be exactly 11 digits",
                },
              })}
              className={`input input-bordered w-full text-sm md:text-base p-2 md:p-3 ${
                errors.phone ? "border-red-500" : ""
              }`}
              disabled={loading}
            />
            {errors.phone && (
              <p className="text-red-600 text-xs md:text-sm mt-1">
                {errors.phone.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#53bde4] via-[#0db5f1] to-[#03b4f6] text-white font-semibold text-sm md:text-lg py-2 md:py-3 rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:translate-y-[-2px]"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </div>

          {/* Error and Success Messages */}
          {error && (
            <p className="text-red-600 text-center text-xs md:text-sm">
              {error}
            </p>
          )}
          {successMessage && (
            <p className="text-green-600 text-center text-xs md:text-sm">
              {successMessage}
            </p>
          )}
        </form>

        {/* Redirect to login */}
        <div className="text-center mt-4">
          <p className="text-sm md:text-base">
            Remember your password?{" "}
            <a className="text-[#03b4f6] hover:underline" href="/login">
              Login here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PasswordReset;
