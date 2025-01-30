import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo/ToyHouse_Logo_trans.png";
import { MdAccountCircle } from "react-icons/md";
import {
  FaBox,
  FaBoxOpen,
  FaHeart,
  FaHome,
  FaTags,
  FaUsers,
} from "react-icons/fa";
import { CiLogin } from "react-icons/ci";
import { RiShieldStarFill, RiShoppingCartFill } from "react-icons/ri";
import { IoMdHeartEmpty } from "react-icons/io";
import { BsBox2HeartFill } from "react-icons/bs";
import { BiLogOut, BiSolidUserAccount } from "react-icons/bi";
import { IoCartOutline, IoSearchOutline, IoMenu } from "react-icons/io5";
import { useEffect, useRef, useState } from "react";
import useCategory from "../hooks/useCategory";
import useBrands from "../hooks/useBrands";
import { useCallback } from "react";
import { GiCancel } from "react-icons/gi";
import { LuLogIn } from "react-icons/lu";

function debounce(func, delay) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
}

const Navbar = () => {
  const navigate = useNavigate();
  const searchRef = useRef(null);
  const [categories] = useCategory();
  const [brands] = useBrands();
  const [showIcon, setShowIcon] = useState(true);
  const [cartLength, setCartLength] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const admin = true;
  const user = false;

  const handleSearchSubmit = useCallback(
    debounce((e) => {
      if (e.type === "keydown" && e.key !== "Enter") return;
      if (searchQuery.trim()) {
        navigate(`/searchResult/${searchQuery.toLowerCase()}`);
        setSearchQuery("");
        setIsSearchOpen(false);
      }
    }, 300),
    [searchQuery]
  );

  const handleSearchClick = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  // Close search drawer when clicking outside
  const handleOutsideClick = useCallback((e) => {
    if (searchRef.current && !searchRef.current.contains(e.target)) {
      setIsSearchOpen(false);
      setSearchQuery("");
      setShowIcon(true);
    }
  }, []);

  useEffect(() => {
    if (isSearchOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isSearchOpen, handleOutsideClick]);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartLength(cart.length);
  }, []);

  const navLinks = (
    <>
      <li className="dropdown dropdown-hover dropdown-bottom font-poppins text-[8px] sm:text-sm md:text-sm lg:text-lg">
        <Link
          tabIndex={0}
          role="button flex"
          className="cursor-pointer py-10 hover:underline"
        >
          Category
        </Link>
        <ul
          tabIndex={0}
          className="dropdown-content md:mt-4 lg:mt-[26px] bg-white rounded-box z-[1] w-[450px] lg:w-[650px] md:-ml-[200px]
           lg:-ml-[280px] py-3 lg:py-5 h-auto grid md:grid-cols-3 lg:grid-cols-4 gap-y-5 lg:gap-y-8 shadow"
        >
          {categories?.length ? (
            categories.map((category) => (
              <li
                key={category.category_id}
                className="cursor-pointer rounded-md flex flex-col items-center hover:shadow"
              >
                <Link
                  to={`/categoryDetail/${category.category_id}`}
                  className="p-2 space-y-1 text-center"
                >
                  <img
                    src={category.category_logo_url}
                    alt={`${category.name}`}
                    className="h-20 w-20 mx-auto rounded-full bg-base-200"
                  />
                  <h1 className="font-poppins md:text-xs lg:text-base font-semibold">
                    {category.name}
                  </h1>
                </Link>
              </li>
            ))
          ) : (
            <div className="flex justify-center items-center">
              <div
                className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"
                role="status"
              >
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}
        </ul>
      </li>
      <li className="dropdown dropdown-hover font-poppins text-[8px] sm:text-sm md:text-sm lg:text-lg">
        <Link
          tabIndex={0}
          role="button flex"
          className="cursor-pointer py-10 hover:underline"
        >
          Brands
        </Link>
        <ul
          tabIndex={0}
          className="dropdown-content md:mt-4 lg:mt-[26px] bg-white rounded-box z-[1] w-[450px] lg:w-[650px] md:-ml-[200px]
           lg:-ml-[280px] py-3 lg:py-5 h-auto grid md:grid-cols-4 lg:grid-cols-5 gap-y-5 lg:gap-y-8 shadow"
        >
          {brands?.length ? (
            brands.map((brand) => (
              <li
                key={brand.brand_id}
                className="cursor-pointer rounded-md flex flex-col items-center hover:shadow"
              >
                <Link
                  to={`/brandDetail/${brand.brand_id}`}
                  className="p-2 space-y-1 text-center"
                >
                  <img
                    src={
                      "https://drive.google.com/uc?export=view&id=1peHxmM8Nx9O6dFfhzPV_8EF2pOjxjSM1"
                    }
                    alt={`${brand.name}`}
                    className="h-20 w-20 mx-auto rounded-full bg-base-200"
                  />
                  <h1 className="font-poppins md:text-xs lg:text-base font-medium">
                    {brand.name}
                  </h1>
                </Link>
              </li>
            ))
          ) : (
            <div className="flex justify-center items-center">
              <div
                className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"
                role="status"
              >
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}
        </ul>
      </li>
      <li className="font-poppins text-[8px] sm:text-sm md:text-sm lg:text-base hover:underline">
        <Link to="/aboutUs" className="flex">
          About Us
        </Link>
      </li>
    </>
  );

  const mobileNavLinks = (
    <>
      <li className="relative dropdown dropdown-right dropdown-hover">
        <div
          tabIndex={0}
          role="button"
          href="#"
          className="font-poppins uppercase text-sm sm:text-lg py-2 btn-category text-center hover:text-black"
        >
          Category
        </div>
        <ul className="dropdown-content bg-base-100 z-[1] left-0 cat-submenu py-3 grid grid-cols-3 sm:w-[444px] gap-x-2 gap-y-5 flex-wrap h-auto shadow">
          {categories?.length ? (
            categories.map((category) => (
              <li
                key={category.category_id}
                className="cursor-pointer rounded-md flex flex-col items-center hover:shadow"
              >
                <Link
                  to={`/categoryDetail/${category.category_id}`}
                  className="p-2 space-y-1 text-center"
                >
                  <img
                    src={category.category_logo_url}
                    alt={`${category.name}`}
                    className="cat-image sm:h-12 sm:w-12 mx-auto rounded-full bg-base-200"
                  />
                  <h1 className="font-poppins cat-text sm:text-base">
                    {category.name}
                  </h1>
                </Link>
              </li>
            ))
          ) : (
            <div className="flex justify-center items-center">
              <div
                className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"
                role="status"
              >
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}
        </ul>
      </li>
      <li className="relative dropdown dropdown-right dropdown-hover">
        <div
          tabIndex={0}
          role="button"
          href="#"
          className="font-poppins text-left uppercase text-sm sm:text-lg py-2 btn-category hover:text-black"
        >
          Brands
        </div>
        <ul className="dropdown-content bg-base-100 z-[1] left-0 cat-submenu py-3 grid grid-cols-3 sm:w-[444px] gap-x-2 gap-y-5 flex-wrap h-auto shadow">
          {brands?.length ? (
            brands.map((brand) => (
              <li
                key={brand.brand_id}
                className="cursor-pointer rounded-md flex flex-col items-center hover:shadow"
              >
                <Link
                  to={`/brandDetail/${brand.brand_id}`}
                  className="p-2 space-y-1 text-center"
                >
                  <img
                    src={brand.brand_logo_url}
                    alt={brand.name}
                    className="cat-image sm:h-12 sm:w-12 mx-auto rounded-full bg-base-200"
                  />
                  <h1 className="font-poppins cat-text sm:text-base">
                    {brand.name}
                  </h1>
                </Link>
              </li>
            ))
          ) : (
            <div className="flex justify-center items-center">
              <div
                className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"
                role="status"
              >
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}
        </ul>
      </li>
      <li>
        <Link
          to="/dashboard/userWishlist"
          className="font-poppins uppercase text-sm sm:text-lg my-5 btn-category text-center w-full hover:text-black"
        >
          Wishlist
        </Link>
      </li>
      <li>
        <Link
          to="/cart"
          className="font-poppins uppercase text-sm sm:text-lg my-5 btn-category text-center w-full hover:text-black"
        >
          Cart
        </Link>
      </li>
      <li>
        <Link
          to="/aboutUs"
          className="font-poppins uppercase text-sm sm:text-lg my-5 btn-category text-center w-full hover:text-black"
        >
          About Us
        </Link>
      </li>
    </>
  );

  const userNavButton = (
    <>
      <li className="flex items-center gap-4 px-4 py-3 rounded-lg">
        <Link
          to="/dashboard/profile"
          className="flex items-center gap-4 text-gray-800"
        >
          <BiSolidUserAccount className="text-3xl" />
          <span className="text-base font-medium hover:underline">
            My Account
          </span>
        </Link>
      </li>
      <li className="flex items-center gap-4 px-4 py-3 rounded-lg">
        <Link
          to="/dashboard/orders"
          className="flex items-center gap-4 text-gray-800"
        >
          <FaBoxOpen className="text-3xl" />
          <span className="text-base font-medium hover:underline">
            My Orders
          </span>
        </Link>
      </li>
      <li className="flex items-center gap-4 px-4 py-3 rounded-lg">
        <Link
          to="/dashboard/userReviews"
          className="flex items-center gap-4 text-gray-800"
        >
          <RiShieldStarFill className="text-3xl" />
          <span className="text-base font-medium hover:underline">
            My Reviews
          </span>
        </Link>
      </li>
      <li className="flex items-center gap-4 px-4 py-3 rounded-lg">
        <Link
          to="/dashboard/userWishlist"
          className="flex items-center gap-4 text-gray-800"
        >
          <BsBox2HeartFill className="text-3xl" />
          <span className="text-base font-medium hover:underline">
            My Wishlist
          </span>
        </Link>
      </li>
      <li className="flex items-center gap-4 px-4 py-3 rounded-lg">
        <Link
          to="/dashboard/userReturned"
          className="flex items-center gap-4 text-gray-800"
        >
          <GiCancel className="text-3xl" />
          <span className="text-base font-medium hover:underline">
            My Returns & Cancellations
          </span>
        </Link>
      </li>
    </>
  );

  const adminNavButton = (
    <>
      <li className="flex items-center gap-4 px-4 py-3 rounded-lg">
        <FaHome className="text-2xl text-red-500" />
        <Link
          to="/dashboard/adminDashboard"
          className="text-base font-medium hover:underline"
        >
          Admin Dashboard
        </Link>
      </li>
      <li className="flex items-center gap-4 px-4 py-3 rounded-lg">
        <FaUsers className="text-2xl text-blue-500" />
        <Link
          to="/dashboard/manageUsers"
          className="text-base font-medium hover:underline"
        >
          Users
        </Link>
      </li>
      <li className="flex items-center gap-4 px-4 py-3 rounded-lg">
        <FaBox className="text-2xl text-yellow-500" />
        <Link
          to="/dashboard/manageProducts"
          className="text-base font-medium hover:underline"
        >
          Products
        </Link>
      </li>
      <li className="flex items-center gap-4 px-4 py-3 rounded-lg">
        <FaBoxOpen className="text-2xl text-pink-500" />
        <Link
          to="/dashboard/manageOrders"
          className="text-base font-medium hover:underline"
        >
          Orders
        </Link>
      </li>
      <li className="flex items-center gap-4 px-4 py-3 rounded-lg">
        <FaTags className="text-2xl text-green-500" />
        <Link
          to="/dashboard/manageOffers"
          className="text-base font-medium hover:underline"
        >
          Offers
        </Link>
      </li>
      <li className="flex items-center gap-4 px-4 py-3 rounded-lg">
        <FaHeart className="text-2xl text-red-500" />
        <Link
          to="/dashboard/manageWishlist"
          className="text-base font-medium hover:underline"
        >
          Wishlist
        </Link>
      </li>
      <li className="flex items-center gap-4 px-4 py-3 rounded-lg">
        <RiShoppingCartFill className="text-2xl text-[#fd7e14]" />
        <Link
          to="/dashboard/manageCart"
          className="text-base font-medium hover:underline"
        >
          Cart
        </Link>
      </li>
    </>
  );

  return (
    <div className="top-0 sticky bg-[#FEF987] shadow z-50">
      <div className="flex justify-between items-center md:w-11/12 mx-auto">
        <div className="flex md:gap-3">
          <div className="relative md:hidden">
            <div className="relative group py-5 pl-1 pr-6">
              <IoMenu
                role="button"
                className="bg-[#f7f052] text-4xl border-transparent inline-flex items-center ml-2 sm:ml-6"
              />
              <ul className="bg-base-100 rounded-md z-10 mt-5 left-0 py-2 space-y-3 w-fit shadow absolute hidden group-hover:flex flex-col">
                {mobileNavLinks}
              </ul>
            </div>
          </div>
          <div className="hidden md:block">
            <Link to="/">
              <img
                src={logo}
                alt="Toy House Logo"
                className="md:h-[60px] lg:h-[80px] w-auto"
              />
            </Link>
          </div>
          <div className="hidden md:flex lg:hidden">
            <ul className="flex justify-center items-center mt-2 md:gap-4 px-1">
              {navLinks}
            </ul>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div className="block md:hidden">
            <Link to="/">
              <img src={logo} alt="Toy House Logo" className="h-[80px]" />
            </Link>
          </div>
          <div className="hidden lg:flex justify-center items-center gap-32">
            <ul className="flex justify-center items-center gap-10">
              {navLinks}
            </ul>
            <div className="relative">
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearchSubmit}
                ref={searchRef}
                type="text"
                className="border max-w-[400px] border-solid bg-transparent rounded-full border-black px-3 py-1 w-[215px]"
                onFocus={() => setShowIcon(false)}
                onBlur={() => setShowIcon(true)}
              />
              <IoSearchOutline
                className={`text-[22px] absolute top-2 left-1 cursor-pointer transition-opacity duration-300 ${
                  showIcon ? "opacity-100" : "opacity-0"
                }`}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center max-sm:pr-4 max-md:pr-7 gap-2 sm:gap-3">
          <IoSearchOutline
            className={` ${
              isSearchOpen ? "hidden" : "block"
            } font-semibold text-[22px] md:text-2xl rounded-full transition-all duration-300 ease-in-out hover:scale-110 lg:hidden`}
            onClick={() => {
              handleSearchClick();
            }}
          />
          <Link className="relative hidden md:block">
            <IoMdHeartEmpty className="font-semibold text-[22px] md:text-2xl rounded-full transition-all duration-300 ease-in-out hover:scale-110" />
          </Link>
          <Link to="/cart" className="relative">
            <IoCartOutline className="font-semibold text-[22px] md:text-2xl rounded-full transition-all duration-300 ease-in-out hover:scale-110" />
            {cartLength > 0 && (
              <span className="absolute bottom-[2px] right-0  flex items-center justify-center w-3 h-3 text-[10px] font-bold bg-white rounded-full transform translate-x-1/2 translate-y-1/2">
                {cartLength}
              </span>
            )}
          </Link>
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="relative">
              <MdAccountCircle className="font-semibold text-[22px] md:text-2xl rounded-full transition-all duration-300 ease-in-out hover:scale-110 shadow-md" />
            </div>
            <ul
              tabIndex={0}
              className="font-roboto dropdown-content bg-[#FEF987] rounded-lg z-50 mt-7 w-72 py-4 px-2 shadow-lg"
            >
              {admin ? adminNavButton : userNavButton}
              {user ? (
                <>
                  <li className="flex items-center gap-4 px-4 py-3 rounded-lg">
                    <Link to="/logout" className="flex items-center gap-4">
                      <BiLogOut className="text-2xl" />
                      <span className="text-base font-medium hover:underline">
                        Logout
                      </span>
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="flex items-center gap-4 px-4 py-3 rounded-lg">
                    <Link to="/logIn" className="flex items-center gap-4">
                      <CiLogin className="text-2xl font-bold" />
                      <span className="text-base font-medium hover:underline">
                        Log in
                      </span>
                    </Link>
                  </li>
                  <li className="flex items-center gap-4 px-4 py-3 rounded-lg">
                    <Link to="/register" className="flex items-center gap-4">
                      <LuLogIn className="text-2xl" />
                      <span className="text-base font-medium hover:underline">
                        Register
                      </span>
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
      <div className="w-full">
        {isSearchOpen && (
          <div
            id="overlay"
            className="relative w-3/5 mx-auto py-5"
            onClick={(e) => handleOutsideClick(e)}
          >
            <input
              onFocus={() => setShowIcon(false)}
              onBlur={() => setShowIcon(true)}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => handleSearchSubmit(e)}
              ref={searchRef}
              type="text"
              className="border-[1px] border-solid bg-transparent rounded-full border-black px-3 py-1 w-full"
            />
            {showIcon && (
              <IoSearchOutline className="text-[22px] absolute top-7 left-1 cursor-pointer" />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
