import React, { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import Loading from "../Loading/Loading";
import Popup from "./Components/PopUp/PopUp";
import DropDownTable from "./Components/DropDownTable/DropDownTable";
import PieActiveArc from "./Components/BarChart/PieActiveArc/PieActiveArc";

export default function Home() {
  const { links } = useOutletContext();
  console.log(links);

  const [loading, setLoading] = useState(false);

  const [popUp, setpopUp] = useState(false);
  const navigate = useNavigate();

  console.log("Popup is open:", popUp);

  const navigationOptions = [
    { name: "Regression suite", url: "/regressionSuite" },
  ];

  const onClose = () => {
    setpopUp(false);
  };

  if (loading) {
    return (
      <div>
        <Loading type={true} />
      </div>
    );
  }

  return (
    <div className="relative p-4 bg-gray-900 h-cover">
      <DropDownTable
        popUp={popUp}
        setpopUp={setpopUp}
        initial={false}
        urls={links}
      />
      {popUp && (
        <Popup
          isOpen={popUp}
          onClose={onClose}
          navigationOptions={navigationOptions}
        />
      )}
      <div className="py-3 mt-6">
        <PieActiveArc />
      </div>
    </div>
  );
}
