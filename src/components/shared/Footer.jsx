import { Link } from "react-router-dom";
import logo from "../../assets/logo/image-removebg-preview_6.webp";
import {
  AiOutlineFacebook,
  AiOutlineInstagram,
  AiOutlineLinkedin,
} from "react-icons/ai";
import { FaXTwitter } from "react-icons/fa6";
import { TbBrandYoutube } from "react-icons/tb";

const Footer = () => {
  // const location = useLocation();
  // const isHomePage = location.pathname === "/";

  return (
    <div className="bg-[#FFFCB7] pt-10 sm:pt-20 space-y-8 relative max-sm:w-full dark:text-black">
      <div className="w-11/12 md:w-4/5 mx-auto flex flex-wrap flex-row justify-center gap-2 sm:gap-6 lg:gap-10 space-y-10 sm:space-y-0">
        <div className="w-full sm:w-1/2 mx-auto flex flex-col items-center lg:items-start space-x-[5px] sm:space-y-3">
          <img src={logo} className="h-[100px]" alt="Logo" />
          <p className="text-base font-normal font-roboto text-center lg:pr-28 lg:text-left">
            By subscribing you agree to our Privacy Policy and consent to
            receive updates from our company.
          </p>
        </div>
        <div className="sm:flex-1 flex flex-col max-sm:items-center space-y-3">
          <h1 className="font-roboto text-sm md:text-base lg:text-lg font-semibold">
            Follow Us
          </h1>
          <div className="flex gap-8 flex-wrap items-center">
            <Link>
              <AiOutlineFacebook className="font-roboto text-3xl font-light" />
            </Link>
            <Link>
              <AiOutlineInstagram className="font-roboto text-3xl font-light" />
            </Link>
            <Link>
              <FaXTwitter className="font-roboto text-[26px] font-light" />{" "}
            </Link>
            <Link>
              <AiOutlineLinkedin className="font-roboto text-3xl font-light" />
            </Link>
            <Link>
              <TbBrandYoutube className="font-roboto text-3xl font-light" />
            </Link>
          </div>
          <div className="space-y-3">
            <p className="text-base font-normal font-roboto text-black text-center lg:text-left">
              Join our newsletter to stay up to date on features and releases.
            </p>
            <div className="flex items-center gap-2">
              <input
                placeholder="Enter your email"
                className="p-2 w-full lg:w-[365px] bg-[#FFFCB7] dark:placeholder:text-black border-[1px] border-solid dark:border-black border-black"
              />
              <button className="p-2 bg-[#FFFCB7] dark:text-black border-[1px] border-solid rounded-sm btn-outline dark:border-black hover:bg-black hover:text-white text-base">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="w-4/5 mx-auto flex flex-col sm:flex-row justify-between items-center border-t-2 border-solid border-black pt-5 pb-10">
        <h1 className="text-sm font-roboto">
          © 2024 Toy House. All rights reserved.
        </h1>
        <div className="flex max-sm:flex-col justify-center items-center gap-3 max-sm:mt-5 sm:gap-5">
          <Link to="/privacyPolicy">
            <h1 className="text-sm font-roboto">Privacy Policy</h1>
          </Link>
          <h1 className="text-sm font-roboto">Terms of Service</h1>
          <h1 className="text-sm font-roboto">Cookies Settings</h1>
        </div>
      </div>
    </div>
  );
};

export default Footer;
