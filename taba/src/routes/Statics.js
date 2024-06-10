import React, { useState } from "react";
import LeftNav from "../components/LeftNav";
import NavBar from "../components/NavBar";
import Calendar from "../components/Calendar";
import StaticsGraph from "../components/StaticsGraph";
import "../styles/statics.css";
import StaticTable from "../components/StaticTable";
import { CalendarProvider } from "../context/StaticTableContext";

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

      <CalendarProvider>
        <div className="calendar">
          <Calendar setSessionData={setSessionData}/>
        </div>
        <div className="table">
          <StaticTable />
        </div>
      </CalendarProvider>

      <div className="staticsgraph">
        <StaticsGraph sessionData={sessionData} />
      </div>
    </div>
  );
}
