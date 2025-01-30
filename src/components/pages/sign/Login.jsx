import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import img from "../../../assets/sign/sign_in.webp";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const axiosPublic = useAxiosPublic();
  const { register, handleSubmit, setValue } = useForm();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");
    const savedPassword = localStorage.getItem("rememberedPassword");

    if (savedEmail && savedPassword) {
      setValue("email", savedEmail);
      setValue("password", savedPassword);
      setRememberMe(true);
    }
  }, [setValue]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleGoogleRegister = () => {
    navigate(location?.state ? location.state : "/");
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      // Simulating the login process
      if (rememberMe) {
        localStorage.setItem("rememberedEmail", data.username);
        localStorage.setItem("rememberedPassword", data.password);
      } else {
        localStorage.removeItem("rememberedEmail");
        localStorage.removeItem("rememberedPassword");
      }
      const payload = {
        username: data.username,
        password: data.password,
      };

      const response = await axiosPublic.post(
        `/api/v1/open/users/login?username=${data.username}&password=${data.password}&request-id=1234`,
        payload
      );
      console.log("Registration Successful:", response.data);

      setError("");
      navigate(location?.state ? location.state : "/");
      console.log(data);
    } catch (error) {
      console.log(error.message);

      setError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    // Navigate to a password reset page or send a password reset email
    navigate("/forgot-password");
  };

  return (
    <div className="w-5/6 mx-auto min-h-screen py-8">
      <div className="flex items-center flex-col lg:flex-row gap-20">
        {/* Image Section */}
        <div className="lg:w-2/5 lg:ml-10">
          <img
            src={img}
            className="w-3/4 mx-auto h-3/5 lg:w-[500px] lg:h-[500px] lg:mx-0 lg:mt-16"
            alt="Authentication illustration"
          />
        </div>

        {/* Form Section */}
        <div className="lg:flex-1 flex flex-col justify-center items-center gap-5 px-8 py-10 w-full max-w-xl md:shadow-2xl bg-white rounded-lg">
          {/* Heading */}
          <div className="text-center mb-1 lg:mb-3">
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-[#03b4f6] tracking-tight leading-tight mb-1">
              Welcome back!
            </h1>
            <p className="text-sm md:text-lg text-gray-600 px-10">
              Please log in to access your account and enjoy personalized
              features
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-11/12 mx-auto space-y-2"
          >
            {/* Email Input */}
            <div>
              <label className="label">
                <span className="label-text text-gray-600">
                  Email or Username
                </span>
              </label>
              <input
                name="username"
                type="text"
                {...register("username", {
                  required: "username is required",
                })}
                placeholder="Enter your email or username"
                className="input input-bordered w-full"
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <label className="label">
                <span className="label-text text-gray-600">Password</span>
              </label>
              <input
                name="password"
                {...register("password", { required: "Password is required" })}
                aria-label="Password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="input input-bordered w-full"
              />
              <div
                className="absolute right-3 bottom-3 cursor-pointer text-gray-500"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                  className="mr-2"
                />
                <label htmlFor="rememberMe" className="text-gray-600">
                  Remember me
                </label>
              </div>
              <button type="button" onClick={handleForgotPassword} className="">
                Forgot password?
              </button>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full mt-3 bg-gradient-to-r from-[#53bde4] via-[#0db5f1] to-[#03b4f6] text-white font-semibold text-lg py-3 rounded-lg shadow-md transition-all duration-300 hover:scale-105 ease-in-out transform hover:translate-y-[-2px]"
              >
                {loading ? "processing..." : "Login"}
              </button>
            </div>

            {/* Error Message */}
            {error && <p className="text-red-600 text-center">{error}</p>}
          </form>

          {/* Register Link */}
          <div className="text-center">
            <h1>
              Don't have an account?{" "}
              <a
                className="text-[#03b4f6] text-lg hover:underline"
                href="/register"
              >
                Register
              </a>{" "}
              here
            </h1>
          </div>

          {/* Google Login */}
          <div className="w-full">
            <button
              onClick={handleGoogleRegister}
              className="w-11/12 mx-auto flex justify-center items-center md:gap-3 lg:gap-5 bg-white border border-[#03b4f6] text-[#03b4f6] font-semibold py-3 rounded-lg shadow-md hover:bg-[#03b4f6] hover:text-white transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              <FaGoogle className="mr-2" /> Login with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
