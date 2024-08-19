import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Logo from "../../assets/Logo.png";
import UserProfile from "./UserDropDown/UserDropDown";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const NavigationBar = [
    {
      title: "Regression Suite",
      navigateTo: "/regressionSuite",
    },
    {
      title: "Analyze Third Party Api",
      navigateTo: "/thirdPartyApi",
    },
    {
      title: "OWASP Discover",
      navigateTo: "/scanner",
    },
  ];

  return (
    <header className="relative flex items-center h-[10vh] bg-gradient-to-r from-gray-900 to-gray-800 shadow-xl px-8 z-50">
      {/* Subtle Background Animation */}
      <motion.div
        className="absolute inset-0 z-0 bg-gradient-to-r from-purple-600 via-purple-800 to-transparent opacity-20 "
        animate={{ opacity: [0.2, 0.1, 0.2], x: [0, 20] }}
        transition={{ duration: 6, repeat: Infinity, repeatType: "reverse" }}
      />

      <div className="flex items-center w-/12 z-10">
        <motion.div
          className="flex items-center gap-4 cursor-pointer"
          onClick={() => navigate("/")}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src={Logo}
            alt="Baba Security Logo"
            className="h-12 w-12 transform hover:scale-110 transition-transform duration-300"
          />
          <span className="text-4xl font-bold text-white tracking-wide subpixel-antialiased">
            Baba Security
          </span>
        </motion.div>
      </div>

      <nav className="flex justify-center w-6/12 z-10">
        {NavigationBar.map((item, index) => {
          const isActive = location.pathname === item.navigateTo;

          return (
            <div className="flex items-center " key={index}>
              <motion.div
                className={`relative text-lg font-semibold transition-colors duration-300 cursor-pointer ${
                  isActive
                    ? "text-purple-400"
                    : "text-gray-300 hover:text-purple-300"
                }`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => navigate(item.navigateTo)}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                {item.title}

                {/* Framer Motion underline */}
                <motion.div
                  className="absolute bottom-[-6px] left-0 right-0 h-[4px] bg-purple-500 rounded"
                  initial={{ scaleX: 0 }}
                  animate={{
                    scaleX: isActive || hoveredIndex === index ? 1 : 0,
                  }}
                  transition={{ duration: 0.4 }}
                />
              </motion.div>
              {/* Divider Line */}
              {index < NavigationBar.length - 1 && (
                <div className="h-6 border-l border-gray-600 mx-4"></div>
              )}
            </div>
          );
        })}
      </nav>

      <div className="flex justify-end items-center w-3/12 z-10">
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <UserProfile />
        </motion.div>
      </div>
    </header>
  );
}
