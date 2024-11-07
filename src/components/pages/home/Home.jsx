import FeaturesCollection from "./FeaturesCollection";
import NewArrival from "./NewArrival";
import ShopByAge from "./ShopByAge";
import Support from "./Support";
import Testimonials from "./Testimonials";
import WheelsCollection from "./WheelsCollection";

const Home = () => {
  return (
    <div className="min-h-screen space-y-10 md:space-y-20">
      <ShopByAge />
      <Support />
      <NewArrival />
      <FeaturesCollection />
      <WheelsCollection />
      {/* <Testimonials /> */}
    </div>
  );
};

export default Home;
