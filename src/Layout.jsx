import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router";
import Header from "./Components/Header/Header";
import Terminal from "./Components/Terminal/Terminal";
import Loading from "./Components/Loading/Loading";

export default function Layout() {
  const location = useLocation(); // Get the current route
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(false);

  // Check if the current route is "/scanner"
  const isScannerRoute = location.pathname === "/scanner";

  const fetchList = async () => {
    setLoading(true); // Set loading to true when the form is submitted

    // Set up the headers correctly
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    try {
      // Perform the fetch request
      const response = await fetch(
        `${import.meta.env.VITE_API_KEY}bearer`, // Ensure this is the correct API endpoint
        {
          method: "GET", // GET request
          headers, // Attach the headers
        }
      );

      // Check if the response is in JSON format by inspecting the Content-Type header
      const contentType = response.headers.get("Content-Type");

      let data;
      if (contentType && contentType.includes("application/json")) {
        // Parse the response as JSON
        data = await response.json();
      } else {
        // If it's not JSON, parse it as text (likely HTML)
        data = await response.text();
      }

      if (response.ok) {
        // If the response status is 200-299
        console.log("success:", data);

        if (typeof data === "object" && data.apis) {
          // Parse the 'apis' array and set the links
          // const parsedLinks = data.apis.map((url, index) => ({
          //   id: index + 1,
          //   url: url,
          // }));
          // setLinks(parsedLinks); // Store parsed links in state
          console.log("objectType :", data);
        } else {
          console.warn("Unexpected response format:", data);
          alert("Unexpected response format.");
        }
      } else {
        console.warn("Non-200 response:", data);
        alert("An error occurred");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      if (error.message === "Failed to fetch") {
        console.error("Network error or CORS issue detected.");
      }
      alert(
        "An error occurred while fetching data. Check the console for details."
      );
    } finally {
      setLoading(false); // Set loading to false after the request is complete
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  if (loading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gray-900 text-white relative p-2 font-sans">
      <div className="p-2 border border-gray-700 mx-2">
        <Header />
      </div>
      <div className="flex flex-row w-full h-[98vh] gap-3 px-2 pb-2 pt-2">
        <div
          className={`${
            !isScannerRoute ? "border" : ""
          } w-8/12 rounded border-gray-700 h-[86vh] overflow-y-scroll`}
        >
          <Outlet context={{ links }} />
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
