import { Outlet } from "react-router-dom";
import Navbar from "./components/shared/Navbar";
import Footer from "./components/shared/Footer";

const App = () => {
  return (
    <div>
      <Navbar />
      <div className="min-h-screen mt-5">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default App;
