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
      const response = await axiosPublic.post("/password-reset", {
        email: data.email,
      });

      setSuccessMessage("A password reset link has been sent to your email.");
      setErrorState("");
      clearErrors();
      setLoading(false);

      // Redirect to login page after 3 seconds
      setTimeout(() => {
        navigate("/login");
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
    <div className="hero min-h-screen bg-gradient-to-r from-[#f0f4ff] to-[#ffffff] py-8">
      <div className="flex flex-col justify-center items-center gap-5 px-8 py-10 w-full max-w-xl shadow-2xl bg-white rounded-lg">
        {/* Heading */}
        <div className="text-center mb-3">
          <h1 className="text-5xl font-bold tracking-tight leading-tight mb-1">
            Forgot Your Password?
          </h1>
          <p className="text-lg text-gray-600">
            Enter your email to receive a password reset link
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-2">
          {/* Email Input */}
          <div>
            <input
              name="email"
              type="email"
              placeholder="Enter your email"
              {...register("email", {
                required: "Email is required",
              })}
              className={`input input-bordered w-full ${
                errors.email ? "border-red-500" : ""
              }`}
              disabled={loading}
            />
            {errors.email && (
              <p className="text-red-600">{errors.email.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#53bde4] via-[#0db5f1] to-[#03b4f6] text-white font-semibold text-lg py-3 rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:translate-y-[-2px]"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </div>

          {/* Error and Success Messages */}
          {error && <p className="text-red-600 text-center">{error}</p>}
          {successMessage && (
            <p className="text-green-600 text-center">{successMessage}</p>
          )}
        </form>

        {/* Redirect to login */}
        <div className="text-center">
          <h1>
            Remember your password?{" "}
            <a className="text-[#03b4f6] hover:underline" href="/login">
              Login here
            </a>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default PasswordReset;
