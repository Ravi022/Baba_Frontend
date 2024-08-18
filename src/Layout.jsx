import React from "react";
import { Outlet, useLocation } from "react-router";
import Header from "./Components/Header/Header";
import Terminal from "./Components/Terminal/Terminal";

export default function Layout() {
  const location = useLocation(); // Get the current route

  // Check if the current route is "/scanner"
  const isScannerRoute = location.pathname === "/scanner";

  return (
    <div className="w-full min-h-screen bg-gray-900 text-white relative p-2">
      <div className="p-2 border border-gray-700 mx-2">
        <Header />
      </div>
      <div className="flex flex-row w-full h-[98vh] gap-3 px-2 pb-2 pt-2">
        <div
          className={`${
            !isScannerRoute ? "border" : ""
          } w-8/12 rounded border-gray-700 h-[86vh] overflow-y-scroll`}
        >
          <Outlet />
        </div>
        {/* Conditionally render the Terminal component based on the route */}
        {!isScannerRoute && (
          <div className="w-4/12 rounded overflow-y-scroll">
            <Terminal />
          </div>
        )}
      </div>
    </div>
  );
}
