import React from "react";
import "../styles/positivemarker.css";

const PositiveMarker = (props) => {
  return (
    <div className="PM-container">
      <div className="PM-top-section"></div>
      <div className="PM-bottom-section"></div>
      <p className="PM-id-text">ID : {props.id}</p>
      <p className="PM-status-text">해결</p>
    </div>
  );
};

export default PositiveMarker;
