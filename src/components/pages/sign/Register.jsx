import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import img from "../../../assets/sign/authentication.gif";
import { useLocation, useNavigate } from "react-router-dom";

const image_hosting_key = import.meta.env.VITE_image_hosting_key;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const Register = () => {
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
    const imageFile = { image: data.image[0] };
    const resImage = await axios.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    console.log(resImage);

    const regex = /^(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    if (data.password.length < 6) {
      return <p>Your password should not be less than 6 characters</p>;
    } else if (regex.test(data.password)) {
      return <p>You cannot use any capital letter or special characters</p>;
    }
    setError("");

    if (rememberMe) {
      localStorage.setItem("email", data.email);
    }
    navigate("/");
    setLoading(false);
  };

  return (
    <div className="hero min-h-screen py-8">
      <div className="flex items-center flex-col lg:flex-row lg:gap-10 gap-8">
        <div className="flex-1">
          <img
            src={img}
            className="w-full h-auto mx-auto lg:mx-0"
            alt="Authentication illustration"
          />
        </div>
        <div className="flex flex-col justify-center items-center gap-5 px-8 py-4 md:py-7 lg:py-10 w-full max-w-xl md:shadow-2xl bg-white rounded-lg">
          <div className="text-center mb-1 lg:mb-3">
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-[#03b4f6] tracking-tight leading-tight mb-1">
              Join Us Today!
            </h1>
            <p className="text-sm md:text-lg text-gray-600">
              Register to explore amazing features
            </p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="w-11/12 mx-auto space-y-2">
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
                <span className="label-text text-gray-600">
                  Upload your photo
                </span>
              </label>
              <input
                name="image"
                {...register("image")}
                type="file"
                className="file-input file-input-bordered w-full"
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
                type="submit"
                className="w-full mt-3 bg-gradient-to-r from-[#53bde4] via-[#0db5f1] to-[#03b4f6] text-white font-semibold text-lg py-3 rounded-lg shadow-md transition-all duration-300 hover:scale-105 ease-in-out transform hover:translate-y-[-2px]"
              >
                {loading ? "processing..." : "Register"}
              </button>
            </div>
            <div className="text-center">
              <h1>
                Already have an account?{" "}
                <a className="hover:underline" href="/login">
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
