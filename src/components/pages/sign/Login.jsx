import { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import img from "../../../assets/sign/sign_in.webp";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { AuthContext } from "../../../provider/AuthProvider";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const axiosPublic = useAxiosPublic();
  const { register, handleSubmit, setValue } = useForm();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const { setUser } = useContext(AuthContext);

  useEffect(() => {
    const savedEmail =
      localStorage.getItem("rememberedUsername") ||
      sessionStorage.getItem("rememberedUsername");
    const savedPassword =
      localStorage.getItem("rememberedPassword") ||
      sessionStorage.getItem("rememberedPassword");

    if (savedEmail && savedPassword) {
      setValue("username", savedEmail);
      setValue("password", savedPassword);
      setRememberMe(true);
    }
  }, [setValue]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Inside onSubmit function, replacing sessionStorage with Cookies
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      if (rememberMe) {
        sessionStorage.setItem("rememberedUsername", data.username);
        sessionStorage.setItem("rememberedPassword", data.password);
        localStorage.setItem("rememberedUsername", data.username);
        localStorage.setItem("rememberedPassword", data.password);
      } else {
        sessionStorage.removeItem("rememberedUsername");
        sessionStorage.removeItem("rememberedPassword");
        localStorage.removeItem("rememberedUsername");
        localStorage.removeItem("rememberedPassword");
      }

      const response = await axiosPublic.post(
        `/api/v1/open/users/login?username=${data.username}&password=${data.password}&request-id=1234`
      );

      if (response.data?.accessToken) {
        // Store token in a cookie
        sessionStorage.setItem("userAccess", response.data?.accessToken);
        localStorage.setItem("userAccess", response.data?.accessToken);
        sessionStorage.setItem("userRefresh", response.data?.refreshToken);
        localStorage.setItem("userRefresh", response.data?.refreshToken);
        const expiryTime = Date.now() + response.data.expiresIn * 1000;
        localStorage.setItem("tokenExpiry", expiryTime);
        sessionStorage.setItem("tokenExpiry", expiryTime);
        setUser(response.data?.accessToken);
        setError("");
        navigate(location.state?.from || "/");
      } else {
        throw new Error("Something went wrong");
      }
    } catch (error) {
      console.log(error.message);
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full sm:w-5/6 mx-auto min-h-screen sm:py-8">
      <div className="flex md:items-center flex-col lg:flex-row sm:gap-8 md:gap-14 lg:gap-20">
        {/* Image Section */}
        <div className="lg:w-2/5 lg:ml-10 max-sm:hidden">
          <img
            src={img}
            className="w-3/4 mx-auto h-3/5 lg:w-[500px] lg:h-[500px] lg:mx-0 lg:mt-16"
            alt="Authentication illustration"
          />
        </div>

        {/* Form Section */}
        <div className="sm:flex-1 flex flex-col justify-center items-center gap-5 p-2 md:p-4 lg:p-5 w-full md:shadow-2xl bg-white rounded-lg">
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
                <span className="label-text text-gray-600">Phone Number</span>
              </label>
              <input
                name="username"
                type="text"
                {...register("username", {
                  required: "Phone Number is required",
                })}
                placeholder="Enter your Phone Number"
                className="input input-bordered w-full dark:bg-white"
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
                className="input input-bordered w-full dark:bg-white"
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
                  className="mr-2 dark:bg-white"
                />
                <label
                  htmlFor="rememberMe"
                  className="font-normal text-nowrap text-[12px] sm:text-sm md:text-base"
                >
                  Remember me
                </label>
              </div>
              <div>
                <Link to={"/forgotPassword"}>
                  <h1 className="font-normal text-nowrap text-[12px] sm:text-sm md:text-base hover:underline">
                    Forget Password?
                  </h1>
                </Link>
              </div>
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
        </div>
      </div>
    </div>
  );
};

export default Login;
