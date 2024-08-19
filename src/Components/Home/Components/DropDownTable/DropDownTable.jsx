import React, { useState } from "react";
import StickyTable from "../StickyTable/StickyTable";
import { IoIosArrowDropdown } from "react-icons/io";

// const urls = [
//   {
//     id: 1,
//     url: "https://organization-frontend.vercel.app/sitemap.xml...",
//   },
//   {
//     id: 2,
//     url: "https://organization-frontend.vercel.app/",
//   },
//   {
//     id: 3,
//     url: "https://organization-frontend.vercel.app/login",
//   },
//   {
//     id: 4,
//     url: "https://organization-frontend.vercel.app/signUp",
//   },
//   {
//     id: 5,
//     url: "https://organization-frontend.vercel.app/importantTasks",
//   },
//   {
//     id: 6,
//     url: "https://organization-frontend.vercel.app/completedTasks",
//   },
//   {
//     id: 7,
//     url: "https://organization-frontend.vercel.app/incompleteTasks",
//   },
// ];

export default function DropDownTable({ popUp, setpopUp, initial, urls }) {
  const [dropDown, setDropDown] = useState(initial); // dropdown is hidden by default
  const toggleDropDown = () => {
    setDropDown((prev) => !prev);
  };

  return (
    <div className="">
      <div className="absolute right-0 flex flex-row justify-end items-center p-4 px-5">
        <button onClick={toggleDropDown} className="focus:outline-none">
          <IoIosArrowDropdown
            className={`text-2xl transform transition-transform duration-300 ${
              dropDown ? "rotate-180" : "rotate-0"
            }`}
          />
        </button>
      </div>
      <div>
        <h1 className="text-2xl font-bold mb-4 flex flex-row justify-center items-center">
          API URLs
        </h1>
        <div
          className={`bg-gray-800 overflow-hidden transition-all duration-500 ease-in-out ${
            dropDown ? "max-h-0 opacity-0" : "max-h-screen opacity-100"
          }`}
        >
          <StickyTable rows={urls} setpopUp={setpopUp} popUp={popUp} />
        </div>
      </div>
    </div>
  );
}
