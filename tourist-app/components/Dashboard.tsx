import React from "react";
import AlertView from "./AlertsPanel";
import TouristList from "./TouristTable";
import MapView from "./MapView";

const Dashboard: React.FC = () => {
  return (
    <div style={{ display: "flex", height: "100vh", width: "100%" }}>
      {/* Left Panel: Alerts + Tourists */}
      <div
        style={{
          width: "350px",
          background: "#f9fafb",
          borderRight: "1px solid #ddd",
          overflowY: "auto",
          padding: "10px",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "10px" }}>Dashboard</h2>

        {/* Alerts Section */}
        <div style={{ marginBottom: "20px" }}>
          <h3>Alerts</h3>
          <AlertView />
        </div>

        {/* Tourist List Section */}
        <div>
          <h3>Tourists</h3>
          <TouristList />
        </div>
      </div>

      {/* Right Panel: Map */}
      <div style={{ flex: 1 }}>
        <MapView />
      </div>
    </div>
  );
};

export default Dashboard;
