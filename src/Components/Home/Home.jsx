import React, { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import Loading from "../Loading/Loading";
import Popup from "./Components/PopUp/PopUp";
import DropDownTable from "./Components/DropDownTable/DropDownTable";
import PieActiveArc from "./Components/BarChart/PieActiveArc/PieActiveArc";
import StickyTable from "./Components/StickyTable/StickyTable";

export default function Home() {
  const { links } = useOutletContext();

  console.log(links);

  // Utility function to generate random colors
  const generateRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  // Function to convert object to id-value pairs with random color
  const convertToIdValuePairs = (obj) => {
    const result = [];
    let id = 1;
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        result.push({
          id: id++,
          label: key,
          value: obj[key],
          color: generateRandomColor(), // Assign random color
        });
      }
    }
    return result;
  };

  // Converting to id-value pairs with safety checks and random colors
  const apis = links.apis
    ? links.apis.map((api, index) => ({
        id: index + 1,
        url: api,
        color: generateRandomColor(), // Assign random color
      }))
    : [];
  const reqReceived = links.reqReceived
    ? convertToIdValuePairs(links.reqReceived)
    : [];
  const responseCodesPerEndpoint = links.responseCodesPerEndpoint
    ? convertToIdValuePairs(links.responseCodesPerEndpoint)
    : [];

  // Storing in useState
  const [loading, setLoading] = useState(false);
  const [shrinkOwasp, setShrinkOwasp] = useState(false);
  const [apisState, setApisState] = useState(apis);
  const [reqReceivedState, setReqReceivedState] = useState(reqReceived);
  const [responseCodesPerEndpointState, setResponseCodesPerEndpointState] =
    useState(responseCodesPerEndpoint);

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
  console.log(apisState);
  console.log(reqReceivedState);
  console.log(responseCodesPerEndpointState);
  // console.log("localStorage:",localStorage.getItem("owasp"));
  // const owasp = localStorage.getItem("owasp");
  return (
    <div className="relative p-4 bg-gray-900 h-cover">
      {/* {localStorage.getItem("owasp") ? (
        <>
          {" "}
          <StickyTable
            rows={owasp} // Use the critical data fetched from the API
            label={"Owasp"}
            shrink={shrinkOwasp}
            setShrink={setShrinkOwasp}
          />
        </>
      ) : (
        ""
      )} */}

      <DropDownTable
        popUp={popUp}
        setpopUp={setpopUp}
        initial={false}
        urls={apisState}
      />
      {/* {popUp && (
        <Popup
          isOpen={popUp}
          onClose={onClose}
          navigationOptions={navigationOptions}
        />
      )} */}
      <div className="py-3 mt-6">
        {/* Pass the pie chart data including colors */}
        <PieActiveArc data={reqReceivedState} />
      </div>
      <hr />
      <div>
        <PieActiveArc data={responseCodesPerEndpointState} />
      </div>
    </div>
  );
}
