import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./Layout.jsx";
import Home from "./Components/Home/Home.jsx";
import Login from "./Components/Auth/Login.jsx";
import Signup from "./Components/Auth/Signup.jsx";
import RegressionSuit from "./Components/RegressionSuit/RegressionSuit.jsx";
import DiscoverApi from "./Components/DiscoverApi/DiscoverApi.jsx";
import Api from "./Components/Api/Api.jsx";
import UserProfile from "./Components/Header/UserProfile/UserProfile.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/regressionSuit",
        element: <RegressionSuit />,
      },
      {
        path: "/discoverApi",
        element: <DiscoverApi />,
      },
      {
        path: "/api",
        element: <Api />,
      },
      {
        path: "/updateProfile",
        element: <UserProfile />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
    {/* <App /> */}
  </StrictMode>
);
