import React, { useState } from "react";
import DropDownTable from "../Home/Components/DropDownTable/DropDownTable";
import ComboBox from "../RegressionSuite/ui/ComboBox";
import Button from "@mui/material/Button";
import { IoIosArrowDropdown } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";

export default function ThirdPartyApi() {
  const [popUp, setpopUp] = useState("");
  const [dropDown, setDropDown] = useState(false);

  // Dummy data for ComboBox options
  const options = {
    url: ["https://api.example.com", "https://api.anotherexample.com"],
    tags: ["Tag1", "Tag2", "Tag3"],
    category: ["Category1", "Category2", "Category3"],
    severity: ["Low", "Medium", "High"],
  };

  // State to hold selected values for ComboBoxes
  const [selectedValues, setSelectedValues] = useState({
    url: "",
    tags: "",
    category: "",
    severity: "",
  });

  // Handle ComboBox changes
  const handleComboBoxChange = (field, value) => {
    setSelectedValues((prevValues) => ({
      ...prevValues,
      [field]: value,
    }));
  };

  // Handle submit button click
  const handleSubmit = () => {
    console.log("Submitted values:", selectedValues);
    // Add your submit logic here
  };

  const toggleDropDown = () => {
    setDropDown((prev) => !prev);
  };

  return (
    <div className="relative p-4 bg-gray-900 h-[86vh] text-white">
      <DropDownTable popUp={popUp} setpopUp={setpopUp} initial={true} />
      <div className="absolute right-0 flex flex-row justify-end items-center p-4 px-5">
        <button onClick={toggleDropDown} className="focus:outline-none">
          <IoIosArrowDropdown
            className={`text-2xl transform transition-transform duration-300 ${
              dropDown ? "rotate-180" : "rotate-0"
            }`}
          />
        </button>
      </div>

      <AnimatePresence>
        {!dropDown && (
          <motion.div
            className="w-full h-full flex flex-col gap-4 items-center p-4 mt-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
          >
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
