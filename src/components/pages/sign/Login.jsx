import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import img from "../../../assets/sign/login.png";
import { useLocation, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { register, handleSubmit, setValue } = useForm();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    // Check localStorage for saved email and password
    const savedEmail = localStorage.getItem("rememberedEmail");
    const savedPassword = localStorage.getItem("rememberedPassword");

    if (savedEmail && savedPassword) {
      setValue("email", savedEmail);
      setRememberMe(true); // Pre-check the "Remember Me" checkbox
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
        localStorage.setItem("rememberedEmail", data.email);
      } else {
        localStorage.removeItem("rememberedEmail");
      }
      // Proceed with authentication logic here
      setError("");

      //   navigate(location?.state ? location.state : "/");
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
    <div className="hero min-h-screen py-8 bg-gradient-to-r from-[#f0f4ff] to-[#ffffff]">
      <div className="flex items-center flex-col lg:flex-row lg:gap-10 gap-8">
        {/* Image Section */}
        <div className="flex-1">
          <img
            src={img}
            className="w-full h-auto mx-auto lg:mx-0 shadow-lg rounded-lg"
            alt="Authentication illustration"
          />
        </div>

        {/* Form Section */}
        <div className="flex flex-col justify-center items-center gap-5 px-8 py-10 w-full max-w-xl md:shadow-2xl bg-white rounded-lg">
          {/* Heading */}
          <div className="text-center mb-1 lg:mb-3">
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-[#03b4f6] tracking-tight leading-tight mb-1">
              Join Us Today!
            </h1>
            <p className="text-sm md:text-lg text-gray-600">
              Register to explore amazing features
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="w-11/12 mx-auto space-y-2">
            {/* Email Input */}
            <div>
              <label className="label">
                <span className="label-text text-gray-600">Email</span>
              </label>
              <input
                name="email"
                type="email"
                {...register("email")}
                placeholder="Enter your email"
                className="input input-bordered w-full"
                required
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <label className="label">
                <span className="label-text text-gray-600">Password</span>
              </label>
              <input
                name="password"
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
              <a className="text-[#03b4f6] text-lg hover:underline" href="/register">
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
