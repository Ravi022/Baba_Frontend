import React, { useEffect, useState } from "react";
import StickyTable from "../../Home/Components/StickyTable/StickyTable";
import Loading from "../../Loading/Loading";

export default function Scanner() {
  const [popUp, setpopUp] = useState("");
  const [loading, setLoading] = useState(false);
  const [scanner, setScanner] = useState(null);

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
        "x-vercel-protection-bypass": "D1g4beix8PAQYjhUVAd0vbrZgBr0i8Po",
      };

      try {
        const response = await fetch(`http://3.6.112.142:3000/bearer`, {
          method: "GET",
          headers,
        });

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

          // Safely access data.payload to avoid errors
          const payload = data.payload || {};

          setCurrentCritical(
            payload.CRITICAL
              ? payload.CRITICAL.map((api, index) => ({
                  id: index + 1,
                  url: api,
                }))
              : []
          );

          setCurrentHigh(
            payload.HIGH
              ? payload.HIGH.map((api, index) => ({
                  id: index + 1,
                  url: api,
                }))
              : []
          );

          setCurrentLow(
            payload.LOW
              ? payload.LOW.map((api, index) => ({
                  id: index + 1,
                  url: api,
                }))
              : []
          );

          setCurrentMedium(
            payload.MEDIUM
              ? payload.MEDIUM.map((api, index) => ({
                  id: index + 1,
                  url: api,
                }))
              : []
          );

          setHistoryCritical(
            payload.history?.CRITICAL
              ? payload.history.CRITICAL.map((api, index) => ({
                  id: index + 1,
                  url: api,
                }))
              : []
          );

          setHistoryHigh(
            payload.history?.HIGH
              ? payload.history.HIGH.map((api, index) => ({
                  id: index + 1,
                  url: api,
                }))
              : []
          );

          setHistoryLow(
            payload.history?.LOW
              ? payload.history.LOW.map((api, index) => ({
                  id: index + 1,
                  url: api,
                }))
              : []
          );

          setHistoryMedium(
            payload.history?.MEDIUM
              ? payload.history.MEDIUM.map((api, index) => ({
                  id: index + 1,
                  url: api,
                }))
              : []
          );

          const owasp = payload.owaspData
            ? payload.owaspData.map((api, index) => ({
                id: index + 1,
                url: api,
              }))
            : [];
          localStorage.setItem("owasp", JSON.stringify(owasp));
          setowaspData(owasp);
          console.log("OWASP Data:", owasp);
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

  return (
    <div className="absolute bg-gray-900 w-screen h-[80vh] flex justify-center items-center">
      {/* First half */}
      <div className="w-1/2 h-full p-4 overflow-y-scroll mr-8">
        <h2 className="text-white text-xl mb-4 w-full flex flex-row justify-center">
          OWASP Top 10
        </h2>
        <div className="flex flex-row justify-center text-xl mb-4 text-white">
          <StickyTable
            rows={owaspData} // Use the OWASP data fetched from the API
            setpopUp={setpopUp}
            popUp={popUp}
            label={"Owasp Top 10"}
            shrink={shrinkOwasp}
            setShrink={setShrinkOwasp}
          />
        </div>
        <h2 className="text-white text-xl mb-4 w-full flex flex-row justify-center">
          Current Scan History
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
      <div className="w-1/2 h-full p-4 overflow-y-scroll mr-8">
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
