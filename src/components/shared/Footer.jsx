import logo from "../../assets/logo/Toy House Final.svg";

const Footer = () => {
  return (
    <div className="bg-[#FFFCB7] pt-10 sm:pt-16 md:pt-20 space-y-8">
      <div className="w-11/12 md:w-4/5 mx-auto flex flex-col sm:flex-row justify-center sm:gap-6 lg:gap-10 items-center py-5 space-y-10 sm:space-y-0">
        <div className="w-full sm:w-1/2 mx-auto flex flex-col items-center lg:items-start space-y-5">
          <img src={logo} className="h-[68px] w-68px" alt="Logo" />
          <p className="text-base font-normal font-roboto text-black text-center lg:text-left">
            Join our newsletter to stay up to date on features and releases.
          </p>
          <div className="flex items-center gap-2">
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
        <div className="sm:flex-1 grid grid-cols-1 sm:grid-cols-2 text-center lg:text-left">
          <div className="flex justify-between items-center gap-8">
            <div className="flex flex-col space-y-3">
              <h1 className="font-roboto text-base font-semibold">
                Column One
              </h1>
              <p className="font-roboto text-sm">Link 1</p>
              <p className="font-roboto text-sm">Link 2</p>
              <p className="font-roboto text-sm">Link 3</p>
              <p className="font-roboto text-sm">Link 4</p>
              <p className="font-roboto text-sm">Link 5</p>
            </div>
            <div className="flex flex-col space-y-3">
              <h1 className="font-roboto text-base font-semibold">
                Column Two
              </h1>
              <p className="font-roboto text-sm">Link 1</p>
              <p className="font-roboto text-sm">Link 2</p>
              <p className="font-roboto text-sm">Link 3</p>
              <p className="font-roboto text-sm">Link 4</p>
              <p className="font-roboto text-sm">Link 5</p>
            </div>
          </div>
          <div className="flex flex-col space-y-3 max-sm:mt-5">
            <h1 className="font-roboto flex flex-wrap justify-center text-base font-semibold">
              Column Three
            </h1>
            <div className="flex sm:flex-col justify-center items-center gap-3">
              <p className="font-roboto text-sm">Link 1</p>
              <p className="font-roboto text-sm">Link 2</p>
              <p className="font-roboto text-sm">Link 3</p>
              <p className="font-roboto text-sm">Link 4</p>
              <p className="font-roboto text-sm">Link 5</p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-4/5 mx-auto flex flex-col sm:flex-row justify-between items-center border-t-2 border-solid border-black pt-5 pb-10">
          <h1 className="text-sm font-roboto">© 2024 Toy House. All rights reserved.</h1>
          <div className="flex justify-center items-center gap-3 max-sm:mt-5 sm:gap-5">
            <h1 className="text-sm font-roboto">Privacy Policy</h1>
            <h1 className="text-sm font-roboto">Terms of Service</h1>
            <h1 className="text-sm font-roboto">Cookies Settings</h1>
          </div>
      </div>
    </div>
  );
};

export default Footer;
