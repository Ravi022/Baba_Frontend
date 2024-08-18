import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router";
import Header from "./Components/Header/Header";
import Terminal from "./Components/Terminal/Terminal";
import axios from "axios";
import Loading from "./Components/Loading/Loading";

export default function Layout() {
  const location = useLocation(); // Get the current route
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(false);

  // Check if the current route is "/scanner"
  const isScannerRoute = location.pathname === "/scanner";

  const fetchList = async () => {
    e.preventDefault();
    setLoading(true); // Set loading to true when the form is submitted
    const headers={
      token:localStorage.getItem("token");
    }
    try {
      const response = await axios.get(
        import.meta.env.VITE_API_KEY + "apilinks",
        {
          headers:{}
        }
      );
      console.log(response);
      if (response.status === 200) {
        console.log("success :", response);
        setLinks(response.data.links);
      } else {
        alert("An error occured");
      }
    } catch (error) {
      console.log(error);
      if (error.response) {
        console.log(error);
        alert(error);
      }
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
