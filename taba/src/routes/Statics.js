import React, { useState } from "react";
import LeftNav from "../components/LeftNav";
import NavBar from "../components/NavBar";
import Calendar from "../components/Calendar";
import Table from "../components/Table";
import StaticsGraph from "../components/StaticsGraph";
import "../styles/statics.css";

export default function Statics() {
  const [sessionData, setSessionData] = useState(null);

  return (
    <div>
      <div className="navbar">
        <NavBar />
      </div>
      <div className="left-nav">
        <LeftNav />
      </div>
      <div className="calendar">
        <Calendar setSessionData={setSessionData} />
      </div>
      <div className="table">
        <Table />
      </div>
      <div className="staticsgraph">
        <StaticsGraph sessionData={sessionData} />
      </div>
    </div>
  );
}
