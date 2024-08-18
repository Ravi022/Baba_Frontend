import React from "react";

const Loading = ({ type }) => {
  return (
    <div
      className={`${
        type ? "bg-gray-800 " : "bg-gray-700"
      } relative min-h-screen w-full flex flex-col justify-center items-center text-white text-xl`}
    >
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
      <div className="mt-4">Loading...</div>
    </div>
  );
};

export default Loading;
