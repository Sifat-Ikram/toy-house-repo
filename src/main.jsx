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
import SearchResult from "./components/pages/search-result/SearchResult.jsx";
import ProductDetails from "./components/pages/product-details/ProductDetails.jsx";
import ShoppingCart from "./components/pages/cart/ShoppingCart.jsx";
import AllProducts from "./components/pages/all-products/AllProducts.jsx";
import AboutUs from "./components/pages/about_us/AboutUs.jsx";
import CategoryDetails from "./components/pages/category-details/CategoryDetails.jsx";
import BrandDetails from "./components/pages/brand_details/BrandDetails.jsx";
import AgeCategoryDetails from "./components/pages/age-category/AgeCategoryDetails.jsx";
import CheckoutPage from "./components/pages/checkout_page/CheckoutPage.jsx";
import AuthProvider from "./provider/AuthProvider.jsx";
import PrivacyPolicy from "./components/pages/privacy-policy/PrivacyPolicy.jsx";
import UserProfile from "./components/pages/user_profile/UserProfile.jsx";
import PasswordReset from "./components/pages/sign/PasswordReset.jsx";
import OtpVerification from "./components/pages/sign/OtpVerification.jsx";
import NewPassword from "./components/pages/sign/NewPassword.jsx";

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
      {
        path: "/checkout",
        element: <CheckoutPage />,
      },
      {
        path: "/privacyPolicy",
        element: <PrivacyPolicy />,
      },
      {
        path: "/userProfile",
        element: <UserProfile />,
      },
    ],
  },
  {
    path: "/forgotPassword",
    element: <PasswordReset />,
  },
  {
    path: "/OtpVerification",
    element: <OtpVerification />,
  },
  {
    path: "/newPassword",
    element: <NewPassword />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
