import React, { useEffect, useState } from "react";
import ComboBox from "../RegressionSuite/ui/ComboBox";
import Button from "@mui/material/Button";
import { useOutletContext } from "react-router-dom";
import StickyTable from "../Home/Components/StickyTable/StickyTable";
import Loading from "../Loading/Loading";
import { IoCloudDownloadSharp } from "react-icons/io5";

export default function ThirdPartyApi() {
  const {
    fetchVulnApi,
    handleNuclei,
    nuclei,
    vulnapi,
    handlethirdpartySast,
    thirdPartySast,
    terminalOut,
  } = useOutletContext();
  console.log(vulnapi);
  console.log(thirdPartySast);

  const [loading, setLoading] = useState(false);
  const [isCard1Open, setIsCard1Open] = useState(false);
  const [isCard2Open, setIsCard2Open] = useState(false);
  const [extractedIssues, setExtractedIssues] = useState([]);
  const [popUp, setpopUp] = useState(false); // New state for popUp
  const [shrink, setShrink] = useState(false); // New state for shrink

  // State for the first input field in Card 1
  const [testApiUrlCard1, setTestApiUrlCard1] = useState("");

  // State for the second input field in Card 2 (part of selectedValues)
  const [selectedValues, setSelectedValues] = useState({
    url: "",
    tags: "",
    severity: "",
  });

  useEffect(() => {
    // Process nuclei.payload.extractedIssues and convert it to {id, url}
    if (thirdPartySast && thirdPartySast.extractedIssues) {
      const processedIssues = thirdPartySast.extractedIssues
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
  }, [thirdPartySast]);

  // useEffect(() => {
  //   if (nuclei?.payload?.extractedIssues) {
  //     const processedIssues = nuclei.payload.extractedIssues
  //       .filter((issue) => {
  //         const cleanedIssue = issue.replace(/[^a-zA-Z0-9]/g, "");
  //         return cleanedIssue.length >= 15;
  //       })
  //       .map((issue, index) => ({
  //         id: index + 1,
  //         url: issue,
  //       }));
  //     setExtractedIssues(processedIssues);
  //   }
  // }, [nuclei]);

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

  // Handle ComboBox changes for the second input field in Card 2
  const handleComboBoxChange = (field, value) => {
    setSelectedValues((prevValues) => ({
      ...prevValues,
      [field]: value,
    }));
  };

  // Handle submission for Card 2
  const handleClick = async () => {
    setLoading(true);
    try {
      const payload = {
        tags: selectedValues.tags,
        severity: selectedValues.severity,
        url: selectedValues.url,
      };
      // await handleNuclei(payload);
      await handlethirdpartySast(payload);
      console.log(payload);
    } catch (error) {
      console.error("Error handling nuclei:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle submission for Card 1
  const handleOnClick = async () => {
    const payload = { url: testApiUrlCard1 };
    try {
      await fetchVulnApi(payload);
      console.log("Payload submitted:", payload);
    } catch (error) {
      console.error("Error handling Test API:", error);
    }
  };

  const handleDownloadClick = () => {
    const fileContent = {
      terminalOutput: terminalOut || "No terminal output available",
      thirdPartySast: thirdPartySast || "No third-party SAST data available",
    };

    const blob = new Blob([JSON.stringify(fileContent, null, 2)], {
      type: "application/json",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "thirdPartySast_and_terminalOut.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
      {/* Card 1: Toggleable Section */}
      <div className="mb-8 bg-gray-800">
        <div className="p-2">
          <h3
            className="text-lg font-semibold text-blue-300 cursor-pointer flex justify-center items-center"
            onClick={() => setIsCard1Open(!isCard1Open)}
          >
            Enter Your Details
          </h3>
        </div>
        {isCard1Open && (
          <div className="flex flex-col gap-4 p-4 bg-gray-800 rounded-md shadow-md">
            <input
              placeholder="Test Api"
              className="p-2 w-full bg-gray-700 text-white rounded-md"
              value={testApiUrlCard1}
              onChange={(e) => setTestApiUrlCard1(e.target.value)}
            />
            <div className="w-full flex justify-center">
              <Button
                variant="contained"
                color="primary"
                className="mt-4 bg-blue-500 hover:bg-blue-600 w-1/5"
                onClick={handleOnClick}
              >
                Submit
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Card 2: Toggleable Section */}
      <div className="mt-8 bg-gray-800">
        <div className="p-2">
          <h3
            className="text-xl text-blue-300 mb-4 cursor-pointer flex justify-center items-center"
            onClick={() => setIsCard2Open(!isCard2Open)}
          >
            Baba Security enables you to run regression tests using various
            templates.
          </h3>
        </div>
        {isCard2Open && (
          <div className="flex flex-col gap-4 items-center p-4 bg-gray-800 rounded-md shadow-md">
            <div className="flex flex-col gap-3 w-full items-center text-white">
              <input
                placeholder="Url"
                className="p-2 w-1/2 bg-gray-700 text-white rounded-md "
                value={selectedValues.url}
                onChange={(e) =>
                  setSelectedValues({ ...selectedValues, url: e.target.value })
                }
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
            <div className="flex flex-col items-center">
              <div className="text-md font-semibold p-2">
                Run Regression Testing
              </div>
              <Button
                variant="contained"
                color="primary"
                className="mt-4 bg-blue-500 hover:bg-blue-600 text-white"
                onClick={handleClick}
                disabled={loading}
              >
                Submit
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* StickyTable Section */}
      <div className="p-6">
        {extractedIssues.length > 0 ? (
          <>
            <div
              className="flex flex-row gap-3 justify-end itmes-center p-3 "
              onClick={handleDownloadClick}
            >
              <span className="text-purple-600 font-bold">
                {" "}
                Download Result
              </span>{" "}
              <IoCloudDownloadSharp className="text-2xl fill-purple-700" />
            </div>
            <StickyTable
              rows={extractedIssues}
              setpopUp={setpopUp}
              popUp={popUp}
              label={"Results from regression testing"}
              shrink={shrink}
              setShrink={setShrink}
            />
          </>
        ) : (
          <div className="text-white flex flex-row justify-center ">
            No issues found.
          </div>
        )}
      </div>
    </div>
  );
}
