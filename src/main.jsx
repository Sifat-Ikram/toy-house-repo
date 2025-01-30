import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./components/pages/errorPage/ErrorPage.jsx";
import Contact from "./components/pages/contact/Contact.jsx";
import Home from "./components/pages/home/Home.jsx";
import Register from "./components/pages/sign/Register.jsx";
import Login from "./components/pages/sign/Login.jsx";
import PasswordReset from "./components/pages/sign/PasswordReset.jsx";
import SearchResult from "./components/pages/search-result/SearchResult.jsx";
import ProductDetails from "./components/pages/product-details/ProductDetails.jsx";
import ShoppingCart from "./components/pages/cart/ShoppingCart.jsx";
import AllProducts from "./components/pages/all-products/AllProducts.jsx";
import Dashboard from "./components/pages/dashboard/Dashboard.jsx";
import UserProfile from "./components/pages/userRoute/UserProfile.jsx";
import OrderHistory from "./components/pages/userRoute/OrderHistory.jsx";
import MyReviews from "./components/pages/userRoute/MyReviews.jsx";
import MyWishlist from "./components/pages/userRoute/MyWishlist.jsx";
import ReturnsAndCancellations from "./components/pages/userRoute/ReturnsAndCancellations.jsx";
import UpdateProfile from "./components/pages/userRoute/UpdateProfile.jsx";
import ManageUsers from "./components/pages/admin routes/ManageUsers.jsx";
import ManageProducts from "./components/pages/admin routes/ManageProducts.jsx";
import AdminDashboard from "./components/pages/admin routes/AdminDashboard.jsx";
import ManageOrders from "./components/pages/admin routes/ManageOrders.jsx";
import OffersPage from "./components/pages/admin routes/OffersPage.jsx";
import WishlistPage from "./components/pages/admin routes/WishlistPage.jsx";
import CartPage from "./components/pages/admin routes/CartPage.jsx";
import AboutUs from "./components/pages/about_us/AboutUs.jsx";
import CategoryDetails from "./components/pages/category-details/CategoryDetails.jsx";
import BrandDetails from "./components/pages/brand_details/BrandDetails.jsx";
import AgeCategoryDetails from "./components/pages/age-category/AgeCategoryDetails.jsx";
import AddProduct from "./components/pages/admin routes/AddProduct.jsx";
import UpdateProduct from "./components/pages/admin routes/UpdateProduct.jsx";
import Inventories from "./components/pages/admin routes/Inventories.jsx";
import AddCategory from "./components/pages/admin routes/AddCategory.jsx";
import AddBrand from "./components/pages/admin routes/AddBrand.jsx";
import AddColor from "./components/pages/admin routes/AddColor.jsx";
import AddMaterials from "./components/pages/admin routes/AddMaterials.jsx";

const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/aboutUs",
        element: <AboutUs />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/searchResult/:id",
        element: <SearchResult />,
      },
      {
        path: "/productDetail/:id",
        element: <ProductDetails />,
      },
      {
        path: "/categoryDetail/:id",
        element: <CategoryDetails />,
      },
      {
        path: "/brandDetail/:id",
        element: <BrandDetails />,
      },
      {
        path: "/ageCategory/:id",
        element: <AgeCategoryDetails />,
      },
      {
        path: "/products",
        element: <AllProducts />,
      },
      {
        path: "/cart",
        element: <ShoppingCart />,
      },
    ],
  },
  {
    path: "/forgot-password",
    element: <PasswordReset />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "/dashboard/profile",
        element: <UserProfile />,
      },
      {
        path: "/dashboard/orders",
        element: <OrderHistory />,
      },
      {
        path: "/dashboard/userReviews",
        element: <MyReviews />,
      },
      {
        path: "/dashboard/userWishlist",
        element: <MyWishlist />,
      },
      {
        path: "/dashboard/userReturned",
        element: <ReturnsAndCancellations />,
      },
      {
        path: "/dashboard/updateProfile/:id",
        element: <UpdateProfile />,
      },
      {
        path: "/dashboard/adminDashboard",
        element: <AdminDashboard />,
      },
      {
        path: "/dashboard/manageUsers",
        element: <ManageUsers />,
      },
      {
        path: "/dashboard/manageProducts",
        element: <ManageProducts />,
      },
      {
        path: "/dashboard/inventories/:id",
        element: <Inventories />,
      },
      {
        path: "/dashboard/manageOrders",
        element: <ManageOrders />,
      },
      {
        path: "/dashboard/manageOffers",
        element: <OffersPage />,
      },
      {
        path: "/dashboard/manageWishlist",
        element: <WishlistPage />,
      },
      {
        path: "/dashboard/manageCart",
        element: <CartPage />,
      },
      {
        path: "/dashboard/addProduct",
        element: <AddProduct />,
      },
      {
        path: "/dashboard/updateProduct/:id",
        element: <UpdateProduct />,
      },
      {
        path: "/dashboard/addCategory",
        element: <AddCategory />,
      },
      {
        path: "/dashboard/addBrand",
        element: <AddBrand />,
      },
      {
        path: "/dashboard/addColor",
        element: <AddColor />,
      },
      {
        path: "/dashboard/addMaterial",
        element: <AddMaterials />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);
