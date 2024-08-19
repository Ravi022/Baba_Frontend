import React, { useEffect, useState } from "react";
import ComboBox from "../RegressionSuite/ui/ComboBox";
import Button from "@mui/material/Button";
import { useOutletContext } from "react-router-dom";
import StickyTable from "../Home/Components/StickyTable/StickyTable";
import Loading from "../Loading/Loading";

export default function ThirdPartyApi() {
  const { handleTestApi, handleNuclei, nuclei } = useOutletContext();
  const [loading, setLoading] = useState(false);
  const [isCard1Open, setIsCard1Open] = useState(false);
  const [isCard2Open, setIsCard2Open] = useState(false);
  const [extractedIssues, setExtractedIssues] = useState([]);
  const [popUp, setpopUp] = useState(false); // New state for popUp
  const [shrink, setShrink] = useState(false); // New state for shrink

  useEffect(() => {
    if (nuclei?.payload?.extractedIssues) {
      const processedIssues = nuclei.payload.extractedIssues
        .filter((issue) => {
          const cleanedIssue = issue.replace(/[^a-zA-Z0-9]/g, "");
          return cleanedIssue.length >= 15;
        })
        .map((issue, index) => ({
          id: index + 1,
          url: issue,
        }));
      setExtractedIssues(processedIssues);
    }
  }, [nuclei]);

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

  const [selectedValues, setSelectedValues] = useState({
    url: "",
    tags: "",
    severity: "",
  });

  const [testApiUrl, setTestApiUrl] = useState("");

  const handleComboBoxChange = (field, value) => {
    setSelectedValues((prevValues) => ({
      ...prevValues,
      [field]: value,
    }));
  };

  const handleClick = async () => {
    setLoading(true);
    try {
      const payload = {
        tags: selectedValues.tags,
        severity: selectedValues.severity,
        url: selectedValues.url,
      };
      await handleNuclei(payload);
    } catch (error) {
      console.error("Error handling nuclei:", error);
    } finally {
      setLoading(false);
    }
  };

  const payloadTestApi = () => {
    return {
      url: testApiUrl,
    };
  };

  const handleOnClick = async () => {
    const payload = payloadTestApi();
    try {
      await handleTestApi(payload);
      console.log("Payload submitted:", payload);
    } catch (error) {
      console.error("Error handling Test API:", error);
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
              value={testApiUrl}
              onChange={(e) => setTestApiUrl(e.target.value)}
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
              <ComboBox
                label="URL"
                options={options.url}
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
                {loading ? "Submitting..." : "Submit"}
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* StickyTable Section */}
      <div className="p-6">
        {extractedIssues.length > 0 ? (
          <StickyTable
            rows={extractedIssues}
            setpopUp={setpopUp}
            popUp={popUp}
            label={"Results from regression testing"}
            shrink={shrink}
            setShrink={setShrink}
          />
        ) : (
          <div className="text-white flex flex-row justify-center ">
            No issues found.
          </div>
        )}
      </div>
    </div>
  );
}
