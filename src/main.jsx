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
import CategoryDetails from "./components/pages/category-details/CategoryDetails.jsx";
import ProductDetails from "./components/pages/product-details/ProductDetails.jsx";
import AllProducts from "./components/pages/all-products/AllProducts.jsx";

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
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/searchResult/:id",
        element: <SearchResult />
      },
      {
        path: "/categoryDetails/:id",
        element: <CategoryDetails />
      },
      {
        path: "/productDetail/:id",
        element: <ProductDetails />
      },
      {
        path: "/products",
        element: <AllProducts />
      }
    ],
  },
  {
    path: "/forgot-password",
    element: <PasswordReset />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);
