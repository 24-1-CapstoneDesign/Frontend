import React from "react";
import LeftNav from "../components/LeftNav";
import NavBar from "../components/NavBar";
import Table from "../components/Table";
import Map from "../components/Map";

export default function Main() {
  return (
    <div>
      <div className="navbar">
        <NavBar />
      </div>
      <div className="left-nav">
        <LeftNav />
      </div>
      <div className="map-container">
        <Map />
      </div>
      <div className="table">
        <Table />
      </div>
    </div>
  );
}
