import React from "react";
import LeftNav from "../components/LeftNav";
import NavBar from "../components/NavBar";

export default function Main() {
  return (
    <div>
      <div>
        <NavBar />
      </div>
      <div>
        <LeftNav />
      </div>
    </div>
  );
}
