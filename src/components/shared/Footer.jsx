import { useLocation } from "react-router-dom";
import logo from "../../assets/logo/ToyHouse_Logo_trans.png";

const Footer = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <div
      className={`bg-[#FFFCB7] ${
        isHomePage ? "pt-60 sm:pt-48 z-10 -mt-32" : "pt-20"
      } space-y-8 relative max-sm:w-full`}
    >
      <div className="w-11/12 md:w-4/5 mx-auto flex flex-col sm:flex-row justify-center sm:gap-6 lg:gap-10 items-center py-5 space-y-10 sm:space-y-0">
        <div className="w-full sm:w-1/2 mx-auto flex flex-col items-center lg:items-start space-y-5">
          <img src={logo} className="h-[90px]" alt="Logo" />
          <p className="text-base font-normal font-roboto text-black text-center lg:text-left">
            Join our newsletter to stay up to date on features and releases.
          </p>
          <div className="flex max-sm:flex-col items-center gap-2">
            <input
              placeholder="Enter your email"
              className="p-2 w-full lg:w-[365px] bg-[#FFFCB7] border-[1px] border-solid border-black"
            />
            <button className="p-2 bg-[#FFFCB7] border-[1px] border-solid rounded-sm btn-outline hover:bg-black hover:text-white text-base">
              Subscribe
            </button>
          </div>
          <p className="text-xs font-normal font-roboto text-center lg:pr-28 lg:text-left">
            By subscribing you agree to our{" "}
            <a href="/privacyPolicy" className="underline">
              Privacy Policy
            </a>{" "}
            and consent to receive updates from our company.
          </p>
        </div>
        <div className="sm:flex-1 flex flex-wrap justify-evenly items-center text-center gap-10 sm:gap-3 md:gap-5 lg:gap-8">
          <div className="flex flex-col space-y-3">
            <h1 className="font-roboto text-xs md:text-sm lg:text-base font-semibold">
              Column One
            </h1>
            <p className="font-roboto text-sm">Link One</p>
            <p className="font-roboto text-sm">Link Two</p>
            <p className="font-roboto text-sm">Link Three</p>
            <p className="font-roboto text-sm">Link Four</p>
            <p className="font-roboto text-sm">Link Five</p>
          </div>
          <div className="flex flex-col space-y-3">
            <h1 className="font-roboto text-xs md:text-sm lg:text-base font-semibold">
              Column Two
            </h1>
            <p className="font-roboto text-sm">Link Six</p>
            <p className="font-roboto text-sm">Link Seven</p>
            <p className="font-roboto text-sm">Link Eight</p>
            <p className="font-roboto text-sm">Link Nine</p>
            <p className="font-roboto text-sm">Link Ten</p>
          </div>
          <div className="flex flex-col space-y-3">
            <h1 className="font-roboto text-xs md:text-sm lg:text-base font-semibold">
              Follow Us
            </h1>
            <p className="font-roboto text-sm">Facebook</p>
            <p className="font-roboto text-sm">Instagram</p>
            <p className="font-roboto text-sm">X</p>
            <p className="font-roboto text-sm">LinkedIn</p>
            <p className="font-roboto text-sm">Youtube</p>
          </div>
        </div>
      </div>
      <div className="w-4/5 mx-auto flex flex-col sm:flex-row justify-between items-center border-t-2 border-solid border-black pt-5 pb-10">
        <h1 className="text-sm font-roboto">
          © 2024 Toy House. All rights reserved.
        </h1>
        <div className="flex max-sm:flex-col justify-center items-center gap-3 max-sm:mt-5 sm:gap-5">
          <h1 className="text-sm font-roboto">Privacy Policy</h1>
          <h1 className="text-sm font-roboto">Terms of Service</h1>
          <h1 className="text-sm font-roboto">Cookies Settings</h1>
        </div>
      </div>
    </div>
  );
};

export default Footer;
