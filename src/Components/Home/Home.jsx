import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const urls = [
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
  ];
  const handleOnClick = () => {
    navigate("/api");
  };
  return (
    <div className="p-4 bg-gray-900 min-h-screen">
      <h1 className="text-2xl font-bold mb-4 flex flex-row justify-center item-center">
        API URLs
      </h1>
      <div className="  flex flex-col gap-3">
        {urls.map((urlObject) => (
          <div
            key={urlObject.id}
            className="bg-gray-800 shadow-md rounded p-4  "
            onClick={handleOnClick}
          >
            <div
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline break-all"
            >
              {urlObject.url}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
