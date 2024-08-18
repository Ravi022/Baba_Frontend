import React, { useState, useEffect } from "react";
import ComboBox from "./ui/ComboBox";
import { Button } from "@mui/material";
import axios from "axios"; // Make sure to import axios
import { useOutletContext } from "react-router-dom";
import Loading from "../Loading/Loading";

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
};

export default function RegressionSuite() {
  const { links } = useOutletContext();
  const [selectedValues, setSelectedValues] = useState({
    tags: null,
    severity: null,
    url: null,
  });
  const [loading, setLoading] = useState(false); // Added loading state
  const [urlOptions, setUrlOptions] = useState([]); // State for storing URL options

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
    setLoading(true); // Set loading to true when the form is submitted

    const payload = {
      tags: selectedValues.tags,
      severity: selectedValues.severity,
      url: selectedValues.url,
    };

    console.log(payload);

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
    <div className="relative p-4 bg-gray-900 h-[86vh] text-white">
      <div className="w-full h-full flex flex-col gap-4 items-center p-4 mt-4">
        <h2 className="text-2xl font-semibold text-blue-300 mb-4">
          Select Options
        </h2>
        <div className="flex flex-col gap-3 w-full items-center text-white">
          <ComboBox
            label="URL"
            options={urlOptions} // Use the dynamic URL options here
            selectedValue={selectedValues.url}
            onChange={(value) => handleComboBoxChange("url", value)}
          />
          <ComboBox
            label="Tags"
            options={options.tags}
            selectedValue={selectedValues.tags}
            onChange={(value) => handleComboBoxChange("tags", value)}
          />
          <ComboBox
            label="Severity"
            options={options.severity}
            selectedValue={selectedValues.severity}
            onChange={(value) => handleComboBoxChange("severity", value)}
          />
        </div>
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
  );
}
