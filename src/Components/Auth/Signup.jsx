import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Ensure axios is imported
import SignUpLogo from "../../assets/Designer.jpeg"; // Import your background image here
import Dialog from "../IntegrationFile/Dialog/Dialog"; // Ensure this is correctly imported
import Loading from "../Loading/Loading";

export default function Signup() {
  const [formData, setFormData] = useState({
    orgName: "",
    username: "",
    password: "",
    email: "",
    githubLink: "",
  });

  const [dialog, setDialog] = useState({
    open: false,
    message: "",
    status: null,
  });

  const [loading, setLoading] = useState(false); // Added to manage loading state
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when the form is submitted

    const payload = {
      name: formData.username,
      email: formData.email,
      password: formData.password,
      organisationname: formData.orgName,
      organisationgithuburl: formData.githubLink,
    };

    try {
      const response = await axios.post(
        import.meta.env.VITE_API_KEY + "user/signUp",
        payload
      );
      console.log(response);
      if (response.status === 200) {
        // console.log("success :", response);
        localStorage.setItem("token", response.data.token);
        // console.log(localStorage.getItem("token"));
        navigate("/"); // Navigate to the dashboard after successful signup
      } else {
        setDialog({
          open: true,
          message: "An error occured" || "An error occurred",
          status: response.status,
        });
      }
    } catch (error) {
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
        backgroundImage: `url(${SignUpLogo})`,
        backgroundSize: "100%", // Zoomed out effect
        backgroundPosition: "center",
        opacity: 0.85, // Reduced opacity for the background image
      }}
    >
      <div className="absolute inset-0 bg-black opacity-70"></div>{" "}
      {/* Overlay to darken the background image */}
      <div className="relative z-10 p-8 bg-gray-800 bg-opacity-80 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-white">
          Create new account
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-white">
              Organization Name
            </label>
            <input
              type="text"
              name="orgName"
              value={formData.orgName}
              onChange={handleChange}
              className="bg-gray-700 bg-opacity-50 text-white px-4 py-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-white">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="bg-gray-700 bg-opacity-50 text-white px-4 py-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-white">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="bg-gray-700 bg-opacity-50 text-white px-4 py-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-white">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="bg-gray-700 bg-opacity-50 text-white px-4 py-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-white">
              GitHub Link
            </label>
            <input
              type="text"
              name="githubLink"
              value={formData.githubLink}
              onChange={handleChange}
              className="bg-gray-700 bg-opacity-50 text-white px-4 py-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
            disabled={loading} // Disable button during loading
          >
            {loading ? "Creating account..." : "Create account"}
          </button>
          <div className="mt-4 text-center">
            <span className="text-sm text-white">Already A Member? </span>
            <button
              onClick={() => navigate("/login")}
              className="text-blue-400 hover:underline text-sm"
            >
              Log In
            </button>
          </div>
        </form>
      </div>
      {/* Autofill Styles */}
      <style jsx>{`
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
