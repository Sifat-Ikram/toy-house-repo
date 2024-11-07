import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo/Toy House Final.svg";
import { BsPerson } from "react-icons/bs";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoCartOutline, IoSearchOutline } from "react-icons/io5";
import { useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const [showIcon, setShowIcon] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleIconClick = () => {
    setShowIcon(false);
  };

  // Handle search input change
  const handleInputChange = (e) => {
    e.preventDefault();
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      navigate(`/searchResult/${searchQuery.toLowerCase()}`);
      setSearchQuery("");
    }
  };

  const handleSearchClick = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const navLinks = (
    <>
      <li className="font-coiny uppercase text-[8px] sm:text-sm md:text-[10px] lg:text-sm">
        <a>Category</a>
      </li>
      <li className="font-coiny uppercase text-[8px] sm:text-sm md:text-[10px] lg:text-sm dropdown dropdown-hover">
        <a tabIndex={0} role="button">
          Mother and Baby
        </a>
        <ul
          tabIndex={0}
          className="dropdown-content bg-white rounded-box z-[1] w-52 p-2 shadow"
        >
          <li className="p-1 hover:bg-base-200 cursor-pointer rounded-md">
            <a>Item 1</a>
          </li>
          <li className="p-1 hover:bg-base-200 cursor-pointer rounded-md">
            <a>Item 2</a>
          </li>
        </ul>
      </li>
      <li className="font-coiny uppercase text-[8px] sm:text-sm md:text-[10px] lg:text-sm">
        <a>toy finder</a>
      </li>
    </>
  );

  return (
    <div className="top-0 sticky bg-[#FEF987] shadow z-50">
      <div className="navbar justify-between items-center sm:w-11/12 md:w-5/6 mx-auto">
        <div className="navbar-start md:gap-3">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn bg-[#FEF987] hover:bg-[#FEF987] md:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <a>Item 1</a>
              </li>
              <li>
                <a>Parent</a>
                <ul className="p-2">
                  <li>
                    <a>Submenu 1</a>
                  </li>
                  <li>
                    <a>Submenu 2</a>
                  </li>
                </ul>
              </li>
              <li>
                <a>Item 3</a>
              </li>
            </ul>
          </div>
          <div className="hidden md:block">
            <Link to="/">
              <img
                src={logo}
                alt="Toy House Logo"
                className="md:h-[40px] lg:h-[69px] w-auto"
              />
            </Link>
          </div>
          <div className="hidden md:flex lg:hidden">
            <ul className="flex justify-center items-center mt-2 md:gap-2 px-1">
              {navLinks}
            </ul>
          </div>
        </div>
        <div className="navbar-center justify-center">
          <div className="block md:hidden">
            <Link to="/">
              <img
                src={logo}
                alt="Toy House Logo"
                className="h-[40px] w-[80px]"
              />
            </Link>
          </div>
          <div className="hidden lg:flex items-center gap-10">
            <ul className="flex justify-center items-center gap-10 px-1">
              {navLinks}
            </ul>
            <div className="relative">
              <input
                onClick={handleIconClick}
                value={searchQuery}
                onChange={handleInputChange}
                onKeyDown={handleSearchSubmit}
                type="text"
                className="border-[1px] border-solid bg-transparent rounded-full border-black px-3 py-1 w-[215px]"
              />
              {showIcon && (
                <IoSearchOutline className="text-[22px] absolute top-2 left-1 cursor-pointer" />
              )}
            </div>
          </div>
        </div>
        <div className="navbar-end gap-5">
          <IoSearchOutline
            onClick={() => handleSearchClick()}
            className="text-[22px] cursor-pointer lg:hidden"
          />
          <Link to="/cart" className="relative">
            <IoMdHeartEmpty className="font-semibold text-lg rounded-full transition-all duration-300 ease-in-out hover:scale-110" />
          </Link>
          <Link to="/cart" className="relative">
            <IoCartOutline className="font-semibold text-lg rounded-full transition-all duration-300 ease-in-out hover:scale-110" />
          </Link>
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="relative">
              <BsPerson className="font-semibold text-lg rounded-full transition-all duration-300 ease-in-out hover:scale-110 shadow-md" />
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm font-quicksand dropdown-content bg-white space-y-5 rounded-lg z-50 mt-3 w-48 p-4 shadow-lg"
            >
              <li className="hover:bg-white text-center rounded-sm">
                <Link to="/profile" className="text-lg">
                  Profile
                </Link>
              </li>
              <li className="hover:bg-white text-center rounded-sm">
                <Link to="/logout" className="text-lg">
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="w-full">
        {isSearchOpen && (
          <div className="relative w-3/5 mx-auto py-5">
            <input
              onClick={handleIconClick}
              value={searchQuery}
              onChange={handleInputChange}
              onKeyDown={handleSearchSubmit}
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
