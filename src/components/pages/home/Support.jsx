import { FaTruckFast } from "react-icons/fa6";
import { BsShieldFillCheck } from "react-icons/bs";

const Support = () => {
  return (
    <div className="bg-[#FDFEC1] py-10">
      <div className="w-5/6 mx-auto flex flex-col lg:flex-row justify-center items-center gap-10 lg:gap-0">
        <div className="lg:w-1/2">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-normal font-coiny text-center lg:text-left lg:mx-28">
            Shopping at toyhouse.com Has its Perks
          </h1>
        </div>
        <div className="flex-1 flex flex-row justify-center gap-10 lg:gap-24 items-center">
          <div className="flex flex-col items-center lg:items-start">
            <FaTruckFast className="text-[40px] md:text-[50px] lg:text-[60px] bg-white" />
            <h1 className="text-sm md:text-base lg:text-base font-normal font-roboto text-center lg:text-left">
              <span className="font-bold">Free Shipping</span> on Orders of BDT
              1000+
            </h1>
          </div>
          <div className="flex flex-col items-center lg:items-start">
            <BsShieldFillCheck className="text-[40px] md:text-[50px] lg:text-[60px] bg-white" />
            <h1 className="text-sm md:text-base lg:text-base font-normal font-roboto text-center lg:text-left lg:pr-20">
              <span className="font-bold">Extended warranty</span> along with{" "}
              <span className="font-bold">
                30 days Money Back <br /> Guarantee
              </span>
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
