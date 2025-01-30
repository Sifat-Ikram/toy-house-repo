// import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import img from "../../../assets/sign/sign_up.webp";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const Register = () => {
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const location = useLocation();
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
    if (data.password.length < 6) {
      setError("Your password should not be less than 6 characters");
      setLoading(false);
      return;
    }
    setError("");

    const payload = {
      username: data.username,
      email: data.email,
      phone_number: data.phone,
      password: data.password,
    };

    if (rememberMe) {
      localStorage.setItem("rememberedEmail", data.username);
      localStorage.setItem("rememberedPassword", data.password);
    } else {
      localStorage.removeItem("rememberedEmail");
      localStorage.removeItem("rememberedPassword");
    }

    try {
      const response = await axiosPublic.post(
        "/api/v1/open/users/register?request-id=1234",
        payload
      );
      console.log("Registration Successful:", response.data);

      // Redirect user after successful registration
      const path = location.state?.from?.pathname || "/";
      navigate(path);
    } catch (err) {
      console.error("Error during registration:", err);
      setError(
        err.response?.data?.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-5/6 mx-auto min-h-screen py-8">
      <div className="flex flex-col lg:flex-row gap-20">
        <div className="lg:w-2/5 lg:ml-10">
          <img
            src={img}
            className="w-3/4 mx-auto h-3/5 lg:w-[500px] lg:h-[500px] lg:mx-0 lg:mt-16"
            alt="Authentication illustration"
          />
        </div>
        <div className="lg:flex-1 flex flex-col justify-center items-center gap-5 px-8 py-4 md:py-7 lg:p-8 w-full md:shadow-2xl bg-white rounded-lg">
          <div className="text-center mb-1 lg:mb-3">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#03b4f6] tracking-tight leading-tight mb-1">
              Join Us Today!
            </h1>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-11/12 mx-auto space-y-2"
          >
            <div>
              <label className="label">
                <span className="label-text text-gray-600">Full Name</span>
              </label>
              <input
                name="name"
                {...register("name")}
                type="text"
                placeholder="Enter your full name"
                className="input input-bordered w-full"
              />
            </div>
            <div>
              <label className="label">
                <span className="label-text text-gray-600">Username</span>
              </label>
              <input
                name="username"
                type="text"
                {...register("username")}
                placeholder="Enter your username"
                className="input input-bordered w-full"
                required
              />
            </div>
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
            <div>
              <label className="label">
                <span className="label-text text-gray-600">Phone Number</span>
              </label>
              <input
                name="phone"
                type="number"
                {...register("phone")}
                placeholder="Enter your phone number"
                className="input input-bordered w-full"
                required
              />
            </div>
            <div className="relative">
              <label className="label">
                <span className="label-text text-gray-600">Password</span>
              </label>
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                {...register("password", { required: true })}
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

            <div className="flex items-center">
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                className="checkbox"
              />
              <label htmlFor="rememberMe" className="ml-2 text-gray-600">
                Remember me
              </label>
            </div>

            <div className="w-full">
              <button
                aria-label="Register"
                type="submit"
                className="w-full mt-3 bg-gradient-to-r from-[#53bde4] via-[#0db5f1] to-[#03b4f6] text-white font-semibold text-lg py-3 rounded-lg shadow-md transition-all duration-300 hover:scale-105 ease-in-out transform hover:translate-y-[-2px]"
              >
                {loading ? "processing..." : "Register"}
              </button>
            </div>
            <div className="text-center">
              <h1>
                Already have an account?{" "}
                <a className="hover:underline text-[#03b4f6]" href="/login">
                  Login
                </a>{" "}
                here
              </h1>
              {error && <p className="text-red-600">{error}</p>}
            </div>
          </form>
          <div className="w-full">
            <button
              onClick={handleGoogleRegister}
              className="w-11/12 mx-auto flex justify-center items-center md:gap-3 lg:gap-5 bg-white border border-[#03b4f6] text-[#03b4f6] font-semibold py-3 rounded-lg shadow-md hover:bg-[#03b4f6] hover:text-white transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              <FaGoogle className="mr-2" /> Register with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
