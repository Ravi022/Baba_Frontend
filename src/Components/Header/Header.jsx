import React from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/Logo.png";
import UserProfile from "./UserDropDown/UserDropDown";

export default function Header() {
  const navigate = useNavigate();

  const NavigationBar = [
    {
      title: "Regression Suit",
      navigateTo: "/regressionSuit",
    },
    {
      title: "Discover Api",
      navigateTo: "/discoverApi",
    },
  ];

  return (
    <div className="flex flex-row ">
      <div className="h-full w-3/12">
        <div
          className="flex flex-row gap-3 items-center px-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img src={Logo} alt="bab_security_logo" className="h-[6vh]" />
          <div className="text-xl">Baba Security</div>
        </div>
      </div>
      <div className="h-cover w-6/12 flex flex-row justify-center items-center">
        {NavigationBar.map((item, index) => (
          <div
            key={index}
            className="mx-4 cursor-pointer "
            onClick={() => navigate(item.navigateTo)}
          >
            {item.title}
          </div>
        ))}
      </div>
      <div className="h-cover w-3/12 flex flex-row justify-end items-center px-6">
        <UserProfile />
      </div>
    </div>
  );
}
