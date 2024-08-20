import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router";
import Header from "./Components/Header/Header";
import Terminal from "./Components/Terminal/Terminal";
import Loading from "./Components/Loading/Loading";

export default function Layout() {
  const location = useLocation(); // Get the current route
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [scanner, setScanner] = useState();
  const [nuclei, setNuclei] = useState([]);
  const [terminalOut, setTerminalOut] = useState([]); // New state for terminal output
  const [testApi, setTestApi] = useState([]);
  const [vulnapi, setVulnApi] = useState([]);
  const [thirdPartySast, setThirdPartySast] = useState([]);
  // Check if the current route is "/scanner"
  const isScannerRoute = location.pathname === "/scanner";

  const fetchList = async () => {
    setLoading(true); // Set loading to true when the form is submitted

    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    try {
      const response = await fetch(
        `http://3.6.112.142:3000/apiDiscovery`, // Ensure this is the correct API endpoint
        {
          method: "GET", // GET request
          headers, // Attach the headers
        }
      );

      const contentType = response.headers.get("Content-Type");

      let data;
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        data = await response.text();
      }

      if (response.status == 200) {
        console.log("success:", data);
        setLinks(data); // Assuming setLinks is a state setter from useOutletContext
      } else {
        console.warn("Non-200 response:", data);
        alert("An error occurred");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      alert(
        "An error occurred while fetching data. Check the console for details."
      );
    } finally {
      setLoading(false); // Set loading to false after the request is complete
    }
  };

  const handleNuclei = async (payload) => {
    console.log(payload);

    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    try {
      const response = await fetch(`http://3.6.112.142:3000/nuclei`, {
        method: "POST",
        headers,
        body: JSON.stringify(payload),
      });

      const contentType = response.headers.get("Content-Type");

      let data;
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        data = await response.text();
      }

      if (response.ok) {
        console.log("successNuclei:", data.payload.terminalOut);
        setNuclei(data);
        if (data.payload && data.payload.terminalOut) {
          setTerminalOut(data.payload.terminalOut); // Store terminal output
        }
        console.log("success:", data);
      } else {
        console.warn("Non-200 response:", data);
        alert("An error occurred");
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      if (error.message === "Failed to fetch") {
        console.error("Network error or CORS issue detected.");
      }
      alert(
        "An error occurred while submitting data. Check the console for details."
      );
    } finally {
      setLoading(false);
    }
  };
  const handlethirdpartySast = async (payload) => {
    console.log("Payload:", payload);
  
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
  
    try {
      console.log("Starting third-party SAST request...");
      const response = await fetch(`http://3.6.112.142:3000/thirdpartySast`, {
        method: "POST",
        headers,
        body: JSON.stringify(payload),
      });
  
      console.log("Response received.");
  
      const contentType = response.headers.get("Content-Type");
      let data;
  
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        data = await response.text();
      }
  
      console.log("Response Data:", data);
  
      if (response.ok) {
        // Ensure extractedIssues and termOut are present in the response data
        if (data && data.extractedIssues && data.termOut) {
          console.log("Extracted Issues:", data.extractedIssues);
          console.log("Terminal Output:", data.termOut);
  
          // Update state with the extracted issues and terminal output
          setThirdPartySast(data);
          setTerminalOut(data.termOut); // Store terminal output
        } else {
          console.warn("Response data is missing expected fields.");
        }
      } else {
        console.warn("Non-200 response:", data);
        alert("An error occurred while processing the request.");
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      if (error.message === "Failed to fetch") {
        console.error("Network error or CORS issue detected.");
      }
      alert(
        "An error occurred while submitting data. Check the console for details."
      );
    } finally {
      setLoading(false);
    }
  };
  
  const handleTestApi = async (payload) => {
    console.log(payload);

    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    try {
      const response = await fetch(`http://3.6.112.142:3000/testapi`, {
        method: "POST",
        headers,
        body: JSON.stringify(payload),
      });

      const contentType = response.headers.get("Content-Type");

      let data;
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        data = await response.text();
      }

      if (response.ok) {
        setTestApi(data);
        // if (data.payload && data.payload.terminalOut) {
        //   setTerminalOut(data.payload.terminalOut); // Store terminal output
        // }
        console.log("success:", data);
      } else {
        console.warn("Non-200 response:", data);
        alert("An error occurred");
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      if (error.message === "Failed to fetch") {
        console.error("Network error or CORS issue detected.");
      }
      alert(
        "An error occurred while submitting data. Check the console for details."
      );
    } finally {
      setLoading(false);
    }
  };
  const fetchVulnApi = async (payload) => {
    console.log(payload);
    setLoading(true); // Set loading to true when the form is submitted

    // Set up the headers correctly
    const headers = {
      // Accept: "application/json",
      "Content-Type": "application/json",
      // Authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    try {
      // Perform the fetch request
      const response = await fetch(
        `http://3.6.112.142:3000/vulnapi`, // Ensure this is the correct API endpoint
        {
          method: "POST", // GET request
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
        console.log("vulnApi:", data);
        setVulnApi(data);

        if (typeof data === "object" && data.apis) {
          // Parse the 'apis' array and set the links
          // const parsedLinks = data.apis.map((url, index) => ({
          //   id: index + 1,
          //   url: url,
          // }));
          // setLinks(parsedLinks); // Store parsed links in state
          // console.log("objectType :", data);
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
    if (location.pathname === "/" || location.pathname === "/regressionSuite") {
      fetchList();
    }
  }, [location.pathname]);

  if (loading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  console.log("VulnApiLayout :", vulnapi);

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
          <Outlet
            context={{
              fetchVulnApi,
              fetchList,
              links,
              scanner,
              handleNuclei,
              nuclei,
              fetchList,
              handleTestApi,
              vulnapi,
              handlethirdpartySast,
              thirdPartySast,
              terminalOut
            }}
          />
        </div>
        {/* Conditionally render the Terminal component based on the route */}
        {!isScannerRoute && (
          <div className="w-4/12 rounded overflow-y-scroll">
            <Terminal terminalOut={terminalOut} />
          </div>
        )}
      </div>
    </div>
  );
}
