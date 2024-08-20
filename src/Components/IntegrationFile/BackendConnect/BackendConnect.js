import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Navigation from "./Navigation/Navigation";
import { useLocation } from "react-router-dom";
import axios from "axios";

const Layout = () => {
  const location = useLocation();
  const userData = location.state?.userData;

  const [accountData, setAccountData] = useState(() => {
    // initialize accountData from localStorage
    const savedData = localStorage.getItem("accountData");
    return savedData ? JSON.parse(savedData) : {};
  });

  const [loading, setLoading] = useState(true);
  const [walletAmount, setWalletAmount] = useState(null);
  const [walletData, setWalletData] = useState(null);
  const [activeGame, setActiveGame] = useState([]);
  const [blockAmountList, setBlockList] = useState([]);
  const [walletHistory, setWalletHistory] = useState([]);
  // const [loading, setLoading] = useState(true);
  const [dialog, setDialog] = useState({
    open: false,
    message: "",
    status: null,
  });

  const fetchUserDetails = async () => {
    const token = localStorage.getItem("accessToken");
    const body = { refreshToken: localStorage.getItem("refreshToken") };

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    try {
      const response = await axios.post(
       "http://localhost:3000/" + "auth/token",
        body,
        config
      );

      if (response.status === 200) {
        // console.log(response.data);
        setAccountData(response.data.user);
      } else {
        setDialog({
          open: true,
          message: response.data.message || "An error occurred",
          status: response.status,
        });
      }
    } catch (error) {
      // console.log(error);
      if (error.response) {
        setDialog({
          open: true,
          message: `Error: ${error.response.data.message}`,
          status: error.response.status,
        });
      } else if (error.request) {
        setDialog({
          open: true,
          message: "Network error. Please check your connection.",
          status: null,
        });
      } else {
        setDialog({
          open: true,
          message: `Error: ${error.message}`,
          status: null,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchWalletDetails = async () => {
    // console.log("fetchWalletDetails");
    const token = localStorage.getItem("accessToken");

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    try {
      const response = await axios.get(
        import.meta.env.VITE_API_KEY + "player/getWalletHistory",
        config
      );

      if (response.status === 200) {
        // console.log(response.data);
        setWalletData(response.data);
        setWalletAmount(Math.floor(response.data.amount * 100) / 100);
        setActiveGame(response.data.activeGames);
        setBlockList(response.data.blockedAmountList);
        setWalletHistory(response.data.walletHistory);
      } else {
        setDialog({
          open: true,
          message: response.data.message || "An error occurred",
          status: response.status,
        });
      }
    } catch (error) {
      // console.log("catchnotgoingtotryblocck");
      // console.log(error);
      if (error.response) {
        setDialog({
          open: true,
          message: `Error: ${error.response.data.message}`,
          status: error.response.status,
        });
      } else if (error.request) {
        setDialog({
          open: true,
          message: "Network error. Please check your connection.",
          status: null,
        });
      } else {
        setDialog({
          open: true,
          message: `Error: ${error.message}`,
          status: null,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWalletDetails();
  }, []);

  useEffect(() => {
    if (userData && userData !== accountData) {
      setAccountData(userData);
      localStorage.setItem("accountData", JSON.stringify(userData));
    }
  }, [userData, accountData]);
  useEffect(() => {
    //update local storage when accounData changes
    localStorage.setItem("accountData", JSON.stringify(accountData));
  }, [accountData]);
  // console.log(accountData);
  // console.log(userData)
  return (
    <div className="flex justify-center bg-[#9195A3] overflow-auto scroll-smooth">
      <div className="relative w-[400px] bg-white ">
        {loading ? (
          ""
        ) : (
          <Outlet
            context={{
              accountData,
              walletAmount,
              activeGame,
              blockAmountList,
              walletHistory,
              fetchWalletDetails,
              fetchUserDetails,
            }}
          />
        )}
        <Navigation />
      </div>
    </div>
  );
};
export default Layout;
