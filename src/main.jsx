import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./Layout.jsx";
import Home from "./Components/Home/Home.jsx";
import Login from "./Components/Auth/Login.jsx";
import Signup from "./Components/Auth/Signup.jsx";
import RegressionSuite from "./Components/RegressionSuite/RegressionSuite.jsx";
import ThirdPartyApi from "./Components/ThirdPartyApi/ThirdPartyApi.jsx";
import Api from "./Components/Api/Api.jsx";
import UserProfile from "./Components/Header/UserProfile/UserProfile.jsx";
import Scanner from "./Components/RegressionSuite/Scanner/Scanner.jsx";

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
        path: "/regressionSuite",
        element: <RegressionSuite />,
      },
      {
        path: "/thirdPartyApi",
        element: <ThirdPartyApi />,
      },
      {
        path: "/api",
        element: <Api />,
      },
      {
        path: "/updateProfile",
        element: <UserProfile />,
      },
      {
        path: "/scanner",
        element: <Scanner />,
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
