import React, { useState } from "react";
import DropDownTable from "../Home/Components/DropDownTable/DropDownTable";
import ComboBox from "./ui/ComboBox";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

// Sample data for ComboBox with labels
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
  category: [
    "http",
    "file",
    "workflows",
    "network",
    "cloud",
    "code",
    "javascript",
    "ssl",
    "dast",
    "dns",
  ],
  severity: ["info", "high", "medium", "critical", "low"],
  url: ["/url_1", "/url_2", "/url_3", "/url_4", "/url_5"],
};

export default function RegressionSuite() {
  const [popUp, setpopUp] = useState("");
  const [selectedValues, setSelectedValues] = useState({
    tags: null,
    category: null,
    severity: null,
    url: null,
  });

  const navigate = useNavigate();

  const handleComboBoxChange = (key, value) => {
    setSelectedValues((prevValues) => ({
      ...prevValues,
      [key]: value,
    }));
  };

  const handleSubmit = () => {
    console.log("Selected Values:", selectedValues);
    navigate("/scanner");
    // Send the selected values to the backend here
  };

  return (
    <div className="relative p-4 bg-gray-900 h-[86vh] text-white">
      <DropDownTable popUp={popUp} setpopUp={setpopUp} initial={true} />
      <div className="w-full h-full flex flex-col gap-4 items-center p-4 mt-4">
        <h2 className="text-2xl font-semibold text-blue-300 mb-4">
          Select Options
        </h2>
        <div className="flex flex-col gap-3 w-full items-center text-white">
          <ComboBox
            label="URL"
            options={options.url}
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
            label="Category"
            options={options.category}
            selectedValue={selectedValues.category}
            onChange={(value) => handleComboBoxChange("category", value)}
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
        >
          Submit
        </Button>
      </div>
    </div>
  );
}
