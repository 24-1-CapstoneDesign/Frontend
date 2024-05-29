import React from "react";
import "../styles/negativemarker.css";

const NegativeMarker = () => {
  return (
    <div className="NM-container">
      <div className="NM-top-section"></div>
      <div className="NM-bottom-section"></div>
      <p className="NM-id-text">ID : 5</p>
      <p className="NM-status-text">미해결</p>
    </div>
  );
};

export default NegativeMarker;
