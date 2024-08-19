import React, { useState, useEffect } from "react";
import ComboBox from "./ui/ComboBox";
import { Button } from "@mui/material";
import axios from "axios"; // Make sure to import axios
import { useOutletContext } from "react-router-dom";
import Loading from "../Loading/Loading";
import StickyTable from "../Home/Components/StickyTable/StickyTable";

const options = {
  tags: [
    "cve",
    "panel",
    "wordpress",
    "exposure",
    "xss",
    "wp-plugin",
    "osint",
    "tech",
    "lfi",
    "misconfig",
  ],
  severity: ["info", "high", "medium", "critical", "low"],
  url: [
    "https://organization-frontend.vercel.app/sitemap.xml...",
    "https://organization-frontend.vercel.app/",
    "https://organization-frontend.vercel.app/login",
    "https://organization-frontend.vercel.app/signUp",
    "https://organization-frontend.vercel.app/importantTasks",
    "https://organization-frontend.vercel.app/completedTasks",
    "https://organization-frontend.vercel.app/incompleteTasks",
  ],
};

const rows = [
  { id: 1, url: "http-missing-security-headers:permissions-policy" },
  { id: 2, url: "http-missing-security-headers:clear-site-data" },
  { id: 3, url: "http-missing-security-headers:cross-origin-embedder-policy" },
  { id: 4, url: "http-missing-security-headers:cross-origin-resource-policy" },
  { id: 5, url: "http-missing-security-headers:content-security-policy" },
  { id: 6, url: "http-missing-security-headers:x-frame-options" },
  { id: 7, url: "http-missing-security-headers:x-content-type-options" },
  {
    id: 8,
    url: "http-missing-security-headers:x-permitted-cross-domain-policies",
  },
  { id: 9, url: "http-missing-security-headers:referrer-policy" },
  { id: 10, url: "http-missing-security-headers:cross-origin-opener-policy" },
];
export default function RegressionSuite() {
  const { links } = useOutletContext();
  const [selectedValues, setSelectedValues] = useState({
    tags: null,
    severity: null,
    url: null,
  });
  const [loading, setLoading] = useState(false); // Added loading state
  const [urlOptions, setUrlOptions] = useState([]); // State for storing URL options
  const [nuclei, setNuclei] = useState();

  // Update the URL options when the `links` context changes
  useEffect(() => {
    if (links && links.length > 0) {
      const linkUrls = links.map((link) => link.url); // Extract URL from each link object
      setUrlOptions(linkUrls); // Set the extracted URLs as the options for the dropdown
    }
  }, [links]);

  const handleComboBoxChange = (key, value) => {
    setSelectedValues((prevValues) => ({
      ...prevValues,
      [key]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setLoading(true); // Set loading to true when the form is submitted

    const payload = {
      tags: selectedValues.tags,
      severity: selectedValues.severity,
      url: selectedValues.url,
    };

    console.log(payload);
    return;

    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    try {
      // Perform the fetch request
      const response = await fetch(
        `${import.meta.env.VITE_API_KEY}nuclei`, // Ensure this is the correct API endpoint
        {
          method: "POST", // POST request
          headers, // Attach the headers
          body: JSON.stringify(payload), // Send the payload as a JSON string
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
        setNuclei(data.payload.terminalOut);
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
      setLoading(false); // Set loading to false after the request is complete
    }
  };
  if (loading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return (
    <div className="relative p-4 bg-gray-900 h-[86vh] text-white flex flex-col gap-4">
      <div className="flex flex-col gap-4 items-center p-4">
        <h2 className="text-xl  text-blue-300 mb-4 from-neutral-200 ">
          Baba Security enables you to run regression tests using various
          templates.
        </h2>
        <div className="flex flex-row gap-8 ">
          <div className="flex flex-col gap-3 w-full items-center text-white">
            <ComboBox
              label="URL"
              options={options.url} // Use the dynamic URL options here
              selectedValue={selectedValues.url}
              onChange={(value) => handleComboBoxChange("url", value)}
              width={600}
            />
            <div className="flex flex-row gap-3">
              <ComboBox
                label="Tags"
                options={options.tags}
                selectedValue={selectedValues.tags}
                onChange={(value) => handleComboBoxChange("tags", value)}
                width={300}
              />
              <ComboBox
                label="Severity"
                options={options.severity}
                selectedValue={selectedValues.severity}
                onChange={(value) => handleComboBoxChange("severity", value)}
                width={300}
              />
            </div>
          </div>
          <div className="flex flex-col gap-4 items-center ">
            <div className="flex flex-row text-nowrap text-md font-semibold p-2 ">
              Run Regression Testing
            </div>
            <div className="flex ">
              <Button
                variant="contained"
                color="primary"
                className="mt-4 bg-blue-500 hover:bg-blue-600 text-white"
                onClick={handleSubmit}
                disabled={loading} // Disable the button while loading
              >
                {loading ? "Submitting..." : "Submit"}
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* <div
        style={{
          whiteSpace: "pre-wrap", // Preserve whitespace and line breaks
          fontFamily: "monospace", // Use a monospace font for terminal-like appearance
          backgroundColor: "#1e1e1e", // Dark background for terminal effect
          color: "#ffffff", // Light text color
          padding: "10px",
          borderRadius: "5px",
        }}
      >
        {nuclei}
      </div> */}
      <div className="p-6">
        <StickyTable rows={rows} />
      </div>
    </div>
  );
}
