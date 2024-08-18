import React, { useState } from "react";
import StickyTable from "../StickyTable/StickyTable";
import { IoIosArrowDropdown } from "react-icons/io";

const url = [
  {
    id: 1,
    url: "https://chatgpt.com/c/928bddaf-859c-437a-9b99-1652e0763e90",
  },
  {
    id: 2,
    url: "https://cloud.mongodb.com/v2/66be38d2b5c2e342185dd0c1#/metrics/replicaSet/66be39eb761f5d7c3a5b54dd/explorer/Baba_Management/users/find",
  },
  { id: 3, url: "https://example.com/dummy-url-1" },
  { id: 4, url: "https://example.com/dummy-url-2" },
  { id: 5, url: "https://example.com/dummy-url-3" },
  { id: 6, url: "https://example.com/dummy-url-4" },
  { id: 7, url: "https://example.com/dummy-url-5" },
  { id: 8, url: "https://example.com/dummy-url-6" },
  { id: 9, url: "https://example.com/dummy-url-7" },
  { id: 10, url: "https://example.com/dummy-url-8" },
  { id: 11, url: "https://example.com/dummy-url-9" },
  { id: 12, url: "https://example.com/dummy-url-10" },
];

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
