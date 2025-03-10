import { useEffect } from "react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const AboutUs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="py-12 px-6 md:w-4/5 w-11/12 mx-auto dark:bg-white dark:text-black">
      <h1 className="text-xl md:text-2xl lg:text-3xl font-poppins font-bold text-left mb-3 sm:mb-4 md:mb-6">About Us</h1>
      <p className="text-sm sm:text-base md:text-lg font-roboto leading-relaxed text-left">
        <strong className="font-poppins">Toy House</strong> is a service-oriented e-commerce business
        dedicated to bringing you the best quality baby toys and products with
        world-class customer support. Our mission is to make shopping for
        children's toys easy, convenient, and enjoyable from the comfort of your
        home.
      </p>

      <p className="text-sm sm:text-base md:text-lg font-roboto leading-relaxed mt-4 text-left">
        At Toy House, we utilize the power of the internet to provide a seamless
        shopping experience, ensuring that busy parents and guardians can find
        the perfect toys for their little ones without any hassle. We currently
        deliver across Bangladesh, and customers outside Bangladesh can also
        place orders with a valid Bangladeshi shipping address.
      </p>

      <p className="text-sm sm:text-base md:text-lg font-roboto leading-relaxed mt-4 text-left">
        Enjoy a smooth and secure shopping experience with Toy House, where
        quality and customer satisfaction come first.
      </p>

      <div className="mt-8 border-t pt-6">
        <h2 className="text-2xl font-semibold text-left mb-4 font-poppins">Contact Us</h2>
        <div className="flex flex-col items-start gap-4 font-roboto">
          <p className="flex items-center gap-2 text-sm sm:text-base md:text-lg">
            <FaPhone /> <span>01626809609</span>
          </p>
          <p className="flex items-center gap-2 text-sm sm:text-base md:text-lg">
            <FaEnvelope /> <span>kuswarkhan2018@gmail.com</span>
          </p>
          <p className="flex items-center gap-2 text-sm sm:text-base md:text-lg">
            <FaMapMarkerAlt /> <span>Toy House, Level-1, A1, 37C</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
