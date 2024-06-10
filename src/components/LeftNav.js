import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/leftnav.css";

import homeActiveIcon from "../icons/active_home.png";
import homeInactiveIcon from "../icons/inactive_home.png";
import statsActiveIcon from "../icons/active_data.png";
import statsInactiveIcon from "../icons/inactive_data.png";
import userActiveIcon from "../icons/active_mypage.png";
import userInactiveIcon from "../icons/inactive_mypage.png";

function LeftNav() {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? "active" : "inactive";
  };

  const getIcon = (path) => {
    switch (path) {
      case "/main":
        return isActive(path) === "active" ? homeActiveIcon : homeInactiveIcon;
      case "/statics":
        return isActive(path) === "active"
          ? statsActiveIcon
          : statsInactiveIcon;
      case "/option":
        return isActive(path) === "active" ? userActiveIcon : userInactiveIcon;
      default:
        return homeInactiveIcon;
    }
  };

  return (
    <div className="left-nav">
      <Link to="/main" className={isActive("/main")}>
        <img src={getIcon("/main")} alt="Home" className="icon" />
        <span className="nav-text">HOME</span>
      </Link>
      <Link to="/statics" className={isActive("/statics")}>
        <img src={getIcon("/statics")} alt="Stats" className="icon" />
        <span className="nav-text">STATISTICS</span>
      </Link>
      <Link to="/option" className={isActive("/option")}>
        <img src={getIcon("/option")} alt="User Management" className="icon" />
        <span className="nav-text">USER MANAGEMENT</span>
      </Link>
    </div>
  );
}

export default LeftNav;
