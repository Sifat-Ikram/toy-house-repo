import { Link } from "react-router-dom";
import error from "../../../assets/error.png";
import { BsArrowReturnLeft } from "react-icons/bs";

const ErrorPage = () => {
  return (
    <div className="w-4/5 mx-auto flex flex-col justify-center items-center py-10">
      {/* Error Image */}
      <img
        src={error}
        alt="error"
        className="w-full max-h-[400px] object-contain rounded-lg"
      />

      {/* Spacing */}
      <div className="mt-8">
        <Link to={"/"}>
          <button className="flex items-center gap-3 bg-[#f52e2e] hover:bg-[#da3636] transition-colors duration-300 ease-in-out text-white font-quicksand font-semibold text-lg py-3 px-10 rounded-md">
            <BsArrowReturnLeft className="text-xl" />
            Go Back
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
