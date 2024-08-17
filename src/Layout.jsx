import React from "react";
import { Outlet } from "react-router";
import Header from "./Components/Header/Header";
import Terminal from "./Components/Terminal/Terminal";

export default function Layout() {
  return (
    <div className="w-full min-h-screen bg-gray-900 text-white  relative p-2">
      <div className="p-2 border border-gray-700 mx-2">
        <Header />
      </div>
      <div className="flex flex-row w-full h-[98vh] gap-3 px-2 pb-2 pt-2">
        <div className="w-8/12 border rounded border-gray-700">
          <Outlet />
        </div>
        <div className="w-4/12 rounded  overflow-y-scroll ">
          <Terminal />
        </div>
      </div>
    </div>
  );
}
