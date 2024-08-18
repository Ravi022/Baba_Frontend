import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Popup = ({ isOpen, onClose, navigationOptions }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleNavigation = (url) => {
    navigate(url);
    onClose(); // Close the popup after navigation
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="bg-gray-800 text-white p-6 rounded-lg shadow-lg"
      >
        <h2 className="text-lg font-semibold mb-4">Navigation Options</h2>
        <ul>
          {navigationOptions.map((option, index) => (
            <li key={index} className="mb-2">
              <button
                onClick={() => handleNavigation(option.url)}
                className="text-blue-400 hover:text-blue-300"
              >
                {option.name}
              </button>
            </li>
          ))}
        </ul>
        <button
          onClick={onClose}
          className="mt-4 bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded"
        >
          Close
        </button>
      </motion.div>
    </div>
  );
};

export default Popup;
