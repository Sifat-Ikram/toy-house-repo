import { useEffect } from "react";
import AllBrands from "./AllBrands";
import Banner from "./Banner";
import FeaturesCollection from "./FeaturesCollection";
import NewArrival from "./NewArrival";
import ShopByAge from "./ShopByAge";
import Support from "./Support";
import Testimonials from "./Testimonials";
import TopCategories from "./TopCategories";

const Home = () => {
   useEffect(() => {
      window.scrollTo(0, 0); // Scroll to the top of the page
    }, []);
  return (
    <div>
      <Banner />
      <div className="relative z-20 text-[#3E3E3E] pb-20 space-y-12 md:space-y-16 lg:space-y-20">
        <FeaturesCollection />
        <ShopByAge />
        <Support />
        <AllBrands />
        <NewArrival />
        <TopCategories />
      </div>
      <Testimonials />
    </div>
  );
};

export default Home;
