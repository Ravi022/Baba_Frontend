import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginBgImage from "../../assets/Designer.jpeg"; // Import your background image here
import Loading from "../Loading/Loading";
import Dialog from "../IntegrationFile/Dialog/Dialog";
import axios from "axios";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [dialog, setDialog] = useState({
    open: false,
    message: "",
    status: null,
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when the form is submitted

    const payload = {
      email: formData.email,
      password: formData.password,
    };
    console.log(payload);
    try {
      const response = await axios.post(
        import.meta.env.VITE_API_KEY + "user/login",
        payload
      );
      console.log(response);
      if (response.status === 200) {
        console.log("success :", response);
        localStorage.setItem("token", response.data.token);
        navigate("/"); // Navigate to the dashboard after successful signup
      } else {
        setDialog({
          open: true,
          message: "An error occured" || "An error occurred",
          status: response.status,
        });
      }
    } catch (error) {
      console.log(error)
      if (error.response) {
        console.log(error);
        alert(error);
      }
    } finally {
      setLoading(false); // Set loading to false after the request is complete
    }
  };

  if (loading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return (
    <div
      className="h-screen w-full flex items-center justify-center bg-no-repeat bg-gray-900"
      style={{
        backgroundImage: `url(${LoginBgImage})`,
        backgroundSize: "100%", // Zoomed out effect
        backgroundPosition: "center",
        opacity: 0.85, // Reduced opacity for the background image
      }}
    >
      <div className="absolute inset-0 bg-black opacity-70"></div>{" "}
      {/* Add an overlay to darken the background image */}
      <div className="relative z-10 p-8 bg-gray-800 bg-opacity-80 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-white">
          Login
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-white">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="bg-gray-700 px-3 py-2 my-3 w-full rounded text-white"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-white">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="bg-gray-700 px-3 py-2 my-3 w-full rounded text-white"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Login
          </button>
        </form>
        <div className="mt-4 text-center text-white">
          <span>Don't have an account? </span>
          <button
            onClick={() => navigate("/signup")}
            className="text-blue-500 hover:underline"
          >
            Sign Up
          </button>
        </div>
      </div>
      {/* Autofill Styles */}
      <style >{`
        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus,
        input:-webkit-autofill:active {
          -webkit-box-shadow: 0 0 0 30px rgba(55, 65, 81, 1) inset !important;
          -webkit-text-fill-color: white !important;
          transition: background-color 5000s ease-in-out 0s;
        }
      `}</style>
    </div>
  );
}
