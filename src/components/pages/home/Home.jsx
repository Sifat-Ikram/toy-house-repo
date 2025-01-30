import AllBrands from "./AllBrands";
import Banner from "./Banner";
import FeaturesCollection from "./FeaturesCollection";
import NewArrival from "./NewArrival";
import ShopByAge from "./ShopByAge";
import Support from "./Support";
import Testimonials from "./Testimonials";
import TopCategories from "./TopCategories";

const Home = () => {
  return (
    <div>
      <Banner />
      <div className="relative z-20 bg-gradient-to-b from-white to-[#5D99FF] text-[#3E3E3E] pb-20">
        <ShopByAge />
        <Support />
        <AllBrands />
        <NewArrival />
        <TopCategories />
        <FeaturesCollection />
      </div>
      <Testimonials />
    </div>
  );
};

export default Home;
