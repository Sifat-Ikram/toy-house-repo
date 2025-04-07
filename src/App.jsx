import { Outlet } from "react-router-dom";
import Navbar from "./components/shared/Navbar";
import Footer from "./components/shared/Footer";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ShoppingCart from "./components/pages/cart/ShoppingCart";

const App = () => {
  const [showDrawer, setShowDrawer] = useState(false);

  const handleShowDrawer = () => {
    setShowDrawer((prev) => !prev);
  };

  useEffect(() => {
    if (showDrawer) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [showDrawer]);

  return (
    <div>
      <div className="dark:bg-white">
        <Navbar handleShowDrawer={handleShowDrawer} />
        <div className="min-h-screen">
          <Outlet />
        </div>
        <Footer />
      </div>
      {showDrawer && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end"
          onClick={handleShowDrawer}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="w-4/5 sm:w-[400px] md:w-[450px] lg:w-[470px] bg-base-200 shadow-lg h-full max-h-full relative"
            onClick={(e) => e.stopPropagation()}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <ShoppingCart handleShowDrawer={handleShowDrawer} />
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default App;
