import React, { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import Loading from "../Loading/Loading";
import Popup from "./Components/PopUp/PopUp";
import DropDownTable from "./Components/DropDownTable/DropDownTable";
import PieActiveArc from "./Components/BarChart/PieActiveArc/PieActiveArc";
import StickyTable from "./Components/StickyTable/StickyTable";

export default function Home() {
  const { links, fetchList } = useOutletContext();

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

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       await fetchList();
  //       console.log("Payload submitted:", payload);
  //     } catch (error) {
  //       console.error("Error handling Test API:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       await fetchList();
  //     } catch (error) {
  //       console.error("Error handling Test API:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  if (loading) {
    return (
      <div>
        <Loading type={true} />
      </div>
    );
  }
  console.log(apisState);
  console.log("reqReceived:", reqReceivedState);
  console.log(
    "responseCodesperEndpointsState :",
    responseCodesPerEndpointState
  );
  // console.log("localStorage:", JSON.parse(localStorage.getItem("owasp")));
  // const owasp = localStorage.getItem("owasp");
  return (
    <div className="relative p-4 bg-gray-900 h-cover">
      {/* {localStorage.getItem("owasp") ? (
        <>
          {" "}
          <StickyTable
            rows={owasp} // Use the critical data fetched from the API
            label={"Owasp Top 10"}
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
        label={"All Discovered Api's"}
      />
      <div className="py-3 mt-6 border border-gray-800">
        {/* Pass the pie chart data including colors */}
        <div className="text-gray-300 p-2 text-center mr-20 font mb-2">
          Request Received
        </div>
        <PieActiveArc data={reqReceivedState} />
      </div>
      <div className="py-t mt-6 border border-gray-800">
        <div className="text-gray-300 p-2 flex flex-row justify-center items-center font mr-10">
          Response Code Per End Point
        </div>
        <PieActiveArc data={responseCodesPerEndpointState} />
      </div>
    </div>
  );
}
