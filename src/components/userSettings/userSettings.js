import React from "react";
import Sidebar from "../sidebar/sidebar";

export default function UserSettings() {
  return (
    <div className="homeBody">
      <div className="left">
        <Sidebar />
      </div>
      <div className="right">
        <div id="factoryForm"></div>
      </div>
    </div>
  );
}
