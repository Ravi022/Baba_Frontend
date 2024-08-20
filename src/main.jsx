import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { useNavigate } from "react-router-dom";
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

// ProtectedRoute component
const ProtectedRoute = ({ element }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login"); // Redirect to login if no token is found
    }
  }, [navigate]);

  return element; // Render the passed component if the token is present
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <ProtectedRoute element={<Home />} />, // Protect this route
      },
      {
        path: "/regressionSuite",
        element: <ProtectedRoute element={<RegressionSuite />} />, // Protect this route
      },
      {
        path: "/thirdPartyApi",
        element: <ProtectedRoute element={<ThirdPartyApi />} />, // Protect this route
      },
      {
        path: "/api",
        element: <ProtectedRoute element={<Api />} />, // Protect this route
      },
      {
        path: "/updateProfile",
        element: <ProtectedRoute element={<UserProfile />} />, // Protect this route
      },
      {
        path: "/scanner",
        element: <ProtectedRoute element={<Scanner />} />, // Protect this route
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
