import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/logo/ToyHouse_Logo_trans.png";
import {
  FaUserAstronaut,
  FaHome,
  FaBox,
  FaUsers,
  FaTools,
} from "react-icons/fa";
import { IoIosColorPalette, IoMdCube } from "react-icons/io";
import { AiFillStar } from "react-icons/ai";
import { IoMdHeart } from "react-icons/io";
import { FiRotateCw } from "react-icons/fi";
import { IoMenu } from "react-icons/io5";
import { BiLogOut, BiSolidCategoryAlt } from "react-icons/bi";
import { FaBoxOpen } from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";
import { TbBrandCtemplar } from "react-icons/tb";

const DashboardNavbar = () => {
  const admin = true;
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const productsRef = useRef(null);

  const toggleProducts = () => {
    setIsProductsOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (productsRef.current && !productsRef.current.contains(event.target)) {
        setIsProductsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [productsRef]);

  const mobileUserNavLinks = (
    <>
      <li className="py-2 justify-start px-8">
        <NavLink
          to="/dashboard/profile"
          style={({ isActive }) => ({
            color: isActive ? "#f52e2e" : "#333",
            fontWeight: isActive ? "600" : "500",
          })}
          className="text-lg font-medium"
        >
          My Account
        </NavLink>
      </li>
      <li className="py-2 justify-start px-8">
        <NavLink
          to="/dashboard/orders"
          style={({ isActive }) => ({
            color: isActive ? "#f52e2e" : "#333",
            fontWeight: isActive ? "600" : "500",
          })}
          className="text-lg font-medium"
        >
          My Orders
        </NavLink>
      </li>
      <li className="py-2 justify-start px-8">
        <NavLink
          to="/dashboard/userReviews"
          style={({ isActive }) => ({
            color: isActive ? "#f52e2e" : "#333",
            fontWeight: isActive ? "600" : "500",
          })}
          className="text-lg font-medium"
        >
          My Reviews
        </NavLink>
      </li>
      <li className="py-2 justify-start px-8">
        <NavLink
          to="/dashboard/userWishlist"
          style={({ isActive }) => ({
            color: isActive ? "#f52e2e" : "#333",
            fontWeight: isActive ? "600" : "500",
          })}
          className="text-lg font-medium"
        >
          My Wishlist
        </NavLink>
      </li>
      <li className="py-2 justify-start px-8">
        <NavLink
          to="/dashboard/userReturned"
          style={({ isActive }) => ({
            color: isActive ? "#f52e2e" : "#333",
            fontWeight: isActive ? "600" : "500",
          })}
          className="text-lg font-medium"
        >
          Returns & Cancellations
        </NavLink>
      </li>
    </>
  );

  const mobileAdminNavLinks = (
    <>
      <li className="py-[6px] justify-start px-8">
        <NavLink
          to="/dashboard/adminDashboard"
          style={({ isActive }) => ({
            color: isActive ? "#f52e2e" : "#333",
            fontWeight: isActive ? "600" : "500",
          })}
          className="text-lg font-medium"
        >
          Admin Dashboard
        </NavLink>
      </li>
      <li className="py-[6px] justify-start px-8">
        <NavLink
          to="/dashboard/manageUsers"
          style={({ isActive }) => ({
            color: isActive ? "#f52e2e" : "#333",
            fontWeight: isActive ? "600" : "500",
          })}
          className="text-lg font-medium"
        >
          Users
        </NavLink>
      </li>
      <li className="py-[6px] justify-start px-8" ref={productsRef}>
        <div
          onClick={() => toggleProducts()}
          className="flex items-center gap-4 rounded-lg cursor-pointer"
        >
          <span className="text-base font-medium">Products</span>
        </div>
        {isProductsOpen && (
          <ul className="space-y-1 mt-2 ml-8">
            <li
              onClick={(e) => e.stopPropagation()} // Prevent parent div click event
            >
              <NavLink
                to="/dashboard/manageProducts"
                className="text-base font-medium"
                style={({ isActive }) => ({
                  color: isActive ? "#f52e2e" : "#333",
                  fontWeight: isActive ? "600" : "500",
                })}
              >
                Product List
              </NavLink>
            </li>
            <li
              onClick={(e) => e.stopPropagation()} // Prevent parent div click event
            >
              <NavLink
                to="/dashboard/addProduct"
                className="text-base font-medium"
                style={({ isActive }) => ({
                  color: isActive ? "#f52e2e" : "#333",
                  fontWeight: isActive ? "600" : "500",
                })}
              >
                Add Products
              </NavLink>
            </li>
          </ul>
        )}
      </li>
      <li className="py-[6px] justify-start px-8">
        <NavLink
          to="/dashboard/manageOrders"
          style={({ isActive }) => ({
            color: isActive ? "#f52e2e" : "#333",
            fontWeight: isActive ? "600" : "500",
          })}
          className="text-lg font-medium"
        >
          Orders
        </NavLink>
      </li>
      <li className="py-[6px] justify-start px-8">
        <NavLink
          to="/dashboard/manageOffers"
          style={({ isActive }) => ({
            color: isActive ? "#f52e2e" : "#333",
            fontWeight: isActive ? "600" : "500",
          })}
          className="text-lg font-medium"
        >
          Offers
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="w-full flex flex-col shadow-lg sm:min-h-screen sm:bg-base-200 sticky top-0">
      {/* Logo Section */}
      <div className="flex justify-evenly sm:border-b-2 border-gray-300 bg-base-200">
        <div className="relative sm:hidden">
          <div className="relative group py-5 pl-1">
            <IoMenu
              role="button"
              className="text-4xl border-transparent inline-flex items-center"
            />
            <ul className="absolute rounded-md bg-base-200 mt-5 left-0 py-5 space-y-1 w-60 shadow hidden group-hover:flex flex-col">
              {admin ? mobileAdminNavLinks : mobileUserNavLinks}
            </ul>
          </div>
        </div>
        <Link to="/">
          <img src={logo} alt="Toy House Logo" className="h-[80px] w-auto" />
        </Link>
      </div>

      {/* Navigation Items */}
      <div className="max-sm:hidden flex flex-col justify-between px-6 gap-12">
        <div className="flex flex-col">
          <h1 className="text-xl font-semibold text-gray-800 my-5 uppercase">
            Menu
          </h1>
          <div className="flex flex-col justify-between h-full items-center">
            <div className="h-11/12">
              {admin ? (
                <ul className="flex flex-col space-y-5 z-50">
                  <li className="flex items-center gap-4">
                    <FaHome className="text-2xl" />
                    <NavLink
                      to="/dashboard/adminDashboard"
                      style={({ isActive }) => ({
                        color: isActive ? "#f52e2e" : "#333",
                        fontWeight: isActive ? "600" : "500",
                      })}
                      className="text-lg font-medium"
                    >
                      Admin Dashboard
                    </NavLink>
                  </li>
                  <li className="flex items-center gap-4">
                    <FaUsers className="text-2xl" />
                    <NavLink
                      to="/dashboard/manageUsers"
                      style={({ isActive }) => ({
                        color: isActive ? "#f52e2e" : "#333",
                        fontWeight: isActive ? "600" : "500",
                      })}
                      className="text-lg font-medium"
                    >
                      Users
                    </NavLink>
                  </li>
                  <li className="flex items-center gap-4">
                    <FaBoxOpen className="text-2xl" />
                    <NavLink
                      to="/dashboard/manageOrders"
                      style={({ isActive }) => ({
                        color: isActive ? "#f52e2e" : "#333",
                        fontWeight: isActive ? "600" : "500",
                      })}
                      className="text-lg font-medium"
                    >
                      Orders
                    </NavLink>
                  </li>
                  <li className="flex flex-col" ref={productsRef}>
                    <div
                      onClick={toggleProducts}
                      className="flex items-center gap-4 rounded-lg cursor-pointer"
                      aria-expanded={isProductsOpen}
                      aria-controls="productMenu"
                      role="button"
                    >
                      <FaBox className="text-xl" />
                      <span className="text-base font-medium">Products</span>
                    </div>
                    {isProductsOpen && (
                      <ul className="space-y-1 mt-2 ml-8">
                        <li className="flex items-center gap-4 rounded-lg">
                          <FaBoxOpen className="text-xl text-pink-500" />
                          <NavLink
                            to="/dashboard/manageProducts"
                            style={({ isActive }) => ({
                              color: isActive ? "#f52e2e" : "#333",
                              fontWeight: isActive ? "600" : "500",
                            })}
                            className="text-base font-medium hover:underline"
                          >
                            Product List
                          </NavLink>
                        </li>
                        <li className="flex items-center gap-4 rounded-lg">
                          <FaBoxOpen className="text-xl text-pink-500" />
                          <NavLink
                            to="/dashboard/addProduct"
                            style={({ isActive }) => ({
                              color: isActive ? "#f52e2e" : "#333",
                              fontWeight: isActive ? "600" : "500",
                            })}
                            className="text-base font-medium hover:underline"
                          >
                            Add Products
                          </NavLink>
                        </li>
                      </ul>
                    )}
                  </li>
                  <li className="flex items-center gap-4">
                    <BiSolidCategoryAlt className="text-2xl" />
                    <NavLink
                      to="/dashboard/addCategory"
                      style={({ isActive }) => ({
                        color: isActive ? "#f52e2e" : "",
                        fontWeight: isActive ? "600" : "500",
                      })}
                      className="text-lg font-medium"
                    >
                      Add Category
                    </NavLink>
                  </li>
                  <li className="flex items-center gap-4">
                    <TbBrandCtemplar className="text-2xl" />
                    <NavLink
                      to="/dashboard/addBrand"
                      style={({ isActive }) => ({
                        color: isActive ? "#f52e2e" : "#333",
                        fontWeight: isActive ? "600" : "500",
                      })}
                      className="text-lg font-medium"
                    >
                      Add Brand
                    </NavLink>
                  </li>
                  <li className="flex items-center gap-4">
                    <IoIosColorPalette className="text-2xl" />
                    <NavLink
                      to="/dashboard/addColor"
                      style={({ isActive }) => ({
                        color: isActive ? "#f52e2e" : "#333",
                        fontWeight: isActive ? "600" : "500",
                      })}
                      className="text-lg font-medium"
                    >
                      Add Color
                    </NavLink>
                  </li>
                  <li className="flex items-center gap-4">
                    <FaTools className="text-2xl" />
                    <NavLink
                      to="/dashboard/addMaterial"
                      style={({ isActive }) => ({
                        color: isActive ? "#f52e2e" : "#333",
                        fontWeight: isActive ? "600" : "500",
                      })}
                      className="text-lg font-medium"
                    >
                      Add Materials
                    </NavLink>
                  </li>
                </ul>
              ) : (
                <ul className="flex flex-col space-y-4 z-50">
                  <li className="flex items-center gap-4">
                    <FaUserAstronaut className="text-2xl text-red-500" />
                    <NavLink
                      to="/dashboard/profile"
                      style={({ isActive }) => ({
                        color: isActive ? "#f52e2e" : "#333",
                        fontWeight: isActive ? "600" : "500",
                      })}
                      className="text-lg font-medium"
                    >
                      My Account
                    </NavLink>
                  </li>
                  <li className="flex items-center gap-4">
                    <IoMdCube className="text-2xl text-blue-500" />
                    <NavLink
                      to="/dashboard/orders"
                      style={({ isActive }) => ({
                        color: isActive ? "#f52e2e" : "#333",
                        fontWeight: isActive ? "600" : "500",
                      })}
                      className="text-lg font-medium"
                    >
                      My Orders
                    </NavLink>
                  </li>
                  <li className="flex items-center gap-4">
                    <AiFillStar className="text-2xl text-yellow-500" />
                    <NavLink
                      to="/dashboard/userReviews"
                      style={({ isActive }) => ({
                        color: isActive ? "#f52e2e" : "#333",
                        fontWeight: isActive ? "600" : "500",
                      })}
                      className="text-lg font-medium"
                    >
                      My Reviews
                    </NavLink>
                  </li>
                  <li className="flex items-center gap-4">
                    <IoMdHeart className="text-2xl text-pink-500" />
                    <NavLink
                      to="/dashboard/userWishlist"
                      style={({ isActive }) => ({
                        color: isActive ? "#f52e2e" : "#333",
                        fontWeight: isActive ? "600" : "500",
                      })}
                      className="text-lg font-medium"
                    >
                      My Wishlist
                    </NavLink>
                  </li>
                  <li className="flex items-center gap-4">
                    <FiRotateCw className="text-2xl text-green-500" />
                    <NavLink
                      to="/dashboard/userReturned"
                      style={({ isActive }) => ({
                        color: isActive ? "#f52e2e" : "#333",
                        fontWeight: isActive ? "600" : "500",
                      })}
                      className="text-lg font-medium"
                    >
                      Returns & Cancellations
                    </NavLink>
                  </li>
                </ul>
              )}
            </div>
            <div className="flex-1 flex items-center bottom-0 gap-4 text-gray-800 w-full pb-4">
              <BiLogOut className="text-2xl" />
              <span className="text-lg font-medium text-gray-800 hover:text-[#f52e2e] cursor-pointer">
                Logout
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardNavbar;
