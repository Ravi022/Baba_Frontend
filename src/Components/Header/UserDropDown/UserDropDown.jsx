import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function UserDropDown() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const navigate = useNavigate();

  // Dummy user data, replace with actual data from props or context
  const user = {
    name: "John Doe",
    email: "johndoe@example.com",
    imageUrl: "https://via.placeholder.com/150", // Replace with actual image URL
  };

  const handleToggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    // Handle logout logic here
    console.log("Logout clicked");
    setIsDropdownOpen(false);
  };

  const handleUpdateProfile = () => {
    // Handle update profile logic here
    navigate("/updateProfile");
    console.log("Update Profile clicked");
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    // Bind the event listener to detect clicks outside the dropdown
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Clean up the event listener on component unmount
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        className="cursor-pointer flex items-center space-x-3 bg-gray-800 px-4 py-2 rounded-full hover:bg-gray-700 transition-colors"
        onClick={handleToggleDropdown}
      >
        <img
          src={user.imageUrl}
          alt="User Avatar"
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="text-white font-semibold">{user.name}</div>
        <svg
          className={`w-5 h-5 ml-2 text-white transition-transform ${
            isDropdownOpen ? "transform rotate-180" : ""
          }`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>

      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-gray-900 border border-gray-700 rounded-lg shadow-lg z-50">
          <div className="px-4 py-3">
            <div className="text-white font-semibold">{user.name}</div>
            <div className="text-gray-400 text-sm">{user.email}</div>
          </div>
          <div className="border-t border-gray-700"></div>
          <div
            className="px-4 py-2 cursor-pointer text-gray-300 hover:text-white hover:bg-gray-800 transition-colors rounded-lg"
            onClick={handleUpdateProfile}
          >
            Update Profile
          </div>
          <div
            className="px-4 py-2 cursor-pointer text-red-400 hover:text-red-600 hover:bg-gray-800 transition-colors rounded-lg"
            onClick={handleLogout}
          >
            Logout
          </div>
        </div>
      )}
    </div>
  );
}
