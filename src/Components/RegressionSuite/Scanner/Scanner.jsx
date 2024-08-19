import React, { useEffect, useState } from "react";
import StickyTable from "../../Home/Components/StickyTable/StickyTable";
import Loading from "../../Loading/Loading";

export default function Scanner() {
  const [popUp, setpopUp] = useState("");
  const [loading, setLoading] = useState(false);
  const [scanner, setScanner] = useState(null); // Updated to initialize as `null`

  const [currentCritical, setCurrentCritical] = useState([]);
  const [currentHigh, setCurrentHigh] = useState([]);
  const [currentLow, setCurrentLow] = useState([]);
  const [currentMedium, setCurrentMedium] = useState([]);
  const [historyCritical, setHistoryCritical] = useState([]);
  const [historyHigh, setHistoryHigh] = useState([]);
  const [historyLow, setHistoryLow] = useState([]);
  const [historyMedium, setHistoryMedium] = useState([]);
  const [owaspData, setowaspData] = useState([]);

  // Shrink states for each table
  const [shrinkOwasp, setShrinkOwasp] = useState(false);
  const [shrinkCritical, setShrinkCritical] = useState(true);
  const [shrinkHigh, setShrinkHigh] = useState(false);
  const [shrinkMedium, setShrinkMedium] = useState(false);
  const [shrinkLow, setShrinkLow] = useState(false);
  const [shrinkHistoryCritical, setShrinkHistoryCritical] = useState(false);
  const [shrinkHistoryHigh, setShrinkHistoryHigh] = useState(false);
  const [shrinkHistoryMedium, setShrinkHistoryMedium] = useState(false);
  const [shrinkHistoryLow, setShrinkHistoryLow] = useState(false);

  useEffect(() => {
    const fetchScannerList = async () => {
      setLoading(true);

      const headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      };

      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_KEY}bearer`, // Ensure this is the correct API endpoint
          {
            method: "GET",
            headers,
          }
        );

        const contentType = response.headers.get("Content-Type");
        let data;

        if (contentType && contentType.includes("application/json")) {
          data = await response.json();
        } else {
          data = await response.text();
        }

        if (response.ok) {
          console.log("API call successful:", data);
          setScanner(data); // Store the fetched data in `scanner` state

          // Map the data into state variables
          setCurrentCritical(
            data.payload.CRITICAL
              ? data.payload.CRITICAL.map((api, index) => ({
                  id: index + 1,
                  url: api,
                }))
              : []
          );

          setCurrentHigh(
            data.payload.HIGH
              ? data.payload.HIGH.map((api, index) => ({
                  id: index + 1,
                  url: api,
                }))
              : []
          );

          setCurrentLow(
            data.payload.LOW
              ? data.payload.LOW.map((api, index) => ({
                  id: index + 1,
                  url: api,
                }))
              : []
          );

          setCurrentMedium(
            data.payload.MEDIUM
              ? data.payload.MEDIUM.map((api, index) => ({
                  id: index + 1,
                  url: api,
                }))
              : []
          );

          setHistoryCritical(
            data.payload.history?.CRITICAL
              ? data.payload.history.CRITICAL.map((api, index) => ({
                  id: index + 1,
                  url: api,
                }))
              : []
          );

          setHistoryHigh(
            data.payload.history?.HIGH
              ? data.payload.history.HIGH.map((api, index) => ({
                  id: index + 1,
                  url: api,
                }))
              : []
          );

          setHistoryLow(
            data.payload.history?.LOW
              ? data.payload.history.LOW.map((api, index) => ({
                  id: index + 1,
                  url: api,
                }))
              : []
          );

          setHistoryMedium(
            data.payload.history?.MEDIUM
              ? data.payload.history.MEDIUM.map((api, index) => ({
                  id: index + 1,
                  url: api,
                }))
              : []
          );
          // const owasp = data.payload.owaspData
          //   ? data.payload.owaspData.map((api, index) => ({
          //       id: index + 1,
          //       url: api,
          //     }))
          //   : [];
          // localStorage.setItem("owasp", JSON.stringify(owasp));
          // console.log("owasp :", owasp);
        } else {
          console.error("API call failed with non-200 status:", data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        if (error.message === "Failed to fetch") {
          console.error("Network error or CORS issue detected.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchScannerList();
  }, []); // Empty dependency array ensures this runs only once on mount

  if (loading) {
    return (
      <div>
        <Loading type="scanner" />
      </div>
    );
  }

  // if (!scanner) {
  //   return <div className="text-white">No data available</div>;
  // }

  return (
    <div className="absolute bg-gray-900 w-full h-[80vh] flex justify-center items-center">
      {/* First half */}
      <div className="w-1/2 h-full p-4 overflow-y-scroll">
        <h2 className="text-white text-xl mb-4 w-full flex flex-row justify-center">
          Owasp Top 10
        </h2>
        <div className="flex flex-col justify-center items-center gap-6">
          <StickyTable
            rows={currentCritical} // Use the critical data fetched from the API
            setpopUp={setpopUp}
            popUp={popUp}
            label={"Critical"}
            shrink={shrinkCritical}
            setShrink={setShrinkCritical}
          />
          <StickyTable
            rows={currentHigh} // Use the high data fetched from the API
            setpopUp={setpopUp}
            popUp={popUp}
            label={"High"}
            shrink={shrinkHigh}
            setShrink={setShrinkHigh}
          />
          <StickyTable
            rows={currentMedium} // Use the medium data fetched from the API
            setpopUp={setpopUp}
            popUp={popUp}
            label={"Medium"}
            shrink={shrinkMedium}
            setShrink={setShrinkMedium}
          />
          <StickyTable
            rows={currentLow} // Use the low data fetched from the API
            setpopUp={setpopUp}
            popUp={popUp}
            label={"Low"}
            shrink={shrinkLow}
            setShrink={setShrinkLow}
          />
        </div>
      </div>

      {/* Second half */}
      <div className="w-1/2 h-full p-4 overflow-y-scroll">
        <h2 className="text-white text-xl mb-4">Previous Scan History</h2>
        <div className="flex flex-col gap-6">
          <StickyTable
            rows={historyCritical} // Use the historical critical data fetched from the API
            setpopUp={setpopUp}
            popUp={popUp}
            label={"History Critical"}
            shrink={shrinkHistoryCritical}
            setShrink={setShrinkHistoryCritical}
          />
          <StickyTable
            rows={historyHigh} // Use the historical high data fetched from the API
            setpopUp={setpopUp}
            popUp={popUp}
            label={"History High"}
            shrink={shrinkHistoryHigh}
            setShrink={setShrinkHistoryHigh}
          />
          <StickyTable
            rows={historyMedium} // Use the historical medium data fetched from the API
            setpopUp={setpopUp}
            popUp={popUp}
            label={"History Medium"}
            shrink={shrinkHistoryMedium}
            setShrink={setShrinkHistoryMedium}
          />
          <StickyTable
            rows={historyLow} // Use the historical low data fetched from the API
            setpopUp={setpopUp}
            popUp={popUp}
            label={"History Low"}
            shrink={shrinkHistoryLow}
            setShrink={setShrinkHistoryLow}
          />
        </div>
      </div>
    </div>
  );
}
