import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo/image-removebg-preview_6.webp";
import { IoCartOutline, IoSearchOutline, IoMenu } from "react-icons/io5";
import { useContext, useEffect, useRef, useState } from "react";
import useCategory from "../hooks/useCategory";
import useBrands from "../hooks/useBrands";
import { useCallback } from "react";
import { AuthContext } from "../../provider/AuthProvider";

function debounce(func, delay) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
}

const Navbar = ({ handleShowDrawer }) => {
  const navigate = useNavigate();
  const searchRef = useRef(null);
  const [categories] = useCategory();
  const [brands] = useBrands();
  const [showIcon, setShowIcon] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { logout, user } = useContext(AuthContext);
  const [isHoveredCategory, setIsHoveredCategory] = useState(false);
  const [isHoveredBrand, setIsHoveredBrand] = useState(false);
  const [mobileNavLinksClose, setMobileNavLinksClose] = useState(false);

  const closeDropdownCategory = () => {
    setIsHoveredCategory(false);
  };
  const closeDropdownBrand = () => {
    setIsHoveredBrand(false);
  };

  const handleLinkClick = () => {
    // Ensure the dropdowns are closed when any link is clicked
    setMobileNavLinksClose(false); // This will close the entire mobile nav
  };

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

  const navLinks = (
    <>
      <li
        className="font-poppins text-[8px] font-normal sm:text-xs md:text-sm lg:text-base"
        onMouseEnter={() => setIsHoveredCategory(true)}
        onMouseLeave={() => setIsHoveredCategory(false)}
      >
        <Link className="cursor-pointer pb-5 lg:pb-8 hover:underline">
          Categories
        </Link>
        {isHoveredCategory && (
          <ul className="absolute md:mt-4 lg:mt-[26px] overflow-y-auto bg-white rounded-box z-[1] w-auto p-2 lg:py-5 h-auto grid md:grid-cols-4 lg:grid-cols-5 gap-y-2 lg:gap-y-5 gap-x-2 shadow">
            {categories?.length ? (
              categories.map((category) => (
                <li
                  key={category.category_id}
                  onClick={closeDropdownCategory}
                  className="cursor-pointer w-[130px] rounded-md flex flex-col items-center hover:shadow"
                >
                  <Link
                    to={`/categoryDetail/${category?.category_id}`}
                    className="space-y-1 text-center"
                  >
                    <img
                      src={category.category_logo_url}
                      alt={`${category.name}`}
                      className="h-[50px] w-[50px] mx-auto rounded-full bg-base-200"
                    />
                    <h1 className="font-poppins md:text-xs lg:text-sm font-semibold">
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
        )}
      </li>
      <li
        className="font-poppins text-[8px] font-normal sm:text-xs md:text-sm lg:text-base"
        onMouseEnter={() => setIsHoveredBrand(true)}
        onMouseLeave={() => setIsHoveredBrand(false)}
      >
        <Link className="cursor-pointer pb-5 lg:pb-8 hover:underline">
          Brands
        </Link>
        {isHoveredBrand && (
          <ul className="absolute md:mt-4 lg:mt-[26px] overflow-y-auto bg-white rounded-box z-[1] w-auto p-2 lg:py-5 h-auto flex flex-wrap gap-y-2 lg:gap-y-5 gap-x-2 shadow">
            {brands?.length ? (
              brands.map((brand) => (
                <li
                  key={brand.brand_id}
                  className="cursor-pointer w-[130px] rounded-md flex flex-col items-center hover:shadow"
                >
                  <Link
                    onClick={closeDropdownBrand}
                    to={`/brandDetail/${brand?.brand_id}`}
                    className="p-2 space-y-1 text-center"
                  >
                    <img
                      src={brand?.brand_logo_url}
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
        )}
      </li>
      <li className="cursor-pointer hover:underline text-nowrap font-poppins text-[8px] font-normal sm:text-xs md:text-sm lg:text-base">
        <Link to="/categoryDetail/35">Combo Offers</Link>
      </li>
      <li className="cursor-pointer hover:underline text-nowrap font-poppins text-[8px] font-normal sm:text-xs md:text-sm lg:text-base">
        <Link to="/categoryDetail/36">Wholesale</Link>
      </li>
      <li className="cursor-pointer hover:underline text-nowrap font-poppins text-[8px] font-normal sm:text-xs md:text-sm lg:text-base">
        <Link to="/aboutUs">About Us</Link>
      </li>
    </>
  );

  const mobileNavLinks = (
    <>
      <li
        className="relative"
        onMouseEnter={() => setIsHoveredCategory(true)}
        onMouseLeave={() => setIsHoveredCategory(false)}
      >
        <span className="cursor-pointer font-poppins text-left uppercase dark:text-black text-xs sm:text-lg py-1 sm:py-2 btn-category hover:text-black">
          Categories
        </span>
        {isHoveredCategory && (
          <ul className="absolute left-full overflow-y-visible top-0 bg-base-100 dark:bg-white py-[5px] sm:py-3 grid grid-cols-3 cat-width sm:w-[444px] gap-1 sm:gap-y-5 flex-wrap h-auto shadow">
            {categories?.length ? (
              categories.map((category) => (
                <li
                  key={category.category_id}
                  className="cursor-pointer rounded-md flex flex-col items-center hover:shadow"
                >
                  <Link
                    to={`/categoryDetail/${category.category_id}`}
                    className="space-y-1 text-center"
                    onClick={closeDropdownCategory}
                  >
                    <img
                      src={category.category_logo_url}
                      alt={category.name}
                      className="cat-image sm:h-12 sm:w-12 mx-auto rounded-full"
                    />
                    <h1 className="font-poppins dark:text-black cat-text sm:text-sm">
                      {category.name}
                    </h1>
                  </Link>
                </li>
              ))
            ) : (
              <div className="flex justify-center items-center">
                <span className="loading loading-spinner w-6 h-6"></span>
              </div>
            )}
          </ul>
        )}
      </li>
      <li
        className="relative"
        onMouseEnter={() => setIsHoveredBrand(true)}
        onMouseLeave={() => setIsHoveredBrand(false)}
      >
        <span className="cursor-pointer font-poppins text-left uppercase dark:text-black text-xs sm:text-lg py-1 sm:py-2 btn-category hover:text-black">
          Brands
        </span>
        {isHoveredBrand && (
          <ul className="absolute left-full top-full bg-base-100 -mt-3 dark:bg-white py-[5px] sm:py-3 grid grid-cols-3 cat-width sm:w-[444px] gap-2 sm:gap-y-5 flex-wrap h-auto shadow">
            {brands?.length ? (
              brands.map((brand) => (
                <li
                  key={brand.brand_id}
                  className="cursor-pointer rounded-md flex flex-col items-center hover:shadow"
                >
                  <Link
                    to={`/brandDetail/${brand.brand_id}`}
                    className="p-1 sm:p-2 space-y-1 text-center"
                    onClick={closeDropdownBrand}
                  >
                    <img
                      src={brand.brand_logo_url}
                      alt={brand.name}
                      className="cat-image sm:h-12 sm:w-12 mx-auto rounded-full bg-base-200"
                    />
                    <h1 className="font-poppins dark:text-black cat-text sm:text-base">
                      {brand.name}
                    </h1>
                  </Link>
                </li>
              ))
            ) : (
              <div className="flex justify-center items-center">
                <span className="loading loading-spinner w-8 h-8"></span>
              </div>
            )}
          </ul>
        )}
      </li>
      <li className="font-poppins text-left text-nowrap uppercase dark:text-black text-xs sm:text-lg py-1 sm:py-2 btn-category hover:text-black">
        <Link onClick={handleLinkClick} to="/categoryDetail/35">
          Combo Offers
        </Link>
      </li>
      <li className="font-poppins text-left text-nowrap uppercase dark:text-black text-xs sm:text-lg py-1 sm:py-2 btn-category hover:text-black">
        <Link onClick={handleLinkClick} to="/categoryDetail/36">
          Wholesale
        </Link>
      </li>
      <li className="font-poppins text-left text-nowrap uppercase dark:text-black text-xs sm:text-lg py-1 sm:py-2 btn-category hover:text-black">
        <Link onClick={handleLinkClick} to="/aboutUs">
          About Us
        </Link>
      </li>
    </>
  );

  const handleLogout = async () => {
    await logout(); // Ensure logout completes
    navigate("/"); // Redirect to home page
  };

  return (
    <div className="top-0 sticky bg-[#FEF987] dark:text-black shadow z-40 max-sm:px-2">
      <div className="flex justify-between items-center md:w-11/12 mx-auto">
        <div className="flex md:gap-3">
          <div className="relative md:hidden">
            <div className="relative group py-5">
              <IoMenu
                onClick={() => setMobileNavLinksClose(true)}
                role="button"
                className="bg-transparent text-4xl border-transparent inline-flex items-center"
              />
              {mobileNavLinksClose && (
                <ul className="bg-base-100 dark:bg-white rounded-md z-10 mt-5 space-y-2 -left-2 max-sm:px-1 py-2 shadow absolute hidden group-hover:flex flex-col">
                  {mobileNavLinks}
                </ul>
              )}
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
            <ul className="flex justify-center items-center md:gap-3">
              {navLinks}
            </ul>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div className="block md:hidden">
            <Link to="/">
              <img src={logo} alt="Toy House Logo" className="h-[60px]" />
            </Link>
          </div>
          <div className="hidden justify-center items-center gap-[30px] lg:flex">
            <ul className="flex justify-center items-center gap-7">
              {navLinks}
            </ul>
            {/* <div className="relative">
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearchSubmit}
                ref={searchRef}
                type="text"
                className="border w-[400px] border-solid bg-transparent rounded-full border-black px-3 py-1"
                onFocus={() => setShowIcon(false)}
                onBlur={() => setShowIcon(true)}
              />
              <IoSearchOutline
                className={`text-[22px] absolute top-2 left-1 cursor-pointer transition-opacity duration-300 ${
                  showIcon ? "opacity-100" : "opacity-0"
                }`}
              />
            </div> */}
          </div>
        </div>
        <div className="flex justify-center items-center gap-2 sm:gap-3 sm:pr-3 md:pr-0">
          <IoSearchOutline
            className={` ${
              isSearchOpen ? "hidden" : "block"
            } font-semibold text-[14px] sm:text-base lg:text-xl mt-[2px] cursor-pointer rounded-full transition-all duration-300 ease-in-out hover:scale-110`}
            onClick={() => {
              handleSearchClick();
            }}
          />
          <button onClick={() => handleShowDrawer()} className="relative block">
            <IoCartOutline className="font-semibold text-[14px] sm:text-base lg:text-xl mt-[2px] rounded-full transition-all duration-300 ease-in-out hover:scale-110" />
          </button>
          <ul className="flex items-center space-x-1 sm:space-x-[10px]">
            {user ? (
              <>
                <li>
                  <Link
                    to={"/userProfile"}
                    className="font-poppins text-xs sm:text-sm lg:text-base cursor-pointer"
                  >
                    Profile
                  </Link>
                </li>
                <li onClick={() => handleLogout()}>
                  <span className="font-poppins text-xs sm:text-sm lg:text-base cursor-pointer">
                    Logout
                  </span>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/logIn" className="flex items-center gap-4">
                    <span className="font-poppins text-xs sm:text-sm lg:text-base">
                      Login
                    </span>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
      <div className="w-full">
        {isSearchOpen && (
          <div
            id="overlay"
            className="relative w-3/5 mx-auto pb-5"
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
              className="border-[1px] border-solid bg-transparent rounded-full bg-white border-black px-3 py-1 w-full"
            />
            {showIcon && (
              <IoSearchOutline className="text-[22px] absolute top-2 left-1 cursor-pointer" />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;

{
  /* <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="relative">
              <MdAccountCircle className="font-semibold text-[22px] md:text-2xl rounded-full transition-all duration-300 ease-in-out hover:scale-110 shadow-md" />
            </div>
            <ul
              tabIndex={0}
              className="font-roboto dropdown-content bg-[#FEF987] rounded-lg z-50 mt-7 w-72 py-4 px-2 shadow-lg"
            >
              {admin ? adminNavButton : userNavButton}
              
            </ul>
          </div>
          
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
    </>
  ); */
}
