import React from "react";

const Loading = ({ type }) => {
  const isScannerType = type === "scanner";

  return (
    <div
      className={`${
        isScannerType ? "fixed inset-0" : "relative min-h-screen"
      } ${isScannerType ? "bg-gray-900" : type ? "bg-gray-800" : "bg-gray-700"} 
      w-full flex flex-col justify-center items-center text-white text-xl`}
    >
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
      <div className="mt-4">Loading...</div>
    </div>
  );
};

export default Loading;
