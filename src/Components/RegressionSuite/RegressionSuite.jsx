import React, { useState, useEffect } from "react";
import ComboBox from "./ui/ComboBox";
import { Button } from "@mui/material";
import Loading from "../Loading/Loading";
import StickyTable from "../Home/Components/StickyTable/StickyTable";
import { useOutletContext } from "react-router-dom";

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

export default function RegressionSuite() {
  const { links, handleNuclei, nuclei } = useOutletContext();
  const [selectedValues, setSelectedValues] = useState({
    tags: null,
    severity: null,
    url: null,
  });
  const [loading, setLoading] = useState(false); // Added loading state
  const [urlOptions, setUrlOptions] = useState([]); // State for storing URL options
  const [extractedIssues, setExtractedIssues] = useState([]); // State for storing processed extracted issues

  // Update the URL options when the `links` context changes
  useEffect(() => {
    if (links && links.length > 0) {
      const linkUrls = links.map((link) => link.url); // Extract URL from each link object
      setUrlOptions(linkUrls); // Set the extracted URLs as the options for the dropdown
    }

    // Process nuclei.payload.extractedIssues and convert it to {id, url}
    if (nuclei && nuclei.payload && nuclei.payload.extractedIssues) {
      const processedIssues = nuclei.payload.extractedIssues
        .filter((issue) => {
          // Filter issues with valid length >= 15
          const cleanedIssue = issue.replace(/[^a-zA-Z0-9]/g, "");
          return cleanedIssue.length >= 15;
        })
        .map((issue, index) => ({
          id: index + 1,
          url: issue,
        }));
      setExtractedIssues(processedIssues);
    }
  }, [links, nuclei]);

  const handleComboBoxChange = (key, value) => {
    setSelectedValues((prevValues) => ({
      ...prevValues,
      [key]: value,
    }));
  };

  const handleClick = async () => {
    setLoading(true); // Start loading state
    try {
      const payload = {
        tags: selectedValues.tags,
        severity: selectedValues.severity,
        url: selectedValues.url,
      };
      await handleNuclei(payload); // Wait for the async function to complete
    } catch (error) {
      console.error("Error handling nuclei:", error);
    } finally {
      setLoading(false); // End loading state
    }
  };

  if (loading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }
  console.log("extractedIssue :", extractedIssues);

  return (
    <div className="relative p-4 bg-gray-900 h-[86vh] text-white flex flex-col gap-4">
      <div className="flex flex-col gap-4 items-center p-4">
        <h2 className="text-xl text-blue-300 mb-4 from-neutral-200">
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
                onClick={handleClick}
                disabled={loading} // Disable the button while loading
              >
                {loading ? "Submitting..." : "Submit"}
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="p-6">
        <StickyTable rows={extractedIssues} />{" "}
        {/* Use processed extracted issues */}
      </div>
    </div>
  );
}
