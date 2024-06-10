import React from "react";
import LeftNav from "../components/LeftNav";
import UserTable from "../components/UserTable";
import NavBar from "../components/NavBar";
import OptionGraph from "../components/OptionGraph";
import "../styles/option.css";

export default function Option() {
  return (
    <div>
      <div className="navbar">
        <NavBar />
      </div>
      <div className="left-nav">
        <LeftNav />
      </div>
      <div className="user-table">
        <UserTable />
      </div>
      <div className="option-graph">
        <OptionGraph />
      </div>
    </div>
  );
}
